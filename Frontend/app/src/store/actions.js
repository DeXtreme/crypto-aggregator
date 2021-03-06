export const TOGGLE_DARK = "dark/toggle";
export const ADD_ACCOUNT = "account/add";
export const REMOVE_ACCOUNT = "account/remove";
export const SELECT_VIEW = "view/select";
export const SHOW_LOGIN = "login/show";
export const ADD_ARTICLES = 'articles/add';
export const SET_ORDERS = 'orders/set';
export const SET_MYORDERS = 'myorders/set';
export const SET_REGIONS = 'regions/set';
export const SET_PRICES = 'prices/add'

export const toggleDark = () => ({type: TOGGLE_DARK});
export const addAccount = (account) => ({type:ADD_ACCOUNT, payload:account,});
export const removeAccount = (account) => ({type:REMOVE_ACCOUNT});
export const selectView = (view) => ({type: SELECT_VIEW, payload: view})
export const showLogin = (show) => ({type: SHOW_LOGIN, payload: show})
export const addArticles = (articles, isPrev=false) => ({type: ADD_ARTICLES, 
                                                       payload: {
                                                            articles: articles, 
                                                            isPrev: isPrev
                                                        }
                                                    });

export const setOrders = (orders) => ({type:SET_ORDERS, payload:orders});
export const setMyOrders = (orders) => ({type: SET_MYORDERS, payload:orders});
export const setRegions = (regions) =>  ({type: SET_REGIONS, payload:regions});
export const setPrices = (prices) =>  ({type: SET_PRICES, payload:prices});