import BlogActionTypes from './blog.types';

export const updateCategories = (categoriesMap) => ({
  type: BlogActionTypes.UPDATE_CATEGORIES,
  payload: categoriesMap,
});
export const updateBlogComments = (comment) => ({
  type: BlogActionTypes.UPDATE_BLOG_COMMENTS,
  payload: comment,
});
export const updateBlogViews = (views) => ({
  type: BlogActionTypes.UPDATE_BLOG_VIEWS,
  payload: views,
});

export const updateHistory = (hist) => ({
  type: BlogActionTypes.UPDATE_HISTORY,
  payload: hist,
});
export const setCurrentReading = (reading) => ({
  type: BlogActionTypes.SET_CURRENT_READING,
  payload: reading,
});
export const setReadersFavorite = (favorite) => ({
  type: BlogActionTypes.SET_READERS_FAVORITE,
  payload: favorite,
});
