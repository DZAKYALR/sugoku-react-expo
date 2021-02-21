const initState = {
    board: [],
    originBoard: [],
    isLoading: false,
    isError: false,
    isCorrect: '',
}

function boardReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return {
                ...state,
                board: action.payload
            }
        case 'SET_ORIGIN_BOARD':
            return {
                ...state,
                originBoard: action.origin
            }
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'SET_IS_ERROR':
            return {
                ...state,
                isError: action.payload
            }
        case 'SET_IS_CORRECT':
            return {
                ...state,
                isCorrect: action.payload
            }
        default:
            return state
    }
}

export default boardReducer

