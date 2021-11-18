import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPrices } from '../../store/actions';
import Price from '../../components/price/price';
import './prices.css';

function Prices(){

    let prices = useSelector(state=>state.prices);
    let dispatch = useDispatch();

    const loadPrices = ()=>{
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(response => response.json())
        .then(json=>{
            console.log(json[0])
            dispatch(setPrices(json));
        })
        .catch((e)=>console.log(e.message));

        setTimeout(()=>loadPrices(),120000);
    }

    useEffect(()=>{
       loadPrices(); 
    },[]);

    return(
        <div id="prices">
            {Object.keys(prices).map(id=><Price price={prices[id]} key={id}/>)}
        </div>
    );
}

export default Prices;