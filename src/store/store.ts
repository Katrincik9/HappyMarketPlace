import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, type PersistConfig } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import cartReducer from './cartSlice';
import settingsReducer from './settingsSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  settings: settingsReducer,
});

type AppState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<AppState> = {
  key: 'happy-marketplace',
  storage,
  whitelist: ['settings'],
};

export const store = configureStore({
  reducer: persistReducer<AppState>(persistConfig, rootReducer)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
