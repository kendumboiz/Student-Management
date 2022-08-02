import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import authReducer from 'features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store: any = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
