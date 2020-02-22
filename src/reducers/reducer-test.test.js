import rootReducer from "./index"
import { LIST_FETCH_REQUESTED, LIST_FETCH_FAILED, EDIT_FORM_ITEM } from "../constant"
import expect from "expect"

const initialState = {
  data: [],
  filteredData: [],
  maxNumber: 0,
  loading: false,
  showCreateForm: false,
  editableForm: {},
  error: ""
}

describe("root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      ...initialState
    })
  })

  it("handles data request", () => {
    expect(rootReducer(initialState, { type: LIST_FETCH_REQUESTED })).toEqual({
      ...initialState,
      loading: true,
      error: ""
    })
  })

  it("handles data request is failure", () => {
    expect(rootReducer(initialState, { type: LIST_FETCH_FAILED })).toEqual({
      ...initialState,
      loading: false,
      error: undefined // that because we don't have backed API
    })
  })
})
