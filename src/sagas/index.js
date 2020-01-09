import { all, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

export function* helloSaga() {
  console.log('Hello Sagas!')
  yield put(push('/example'))
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
  ])
}
