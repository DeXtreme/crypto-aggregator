import { useState } from 'react';
import './order.css';

function Order({order,editable,handleEdit,handleDelete}){
    const types = {B:"Buying",S:"Selling"}

    let [ isShowMenu, setShowMenu ] = useState(false);

    const showMenu = () =>{
        setShowMenu(prev=>!prev);
    }

    return (
        <div className="order">
            <hr />
            <div className="content">
                <div className="card">
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
                { editable &&
                <div className="menu">
                    <button className="button" onClick={showMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className={`dropdown ${(isShowMenu) ? "show" : ""}`}>
                        <button onClick={()=>{showMenu(false);handleEdit(order)}}>Edit</button>
                        <button onClick={()=>{showMenu(false);handleDelete(order.id)}}>Delete</button>
                    </div>
                </div>
                }
            </div>
            
        </div>
    );
}

export default Order;