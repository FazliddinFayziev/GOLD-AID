import { types } from "./types"

const reducer = (state, action) => {
    switch (action.type) {
        case types.TARGET:
            return {
                ...state,
                [action.key]: action.value,
            };
        default:
            return state;
    }
}

export default reducer