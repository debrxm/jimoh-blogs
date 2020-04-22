import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllBlog } from '../../redux/blog/blog.selector';
import LatestPost from '../../components/latest-post/latest-post';
import loader from '../../assets/loader.gif';
import './homepage.scss';
const Homepage = ({ allBlog }) => {
  return (
    <div className="homepage">
      {allBlog ? (
        <LatestPost blog={allBlog} />
      ) : (
        <div className="loader">
          <img id="loader" src={loader} alt="Loader" />
        </div>
      )}
      {allBlog ? (
        <div className="btn-container">
          <Link to="/blog">View All Blog</Link>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allBlog: selectAllBlog,
});

export default connect(mapStateToProps)(Homepage);
