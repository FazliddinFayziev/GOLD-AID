import { types } from "./types"


const reducer = (state, action) => {
    switch (action.type) {
        case types.TARGET:
            return {
                ...state,
                [action.key]: action.value,
            };
        case types.CALCULATE:
            return {
                ...state,
                backendScore: action.score,
                backendLevel: action.level,
            };
        case types.NAVIGATE_TO_HOME:
            console.log(state)
        default:
            return state;
    }
}

export default reducer