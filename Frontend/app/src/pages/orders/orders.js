import Order from '../../components/order/order';
import "./orders.css";

function Orders(){
    return (
        <div className="orders">
            <div>
                <button>Post Order</button>
                <div className="filters">
                    <select>
                        <option>All</option>
                    </select>
                    <select>
                        <option>All Coins</option>
                    </select>
                    <select>
                        <option>All Locations</option>
                    </select>
                    
                </div>
                <div>
                    <input placeholder="Min price" />
                    <input placeholder="Max price" />
                </div>
            </div>
            <div className="list">
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
            </div>
        </div>
    );
}

export default Orders;