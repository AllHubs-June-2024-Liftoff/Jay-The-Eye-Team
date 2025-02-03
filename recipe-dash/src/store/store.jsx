import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
import favoriteReducer from './favoritesSlice';

// Set up the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'menu', 'cart', 'favorites'],
};

// Wrap reducers in persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedMenuReducer = persistReducer(persistConfig, menuReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedFavoritesReducer = persistReducer(persistConfig, favoriteReducer);

// Configure the Redux store with a serializable check exception
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    menu: persistedMenuReducer,
    cart: persistedCartReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

    const persistor = persistStore(store);

    persistor.subscribe(() => {
      console.log("Persisted state:", persistor.getState());
      console.log("Bootstrapped:", persistor.getState().bootstrapped);
    });

export { store, persistor };