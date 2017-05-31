import axios from 'axios';
import {
  put,
  takeEvery,
  call
} from 'redux-saga/effects';

export const apiFetch = () => {
	return axios.get('http://jsonplaceholder.typicode.com/users')
};

export function* fetchUsersSaga() {
	try {
		/**
		 call() creates a plain object describing the function call.
		 The redux-saga middleware takes care of executing the function call and resuming the generator with the resolved response.
		 */
		const results = yield call(apiFetch);
		yield put({ type: 'FETCH_PROFILES', payload: results.data });
	} catch (err) {
		yield put({ type: 'FETCH_ERROR', error: err.message });
	}
}

export function* usersSaga() {
	/* istanbul ignore next */
	yield takeEvery('FETCH_USERS_SAGA_EXAMPLE', fetchUsersSaga);
}
