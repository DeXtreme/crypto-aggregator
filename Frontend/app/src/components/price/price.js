import './price.css';

function Price({price}){
    return (
        <div className="price">
                <div className="content">
                    <div className="coin-cap">
                        <div className="coin">
                            <img src={price.image} /><span>{price.name}</span>
                        </div>
                        <div className="cap">
                            $ {price.cap}
                        </div>
                    </div>
                    <div className={`current ${price.price_change==1 ?"up" :price.price_change==-1 ?"down" : "" }`}>
                        $ {price.price}
                    </div>
                    <div className={`change ${price.change>0 ? "up" : price.change<0 ? "down" : ""}`}> 
                        {price.change} %
                    </div>
                </div>
                <hr />
            </div>
    );
}

export default Price;