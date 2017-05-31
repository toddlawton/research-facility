import { fork } from 'redux-saga/effects';
import { usersSaga } from './usersSaga';

export default function* rootSaga() {
	yield [
		fork(usersSaga)
	];
}
