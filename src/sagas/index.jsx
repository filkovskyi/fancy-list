import { call, put, takeEvery } from "redux-saga/effects"
import { LIST_FETCH_REQUESTED, LIST_FETCH_SUCCEEDED, LIST_FETCH_FAILED } from "../constant"

function* fetchList() {
  try {
    const response = yield call(fetch, "./mock-data/itemsList.json")
    const data = yield call([response, response.json])
    yield put({ type: LIST_FETCH_SUCCEEDED, ...data })
  } catch (e) {
    yield put({ type: LIST_FETCH_FAILED, message: e.message })
    console.error(e.message)
  }
}

function* rootSaga() {
  yield takeEvery(LIST_FETCH_REQUESTED, fetchList)
}

export default rootSaga
