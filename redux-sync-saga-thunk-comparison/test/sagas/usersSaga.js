import { call, put } from 'redux-saga/effects';
import { apiFetch, fetchUsersSaga, usersSaga } from '../../src/sagas/usersSaga';
import mockUsers from '../../src/mock/users';

const mockApiResponse = {
	data: mockUsers
};


describe('apiFetch', () => {
	it('should return a Promise', () => {
		expect(apiFetch()).toBeInstanceOf(Promise);
	})
});

const successfulSaga = fetchUsersSaga();

describe('fetchUsersSaga', () => {
	it('should yield an Effect call(apiFetch)', () => {
	  expect(successfulSaga.next().value).toEqual(call(apiFetch));
	});
	it('should yield an Effect put({ type: "FETCH_PROFILES", payload: users })', () => {
	  expect(successfulSaga.next(mockApiResponse).value).toEqual(put({ type: 'FETCH_PROFILES', payload: mockUsers }));
	});
})

const failedSaga = fetchUsersSaga();

failedSaga.next();

describe('fetchUsersSaga', () => {
	it('should yield an Effect put({ type: "FETCH_ERROR", error: errMsg })', () => {
	  expect(failedSaga.next(null).value).toEqual(put({ type: 'FETCH_ERROR', "error": "Cannot read property 'data' of null" }));
	});
})
