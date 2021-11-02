export const ADD_ACCOUNT = "account/add";
export const REMOVE_ACCOUNT = "account/remove";
export const SELECT_VIEW = "view/select";
export const SHOW_LOGIN = "login/show";
export const ADD_ARTICLES = 'articles/add';

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
