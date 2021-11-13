import './order.css';

function Order({order}){
    const types = {B:"Buying",S:"Selling"}
    return (
        <div className="order">
            <hr />
            <div className="type-price">
                <p className={(order.type=="B") ? "buy" : "sell"}>{types[order.type]} <span>{order.coin}</span></p>
                <p className="price"><span>GHc</span>{order.price}</p>
            </div>
            
            <div className="details">
                <div>
                    <p className="by">{order.by}</p>
                    <p className="location">{`${order.location.region}, ${order.location.name}`}</p>
                </div>
                <p className="contact">{order.contact}</p>
            </div>
            
        </div>
    );
}

export default Order;