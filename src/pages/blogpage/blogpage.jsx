import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { selectAllBlog } from '../../redux/blog/blog.selector';
import { createStructuredSelector } from 'reselect';
import { updateCategories } from '../../redux/blog/blog.actions';
import BlogPosts from '../../components/blog-posts/blog-posts';
import TagPage from '../tagpage/tagpage';
import PostPage from '../postpage/postpage';
import './blogpage.scss';
class Blogpage extends React.Component {
  state = {
    isLoading: true,
  };
  render() {
    const {
      match,
    } = this.props;
    return (
      <div className="blog-page">
        <Helmet>
          <title>Jimoh's Blog &mdash; Blogs</title>
          <meta property="og:title" content="Jimoh's Blog &mdash; Blogs" />
          <meta property="og:type" content="website" />
          <meta name="description" content="" />
          <meta property="og:site_name" content="Jimoh's Blog" />
          <meta
            property="og:url"
            content="https://www.jimohblogs.com.ng/blog"
          />
        </Helmet>

        <Route exact path={`${match.path}`} component={BlogPosts} />
        <Route exact path={`/blog/:tagId`} component={TagPage} />
        <Route path={`/blog/anime/:blogId`} component={PostPage} />
        <Route path={`/blog/design/:blogId`} component={PostPage} />
        <Route path={`/blog/health/:blogId`} component={PostPage} />
        <Route path={`/blog/music/:blogId`} component={PostPage} />
        <Route path={`/blog/sport/:blogId`} component={PostPage} />
        <Route path={`/blog/travel/:blogId`} component={PostPage} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCategories: (collectionsMap) =>
    dispatch(updateCategories(collectionsMap)),
});

const mapStateToProps = createStructuredSelector({
  allBlog: selectAllBlog,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Blogpage)
);
