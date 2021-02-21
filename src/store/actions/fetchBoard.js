const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
const encodeParams = (params) => 
Object.keys(params)
.map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
.join('&');
const url = 'https://sugoku.herokuapp.com/'
let time = 0

export const setBoard = (payload) => {
    const difficulty = payload || 'easy'
    return (dispatch) => {
        dispatch(setLoading(true))
        fetch(url + 'board?difficulty=' + difficulty)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'SET_BOARD',
                payload: data.board
            })
            const origin = JSON.parse(JSON.stringify(data.board))
            dispatch({
                type: 'SET_ORIGIN_BOARD',
                origin: origin
            })
            dispatch(setLoading(false))
        })
        .catch(() => dispatch(setError(true)))
    }
}
export const changeBoard = (board) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_BOARD',
            payload: board
        })
    }
}

export const solveBoard = (inputBoard) => {
    const obj = {board: inputBoard}
    return (dispatch) => {
        fetch(url + 'solve', {
            method: 'POST',
            body: encodeParams(obj),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: 'SET_BOARD',
                payload: data.solution
            })
        })
        .catch(() => dispatch(setError(true)))
    }
}

export const validateBoard = (inputBoard) => {
    const obj = {board: inputBoard}
    return (dispatch) => {
    fetch(url + 'validate', {
        method: 'POST',
        body: encodeParams(obj),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: 'SET_IS_CORRECT',
            payload: data.status
        })
        if (data.status === 'solved') {
            time = 600
        } else {
            time = 3600
        }
        setTimeout(() => {
            dispatch({
                type: 'SET_IS_CORRECT',
                payload: ''
            })
        }, time);
    })
    .catch(() => dispatch(setError(true)))
}
}

export const unmount = () => {
    return (dispatch) => {
        dispatch({
            type: 'SET_INIT_BOARD',
            payload: []
        })
        dispatch({
            type: 'SET_IS_CORRECT',
            payload: ''
        })
        dispatch({
            type: 'SET_BOARD',
            payload: []
        })
        dispatch(setLoading(true))
    }
}

const setLoading = (value) => {
  return {
    type: 'SET_IS_LOADING',
    payload: value
  }
}

const setError = (value) => {
  return {
    type: 'SET_IS_ERROR',
    payload: value
  }
}