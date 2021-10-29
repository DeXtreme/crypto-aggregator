export const ADD_ACCOUNT = "account/add";
export const REMOVE_ACCOUNT = "account/remove";
export const SELECT_VIEW = "view/select";

export const addAccount = (account) => ({type:ADD_ACCOUNT, payload:account,});
export const removeAccount = (account) => ({type:ADD_ACCOUNT});
export const selectView = (view) => ({type: SELECT_VIEW, payload: view})
