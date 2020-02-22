import {
  LIST_FILTER_BY_NAME,
  LIST_FILTER_BY_NUMBER,
  SHOW_CREATE_NEW_ACCOUNT_FORM,
  LIST_FETCH_REQUESTED,
  SUBMIT_FORM_ITEM,
  EDIT_FORM_ITEM,
  DELETE_FORM_ITEM
} from "../constant"

export const filterItemsByName = name => {
  return { type: LIST_FILTER_BY_NAME, payload: name }
}

export const filterItemsByNumber = param => {
  return { type: LIST_FILTER_BY_NUMBER, payload: param }
}

export const createNewAccount = param => {
  return { type: SHOW_CREATE_NEW_ACCOUNT_FORM }
}

export const listFetchInitAction = () => {
  return { type: LIST_FETCH_REQUESTED }
}

export const submitForm = data => {
  return { type: SUBMIT_FORM_ITEM, payload: data }
}

export const editableFormHandler = data => {
  return { type: EDIT_FORM_ITEM, payload: data }
}

export const deleteItemHandler = data => {
  return { type: DELETE_FORM_ITEM, payload: data }
}
