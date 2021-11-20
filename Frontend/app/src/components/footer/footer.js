import './footer.css';

function Footer(){
    return(
        <div id="footer">
            <div className="container">
                <div className="logo">
                    <h1>Cedix</h1>
                    <p>&#169; 2021 ADS Capital</p>
                </div>
                <div className="links">
                    <h4>Helpful Links</h4>
                    <ul>
                        <li><a href="https://www.euromoney.com/learning/blockchain-explained/what-is-blockchain">What is a Blockchain?</a></li>
                        <li><a href="https://www.fool.com/investing/2018/01/02/cryptocurrencies-explained-in-plain-english.aspx">What is cryptocurrency?</a></li>
                        <li><a href="https://donovic.com/simplest-guide-getting-started-cryptocurrency/">Getting started</a></li>
                        <li><a href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet">Wallets</a></li>
                    </ul>
                    <ul>
                        <li><a href="https://coinmarketcap.com/alexandria/glossary/address">Addresses</a></li>
                        <li><a href="https://www.euromoney.com/learning/blockchain-explained/how-transactions-get-into-the-blockchain">Transactions</a></li>
                        <li><a href="https://time.com/nextadvisor/investing/cryptocurrency/what-are-cryptocurrency-exchanges/">Exchanges</a></li>
                        <li><a href="https://www.investopedia.com/terms/d/decentralized-applications-dapps.asp">dApps</a></li>
                    </ul>   
                </div>
            </div>
            <p id="sig">Developed By Derrick</p>
        </div>
    );
}

export default Footer;