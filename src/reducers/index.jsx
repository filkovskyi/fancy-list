import { LIST_FETCH_REQUESTED, LIST_FETCH_SUCCEEDED, LIST_FETCH_FAILED } from "../constant"

const initialState = {
  data: [],
  loading: false,
  error: ""
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_FETCH_REQUESTED: {
      return {
        ...state,
        loading: true,
        error: ""
      }
    }
    case LIST_FETCH_SUCCEEDED: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case LIST_FETCH_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    default:
      return state
  }
}

export default rootReducer
