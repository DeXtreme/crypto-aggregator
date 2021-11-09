import './order.css';

function Order({order}){
    return (
        <div className="order">
            <hr />
            <div className="type-price">
                <p className="type">Buying <span>BTC</span></p>
                <p className="price"><span>GHc</span>40000</p>
            </div>
            
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