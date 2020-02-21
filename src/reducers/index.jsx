import {
  LIST_FETCH_REQUESTED,
  LIST_FETCH_SUCCEEDED,
  LIST_FETCH_FAILED,
  LIST_FILTER_BY_NAME,
  LIST_FILTER_BY_NUMBER,
  CREATE_FORM_ITEM,
  EDIT_FORM_ITEM,
  DELETE_FORM_ITEM,
  CREATE_NEW_ACCOUNT
} from "../constant"

import { filterItemsByName, filterItemsByNumber, maxAccountNumber } from "./reducer-helper"

const initialState = {
  data: [],
  filteredData: [],
  maxNumber: 0,
  loading: false,
  showCreateForm: false,
  editableForm: {},
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
        data: [...state.data, action.payload],
        loading: false
      }
    }
    case EDIT_FORM_ITEM: {
      return {
        ...state,
        editableForm: state.data[action.payload]
      }
    }
    case DELETE_FORM_ITEM: {
      const removableId = state.data[action.payload].id
      return {
        ...state,
        filteredData: [...state.data].filter(i => {
          return i.id !== removableId
        }),
        data: [...state.data].filter(i => {
          return i.id !== removableId
        })
      }
    }
    case CREATE_NEW_ACCOUNT: {
      return {
        ...state,
        showCreateForm: !state.showCreateForm
      }
    }
    default:
      return state
  }
}

export default rootReducer
