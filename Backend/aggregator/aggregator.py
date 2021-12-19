from bs4 import BeautifulSoup
import html
import re
import requests
import os
from dateutil import parser
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker



def main():
    # :oad database credentials
    dbname = os.getenv("POSTGRES_DB")
    dbuser = os.getenv("POSTGRES_USER")
    dbpassword = os.getenv("POSTGRES_PASSWORD")
    dbhost = os.getenv("POSTGRES_HOST")

    # Intialize SQLAlchemy engine
    engine = create_engine(f"postgresql+psycopg2://{dbuser}:{dbpassword}@{dbhost}:5432/{dbname}")
    # Create SQLAlchemy session factory 
    Session = sessionmaker(bind=engine)
    # Load database metadata
    Base = automap_base()
    Base.prepare(engine, reflect=True)

    # Get Article model
    Article = Base.classes.articles_article

    feeds = open("/aggregator/feeds","r").read().split(",")

    with Session() as session:
        for feed in feeds:
            headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
            response = requests.get(feed,  headers=headers, allow_redirects=True)
            soup = BeautifulSoup(response.text, 'xml')

            if(soup.channel):
                # Get channel name
                channel = soup.channel.title.text[:100]
                # Get lastest save article by channel
                lastest = session.query(Article)\
                                 .filter(Article.source == channel)\
                                 .order_by(Article.pubdate.desc())\
                                 .limit(1).all()

                # Iterate through all articles
                for item in soup.find_all("item"):
                    if not item.pubDate:
                        break

                    # Parse article pubDate
                    pubdate = parser.parse(item.pubDate.text)

                    # Check if the article pubdate later than the 
                    # last saved article
                    if lastest:
                        lastest_pubdate = lastest[0].pubdate
                        if pubdate <= lastest_pubdate:
                            print(pubdate,lastest_pubdate,feed)
                            break

                    title = item.title.text[:200]
                    link = item.link.text[:200]

                    # Get article summary from the `description` tag
                    # or from the `encoded` tag
                    if(item.description):
                        text = html.unescape(item.description.text[:500])
                    else:
                        text = html.unescape(item.encoded.text[:1000])
                    
                    # Remove all HTML and newlines from the summary
                    description = re.sub(r"<.*?>","", text).strip().replace("\n","")

                    # Get article image from `content` tag or
                    # from the HTML in the description
                    if(item.content):
                        img = item.content["url"]
                    else:
                        img_re = re.search("<img .*? src=\"(.*?)\".", text)
                        img = img_re.group(1) if img_re else None
                    
                    # Create new article
                    article = Article(title=title,
                                      link=link,
                                      image=img,
                                      description=description,
                                      source=channel,
                                      pubdate=pubdate)
                    print(article.title)

                    # Save article to database
                    session.add(article)
                    session.commit()
            

if __name__ == "__main__":
    main()    
