import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectTagPost } from '../../redux/blog/blog.selector';
import PostPreview from '../../components/post-preview/post-preview';
import './tagpage.scss';

const TagPage = ({ blogs }) => {
  return (
    <div className="tag-page">
      <div className="output">
        {blogs ? (
          blogs.map((blog) => (
            <PostPreview
              showDate
              showTrunc
              showViewShare
              key={blog.title}
              blog_data={blog}
              reDirect
            />
          ))
        ) : (
          <div className="loader">
            {/* <img id="loader" src={loader} alt="Loader" /> */}
            {/* <p className="date">No more posts</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: selectTagPost(
      ownProps.match.params.tagId,
      ownProps.match.url
    )(state),
  };
};

export default withRouter(connect(mapStateToProps)(TagPage));
