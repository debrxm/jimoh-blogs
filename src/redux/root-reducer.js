import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import BlogReducer from './blog/blog.reducer';
import UserReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['blog'],
};

const rootReducer = combineReducers({
  blog: BlogReducer,
  user: UserReducer,
});

export default persistReducer(persistConfig, rootReducer);
