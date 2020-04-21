import { createSelector } from 'reselect';

const selectBlog = (state) => state.blog;

export const selectAllBlog = createSelector([selectBlog], (blog) => blog.blogs);
export const selectAllComments = createSelector(
  [selectBlog],
  (blog) => blog.comments
);
export const selectViews = createSelector([selectBlog], (blog) => blog.views);
export const selectCurrentReading = createSelector(
  [selectBlog],
  (blog) => blog.reading
);
export const selectHistory = createSelector(
  [selectBlog],
  (blog) => blog.history
);
export const selectReadersFavorite = createSelector(
  [selectBlog],
  (blog) => blog.favorite
);

// export const selectPostComments = title =>
//   createSelector([selectAllComments], comments =>
//     comments.filter((item, index) => item.id.toLowerCase() === title)
//   );
// export const selectPostViews = title =>
//   createSelector([selectViews], views =>
//     views.filter((item, index) => item.id.toLowerCase() === title)
//   );
export const selectTagPost = (blogUrlParam, url) =>
  createSelector([selectAllBlog], (blog) =>
    blog.filter((item, index) => item.tag.toLowerCase() === blogUrlParam)
  );
export const selectBlogPost = (blogUrlParam, url) =>
  createSelector([selectAllBlog], (blog) =>
    blog.filter(
      (item, index) =>
        item.title.toLowerCase() === blogUrlParam.split('-').join(' ')
    )
  );
