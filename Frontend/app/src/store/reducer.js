import * as ACTIONS from './actions';

let initial_state = {
    account: null,
    view: "news",
    login: false,
    articles: [],
    orders: [],
    myOrders: [],
    regions: [],
    prices : [],
}

function reducer(state = initial_state, action){
    switch(action.type){
        case ACTIONS.ADD_ACCOUNT:
            let account = {
                id: action.payload.id,
                name : action.payload.name,
                photoUrl : action.payload.photoUrl,
                token : action.payload.token
            }
            return {...state, account: account}
        case ACTIONS.REMOVE_ACCOUNT:
            return {...state, account: null};
        case ACTIONS.SELECT_VIEW:
            return {...state, view:action.payload}
        case ACTIONS.SHOW_LOGIN:
            let show = !state.account && action.payload;
            return {...state, login: show};
        case ACTIONS.ADD_ARTICLES:
            let new_articles = action.payload.articles;
            let old_articles = state.articles;
            let isPrev = action.payload.isPrev;
            if(!isPrev){
                return {...state, articles: [...new_articles,...old_articles]};
            }else{
                return {...state, articles: [...old_articles,...new_articles]};
            }
        case ACTIONS.SET_ORDERS:
            let orders = action.payload;
            return {...state, orders:orders};
        case ACTIONS.SET_MYORDERS:
            let myOrders = action.payload;
            return {...state, myOrders:myOrders};
        case ACTIONS.SET_REGIONS:
            let regions = action.payload;
            return {...state, regions:regions};
        case ACTIONS.SET_PRICES:
            let data = action.payload;
            let prices = data.map((coin,i)=>({id:i,
                                              name: coin["name"],
                                              price: coin["current_price"],
                                              cap: coin["market_cap"],
                                              change: coin["price_change_percentage_24h"]}));
            return {...state, prices:prices};    
        default:
            return state;
    }
}

export default reducer;