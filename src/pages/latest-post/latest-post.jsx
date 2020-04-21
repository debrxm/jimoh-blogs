import React from 'react';
import { Link } from 'react-router-dom';
import loader from '../../assets/loader.gif';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectAllBlog } from '../../redux/blog/blog.selector';
import { createStructuredSelector } from 'reselect';
import PostPreview from '../../components/post-preview/post-preview';
import './latest-post.scss';
const LatestPost = ({ allBlog }) => {
  return (
    <div className="latest-post">
      <div className="container">
        <section className="blog-area section">
          <h2 className="title">Latest Posts</h2>
          <div className="container ">
            <br />
            <br />
            <div className="output">
              {allBlog ? (
                allBlog.map((blog) => (
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
            <br />
            <br />
            <Link to="/blog">
              <span className="load-more-btn">View All Posts</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allBlog: selectAllBlog,
});

export default withRouter(connect(mapStateToProps)(LatestPost));
