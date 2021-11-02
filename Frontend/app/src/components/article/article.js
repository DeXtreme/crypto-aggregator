import './article.css';

function Article({article}){
    return (
        <div className="article">
            <a href={article.link} target="_blank">
                {article.image && <img src={article.image} loading="lazy"/>}
                <div className="details">
                    <h2 className="title">{article.title}</h2>
                    <p className="description">{article.description}</p>
                    <p className="source">By {article.source}</p>
                </div>
            </a>
        </div>
    );
}

export default Article;