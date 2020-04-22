import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectAllBlog } from '../../redux/blog/blog.selector';
import { createStructuredSelector } from 'reselect';
import PostPreview from '../../components/post-preview/post-preview';
import loader from '../../assets/loader.gif';
import './blog-posts.scss';
export const BlogPosts = ({ allBlog, history }) => {
  return (
    <div className="blog-post">
      <div className="output">
        {allBlog ? (
          allBlog.map(blog => (
            <PostPreview
              showTrunc
              showViewShare
              showDate
              key={blog.title}
              blog_data={blog}
            />
          ))
        ) : (
          <div className="loader">
            <img id="loader" src={loader} alt="Loader" />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allBlog: selectAllBlog
});

export default withRouter(connect(mapStateToProps)(BlogPosts));
