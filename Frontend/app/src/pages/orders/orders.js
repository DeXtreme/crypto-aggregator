import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Order from '../../components/order/order';
import { API_HOST } from '../../config';
import { setRegions, setOrders, setMyOrders } from '../../store/actions';
import { showLogin } from '../../store/actions';
import "./orders.css";

function Orders(){
    let [ orderView, setOrderView ] = useState("orders");
    let [ isShowAddOrder, setShowAddOrder ] = useState(false);
    let [ locations, setLocations ] = useState([]);
    let [ newOrder, setNewOrder ] = useState({
        type: "B",
        coin: "BTC",
        price: "",
        by: "",
        contact: "",
        location: ""
    })
    let [ error, setError ] = useState(null);
    let [ loading, setLoading ] = useState(false);

    let account = useSelector(state => state.account);
    let orders = useSelector(state => state.orders);
    let regions = useSelector(state => state.regions);
    let myOrders = useSelector(state => state.myOrders);
    let dispatch = useDispatch();

    const showAddOrder = (show)=>{
        if(show){
            if(account==null){
                dispatch(showLogin(true));
            }else{
                setShowAddOrder(true);
            }
        }else{
            if(!loading){
                setShowAddOrder(false);
            }
        }
    }

    const handleChange = (e) => {
        setNewOrder(prev =>{
            let order = Object.assign({},prev);
            order[e.target.id] = e.target.value;
            return order;
        })
    }

    const addOrder = (e) =>{
        e.preventDefault();
        setError(null);
        setLoading(true);
        let url = `${API_HOST}v1/orders/`;
        fetch(url, {method:"POST", 
                    headers:{'Authorization': `Token ${account.token}`,
                             'Content-Type': 'application/json'},
                    body:JSON.stringify(newOrder)})
              .then(response => response.json())
              .then(json=>{
                  loadOrders();
                  setLoading(false);
                  showAddOrder(false);
              }).catch(error => {
                  console.log(error.message);
                  setError(error.message)
              }).finally((e)=> setLoading(false))
    }

    const loadOrders = ()=>{
        let url = `${API_HOST}v1/orders/`;
        fetch(url).then(response => response.json())
        .then((json)=>{
            dispatch(setOrders(json));         
        }).catch(error=>console.log(error.message))
    }

    const loadMyOrders = () =>{
        if(account){
            let url = `${API_HOST}v1/orders/?account=${account.id}`;
            fetch(url).then(response => response.json())
            .then((json)=>{
                console.log("myorders")
                console.log(json);
                dispatch(setMyOrders(json));         
            }).catch(error=>console.log(error.message))
        }
    }

    useEffect(()=>{
        let url = `${API_HOST}v1/orders/locations`;
        fetch(url).then(response => response.json())
        .then((json)=>{
            let locations = json.reduce((prev,region)=>prev.concat(region.locations),[])
                                    .sort((a,b)=>a.name>b.name)
            dispatch(setRegions(json));
            setLocations(locations);
            setNewOrder(prev =>{
                let order = Object.assign({},prev);
                order.location = locations[0].id;
                return order;
            })
        }).catch(error=>console.log(error.message))

        loadOrders();
        loadMyOrders();
    },[]);

    useEffect(()=>{
        loadMyOrders();
    },[account])

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
                {orders.map(order => <Order order={order} key={order.id} />)}
            </div>
        </div>
        :<div>
         myOrders
         </div>}
        {isShowAddOrder && <div className="add">
            <div onClick={()=>showAddOrder(false)} id="background" />
            {(!loading) ? <form onSubmit={addOrder}>
                <h1>Add Order</h1>
                { error && <p id="error">{error}</p>}
                <div>        
                    <select id="type"  value={newOrder.type} onChange={handleChange} >
                        <option value="B">Buying</option>
                        <option value="S">Selling</option>
                    </select>
                    <select id="coin" value={newOrder.coin}  onChange={handleChange}>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="USDT">USDT</option>
                        <option value="USDC">USDC</option>
                        <option value="BUSD">BUSD</option>
                    </select>
                </div>          
                <input id="price" value={newOrder.price} onChange={handleChange} placeholder="Price" inputMode="decimal" required/>        
                <input id="by" value={newOrder.by} onChange={handleChange} placeholder="Display Name" inputMode="text"required/>
                <input id="contact" value={newOrder.contact} onChange={handleChange} placeholder="Display Contact" inputMode='tel' required/>
                <select id="location" value={newOrder.location} onChange={handleChange}>
                    {locations.map((location,i)=><option key={location.id} value={location.id} >{location.name}</option>)}
                </select>
                <button type="submit">Submit</button>                  
            </form> :
            <div>
                <div class="loadingio-spinner-eclipse-rxkb3szgim"><div class="ldio-vh4jl67dfj8">
                <div></div>
                </div></div>
            </div>
            }
        </div>}
    </div>
    );
}

export default Orders;