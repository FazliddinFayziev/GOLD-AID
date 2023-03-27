import { types } from "./types"


const reducer = (state, action) => {
    switch (action.type) {
        case types.TARGET:
            return {
                ...state,
                [action.key]: action.value,
            };
        case types.REGISTER_PAGE_BUTTON:
            console.log(state)
        default:
            return state;
    }
}

export default reducer