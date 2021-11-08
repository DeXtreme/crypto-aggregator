import './order.css';

function Order({order}){
    return (
        <div className="order">
            <hr />
            <div className="type-coin">
                <p className="type">Buying</p>
                <p className="coin">BTC</p>
            </div>
            <p className="price"><span>GHc</span>40000</p>
            <div className="details">
                <div>
                    <p className="by">Radarada shop</p>
                    <p className="location">Greater Accra, Madina</p>
                </div>
                <p className="contact">027309495</p>
            </div>
            
        </div>
    );
}

export default Order;