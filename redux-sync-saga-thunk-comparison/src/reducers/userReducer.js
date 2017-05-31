const initialState = []

export default function userReducer(state = initialState, action = {}) {
	switch (action.type) {
	case 'FETCH_PROFILES':
		return action.payload;
	default:
		return state;
	}
}
