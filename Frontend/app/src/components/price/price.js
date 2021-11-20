import './price.css';

function Price({price}){
    return (
        <div className="price">
                <div className="content">
                    <div className="coin-cap">
                        <div className="coin">
                            <img src={price.image} /><span>{price.name}</span>
                        </div>
                        <p className="cap">$ {price.cap.toLocaleString("en-US")}</p>
                    </div>
                    <div className={`current ${price.price_change==1 ?"up" :price.price_change==-1 ?"down" : "" }`}>
                        $ {price.price.toLocaleString("en-US",{maximumFractionDigits: 10})}
                    </div>
                    <div className="change">
                    <p className={`${price.change>0 ? "up" : price.change<0 ? "down" : ""}`}> 
                        {price.change} % </p>
                    <p className="label">24h Change</p>
                    </div>
                </div>
                <hr />
            </div>
    );
}

export default Price;