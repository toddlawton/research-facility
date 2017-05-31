import axios from 'axios';
import users from '../mock/users';

/**
 * Synchronous user fetch, mocked with static data
 * @return {Object} An action object containing full payload
 */
export function fetchUsersSync() {
	return {
		type: 'FETCH_PROFILES',
		payload: users
	};
}

/**
 * Asynchronous user fetch, redux-thunk style
 * @return {Function} A function containing async side-effects, responsible for later dispatch of action object
 */
export function fetchUsersAsyncThunk() {
	const fetchUsers = axios.get('http://jsonplaceholder.typicode.com/users');

	return (dispatch) => {
		fetchUsers.then(({data}) => {
			dispatch({ type: 'FETCH_PROFILES', payload: data });
		});
	};
}

/**
 * Asynchronous user fetch, redux-saga style
 * @return {Object} An object containing the action type
 */
export function fetchUsersAsyncSaga() {
	return {
		type: 'FETCH_USERS_SAGA_EXAMPLE'
	};
}
