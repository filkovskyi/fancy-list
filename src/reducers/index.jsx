import {
  LIST_FETCH_REQUESTED,
  LIST_FETCH_SUCCEEDED,
  LIST_FETCH_FAILED,
  LIST_FILTER_BY_NAME,
  LIST_FILTER_BY_NUMBER,
  CREATE_FORM_ITEM
} from "../constant"

import { filterItemsByName, filterItemsByNumber, maxAccountNumber } from "./reducer-helper"

const initialState = {
  data: [],
  filteredData: [],
  maxNumber: 0,
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
        data: action.content,
        maxNumber: maxAccountNumber(action.content),
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

    case LIST_FILTER_BY_NAME: {
      return {
        ...state,
        filteredData: filterItemsByName(state.data, action.payload),
        loading: false
      }
    }
    case LIST_FILTER_BY_NUMBER: {
      return {
        ...state,
        filteredData: filterItemsByNumber(state.data, action.payload),
        loading: false
      }
    }
    case CREATE_FORM_ITEM: {
      return {
        ...state,
        filteredData: [...state.data, action.payload],
        loading: false
      }
    }
    default:
      return state
  }
}

export default rootReducer
