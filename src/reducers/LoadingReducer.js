/**
 * @author caott
 */


const loadingReducer = (
    state = {
        loading: false
    }, action
) => {
    switch (action.type) {
        case "IS_LOADING":
            return Object.assign({}, state, {
                loading: action.loading
            });
        default:
            return state;
    }
}

export default loadingReducer;