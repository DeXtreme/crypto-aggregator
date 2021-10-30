import * as ACTIONS from './actions';

let initial_state = {
    account: null,
    view: "news",
    login: false
}

function reducer(state = initial_state, action){
    switch(action.type){
        case ACTIONS.ADD_ACCOUNT:
            let account = {
                name : action.payload.name,
                photourl : action.payload.photourl,
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
        default:
            return state;
    }
}

export default reducer;