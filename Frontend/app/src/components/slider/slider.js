import { useSelector,useDispatch } from 'react-redux';
import News from '../../pages/news/news';
import Orders from '../../pages/orders/orders';
import Prices from '../../pages/prices/prices';
import './slider.css';

function Slider(props){
    let view = useSelector(state => state.view);
    console.log(view);
    return (
        <div className="slider">
            <div className={`panes ${(view==="orders") ? "left" : (view==="news") ? "middle" : "right"}`}>
                <div className="side">
                    <Orders />
                </div>
                <div className="main">
                    <News />
                </div>
                <div className="side">
                    <Prices />
                </div>
            </div>
        </div>
    );
}

export default Slider;