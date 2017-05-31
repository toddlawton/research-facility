# Comparison: redux redux-saga redux-thunk

In this project, a simple e-mail directory app is implemented using redux in 3 flavours: sagas, thunk, and plain synchronous actions. The following diagram should help visualize the flow of actions:

![redux redux-thunk redux-saga - page 1 1](https://cloud.githubusercontent.com/assets/5748440/26634296/2b0a8348-45e4-11e7-80fa-40543fdfc1b3.jpeg)

### Redux-Saga

- There is a strong separation of concerns in the action/side-effect/reducer relationship. The action creator and reducer for the saga are both pure, and the side effect logic is isolated.
- Performs async side-effects in a synchronous style that is easy to read at a glance
- redux-saga aims to helps with a lot of common patterns seen with async actions, and as a result looks as much like a utility library as it does a redux middleware. Many advanced use cases should be covered without needing to write your own solution.
- Testing sagas is very clean and easy. We don't need to worry about mocking stores or functions. In the example below all we care about is that the correct instructions are returned by call() to make an api fetch, and we can pass in the expected result to the next yield. We have 100% coverage without bloating our test files with mocks.
```
describe('fetchUsersSaga', () => {
	it('should yield an Effect call(apiFetch)', () => {
	  expect(successfulSaga.next().value).toEqual(call(apiFetch));
	});
	it('should yield an Effect put({ type: "FETCH_PROFILES", payload: users })', () => {
	  expect(successfulSaga.next(mockApiResponse).value).toEqual(put({ type: 'FETCH_PROFILES', payload: mockUsers }));
	});
})
```

### Redux-Thunk

- Less mental overhead in understanding how generators are handled by redux-saga (paused, resumed behind the scenes automagically)
- Feels familiar, like regular synchronous redux on steroids
- Compared to redux-saga, having full control over `dispatch()` makes redux-thunk feel less like a black box solution
