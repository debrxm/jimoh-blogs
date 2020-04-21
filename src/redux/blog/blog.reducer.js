import BlogActionTypes from './blog.types';
const INITIAL_STATE = {
  blogs: null,
  comments: [],
  views: [],
  history: [],
  reading: null,
  favorite: [],
};

const BlogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BlogActionTypes.UPDATE_CATEGORIES:
      return {
        ...state,
        blogs: action.payload,
      };
    case BlogActionTypes.UPDATE_BLOG_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case BlogActionTypes.UPDATE_BLOG_VIEWS:
      return {
        ...state,
        views: action.payload,
      };
    case BlogActionTypes.UPDATE_HISTORY:
      return {
        ...state,
        history: [...new Set([...state.history, action.payload])],
      };
    case BlogActionTypes.SET_CURRENT_READING:
      return {
        ...state,
        reading: action.payload,
      };
    case BlogActionTypes.SET_READERS_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };
    default:
      return state;
  }
};

export default BlogReducer;
