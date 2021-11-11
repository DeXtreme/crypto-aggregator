import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Order from '../../components/order/order';
import { API_HOST } from '../../config';
import { setRegions } from '../../store/actions';
import { showLogin } from '../../store/actions';
import "./orders.css";

function Orders(){
    let [ orderView, setOrderView ] = useState("orders");
    let [ isShowAddOrder, setShowAddOrder ] = useState(false);
    let account = useSelector(state => state.account);
    let orders = useSelector(state => state.orders);
    let regions = useSelector(state => state.regions);
    let myOrders = useSelector(state => state.myOrders);
    let dispatch = useDispatch();

    let locations = regions.reduce((prev,region)=>prev.concat(region.locations),[])
                           .sort((a,b)=>a.name>b.name)

    const showAddOrder = (show)=>{
        //if(account==null){
        //    dispatch(showLogin(true));
        //}else{
            setShowAddOrder(true);
        //}
    }

    useEffect(()=>{
        let url = `${API_HOST}v1/orders/locations`;
        fetch(url).then(response => response.json())
        .then((json)=>{
            console.log(json);
            dispatch(setRegions(json));
        }).catch(error=>console.log(error.message))
    },[]);


    return (
        <div className="orders">
            {account && <div className="tabs">
                <button className={(orderView=="orders") ? "active": ""}
                        onClick={()=>setOrderView("orders")}>Orders</button>
                <button className={(orderView=="myorders") ? "active": ""}
                        onClick={()=>setOrderView("myorders")}>My Orders</button>
            </div>}

            {(orderView=="orders") ? <div className="all">
                <button onClick={showAddOrder}>Post Order</button>
                <div className="filters">
                    <select>
                        <option>All</option>
                        <option value="B">Buying</option>
                        <option value="S">Selling</option>
                    </select>
                    <select>
                        <option value="">All Coins</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="USDT">USDT</option>
                        <option value="USDC">USDC</option>
                        <option value="BUSD">BUSD</option>
                    </select>
                    <select>
                        <option value="">All Regions</option>
                        {regions.map(region=><option key={region.id} value={region.id}>{region.name}</option>)}
                    </select>
                    <select>
                        <option>All Locations</option>
                        {locations.map(location=><option key={location.id} value={location.id}>{location.name}</option>)}
                    </select>
                    
                </div>
                <div className="filters">
                    <input placeholder="Min price" />
                    <input placeholder="Max price" />
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
        :<div>
         myOrders
         </div>}
        {isShowAddOrder && <div className="add">
            <div id="background" />
            <form>
                <h1>Add Order</h1>
                <div>        
                <select>
                    <option value="B">Buying</option>
                    <option value="S">Selling</option>
                </select>
                <select>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                    <option value="USDC">USDC</option>
                    <option value="BUSD">BUSD</option>
                </select>
                </div>          
                <input placeholder="Price" inputMode="decimal" required />        
                <input placeholder="Display Name" inputMode="text" required />
                <input placeholder="Display Contact" inputMode="text" required />
                <select>
                    {locations.map(location=><option key={location.id} value={location.id}>{location.name}</option>)}
                </select>
                <button>Submit</button>                  
            </form>
        </div>}
    </div>
    );
}

export default Orders;