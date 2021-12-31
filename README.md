# Cedix (crypto-aggregator)
[Cedix](http://35.188.133.127/) is an open-source cryptocurrency news aggregator and marketplace. It collects news articles from a number of popular crytocurrency news sites including [CoinTelegraph](https://cointelegraph.com),[NewsBTC](https://www.newsbtc.com) and [CryptoNinjas](https://www.cryptoninjas.net), displays the market price of top 100 crytocurrencies and provides a crytocurrency marketplace for Buying and Selling ads.

### Technologies
This project was built using:
- ReactJS ver. 17.0.2
- Redux ver. 4.1.2
- Django ver. 3.1.2
- Django Rest Framework ver. 3.11.0
- SQLAlchemy ver. 1.4.25
- Beautifulsoup4  ver. 4.10.0
- Requests ver. 2.26.0
- Postgres
- Nginx
- Docker ver. 20.10.8
- Docker-Compose ver 1.29.2

## How To Deploy
The following instructions are for deploying the staging build of Cedix. Instructions for the production build are coming soon 😃

1. Clone the repository/ Download the zip file

       git clone https://github.com/DeXtreme/crypto-aggregator.git

2. Create a .env folder in the project directory
3. In the .env directory create `aggregator.staging.env`,`app.staging.env`,`api.staging.env` and `db.staging.env`
4. In `api.staging.env` and `db.staging.env` add the following information
        
        api.staging.env
        
        SECRET_KEY= (Django secret key such as one using https://djecrety.ir/)
        DEBUG= False
        ALLOWED_HOST= (List of allowed hosts eg http://localhost, http://yoursite.com)
        ALLOWED_ORIGINS= (List of allowed origins eg http://localhost, http://yoursite.com)
        GOOGLE_APPLICATION_CREDENTIALS= /api/firebase.json (Absolute path to firebase service account key json file)
        
        db.staging.env
        POSTGRES_USER= (DB username)
        POSTGRES_PASSWORD= (DB password)
        POSTGRES_DB= (DB name)
        POSTGRES_HOST=db
        
        
5. Setup a [Firebase](https://firebase.google.com) account.
6. Enable and configure authentication with Twitter, Gmail and Facebook
7. Copy the service account key json file to the `Backend/api` folder. Rename the file to `firebase.json` or remember to update the `GOOGLE_APPLICATION_CREDENTIALS` path in the `api.staging.env` file
8. Create the `Frontend/app/firebase.js` file and copy the firebase SDK configuration code to the file
```js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
   ... config information
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app; // Add this line
```
9. From the project root directory, the run the following code to build and run the docker containers
        
       docker-compose -f docker-compose.staging.yml up

10. Open your browser and navigate to the machine's IP or domain 


## How to Contribute
Cedix is neither perfect nor complete and will be seeing a lot of changes and improvements in the future. If you would like to contribute to this project in the form of bug reporting, bugfixes or feature suggestions, open an issue with sufficient explanation and or fork the repo and open a pull request. Be polite and helpful when communicating with other contributors- We're all friends here 😄. I also appreciate any comments, ideas or suggestions on my work as a developer as I hope to become more professional. Any and all tips are welcome.

## License
MIT License

Copyright (c) 2021 Derrick-Brown

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
