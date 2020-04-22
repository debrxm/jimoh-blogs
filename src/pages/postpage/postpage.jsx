import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { DeviceUUID } from 'device-uuid';
import renderHTML from 'react-render-html';
import {
  getAllComments,
  firestore,
  updateViews,
} from '../../firebase/firebase.utils';
import { selectBlogPost } from '../../redux/blog/blog.selector';
import {
  setCurrentReading,
  updateHistory,
} from '../../redux/blog/blog.actions';
import { updateBlogComments } from '../../redux/blog/blog.actions';
import ProgressIndicator from '../../components/progress-indicator/progress-indicator';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import Comments from '../../components/comments/comments';
import CommentBox from '../../components/comment-box/comment-box';
import userIco from '../../assets/userIco.svg';
import './postpage.scss';
class PostPage extends React.Component {
  state = {
    comments: [],
    userIp: '',
  };

  async componentDidMount() {
    const uuid = new DeviceUUID().get();
    this.setState({ userIp: uuid });

    if (this.props.blog[0]) {
      const commentRef = await getAllComments({
        collection: 'blog_comments',
        documente: this.props.blog[0].title.toLowerCase(),
      });
      if (commentRef) {
        commentRef.onSnapshot((snapShot) => {
          this.setState({
            comments: snapShot.data() ? snapShot.data().comments : [],
          });
        });
      }
    }
    await updateViews({
      collection: 'blog_views',
      title: this.props.blog[0].title.toLowerCase(),
      userIp: this.state.userIp,
    });
    setTimeout(() => {
      this.props.setCurrentReading(this.props.blog[0]);
    }, 1000);
  }
  getCommentOnFirstAdd = async () => {
    const commentRef = firestore.collection('blog_comments');
    commentRef.onSnapshot(async (snapshot) => {
      const comments = [];
      snapshot.docs.forEach((doc) => {
        const commentObj = {
          id: doc.id,
          comments: doc.data(),
        };
        comments.push(commentObj);
      });
      this.props.updateBlogComments(comments);
    });
    if (this.props.blog[0] & (this.state.comments.length === 0)) {
      const commentRef = await getAllComments({
        collection: 'blog_comments',
        documente: this.props.blog[0].title.toLowerCase(),
      });
      if (commentRef) {
        commentRef.onSnapshot((snapShot) => {
          this.setState({
            comments: snapShot.data() ? snapShot.data().comments : [],
          });
        });
      }
    }
  };
  componentWillUnmount() {
    this.props.addToHistory(this.props.blog[0]);
  }
  render() {
    const { title, content, image, tag, updated_at } = this.props.blog[0];
    const date = new Date(updated_at.seconds * 1000);

    return (
      <div className="post-page container">
        <Helmet>
          <title>Jimoh's Blog &mdash; {title}</title>
          <meta title="keywords" content={`${tag}, ${title}`} />
          <meta name="description" content={`${title} `} />
          <link rel="icon" href="../../../public/favicon.ico" />
          <meta
            property="og:title"
            content={`We Read African &mdash; ${title}`}
          />
          <meta property="og:type" content="website" />
          <meta name="description" content="" />
          <meta property="og:site_name" content="Jimoh's Blog" />
          <meta
            property="og:url"
            content={`https://www.jimohblog.com.ng/${title}`}
          />
        </Helmet>
        <div className="full-blog">
          <h1 className="title">{title}</h1>
          <div className="post-info">
            <div className="left-area">
              <img src={userIco} alt="Profile" />
            </div>
            <div className="middle-area">
              <b id="blog-author">Jimoh Abdul-Rahman</b>
              <br />
              <h6 className="date" id="blog-date">
                {date.toString().toString().split(' ').slice(0, 5).join(' ')}
              </h6>
            </div>
          </div>

          <div className="full-blog-image">
            <img src={image} alt="Blog img" />
          </div>
          <div className="blog-content">{renderHTML(`${content}`)}</div>
        </div>
        <ProgressIndicator />
        <div className="full-blog-footer">
          <div className="share">
            <span>Share This Post</span>
            <div className="social">
              <a
                href={`http://www.facebook.com/sharer.php?u=https://jimoh-blogs.netlify.app/${tag}/${title
                  .split(' ')
                  .join('-')
                  .toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="logo-border">
                  <img src={facebook} alt="Facebook Logo" />
                </div>
              </a>
              <a href="https://twitter.com/ozzycodes">
                <div className="logo-border">
                  <img src={twitter} alt="Twitter Logo" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <CommentBox
          category="blog_comments"
          title={this.props.blog[0].title}
          getCommentOnFirstAdd={this.getCommentOnFirstAdd}
        />
        <Comments collection="blog_comments" comments={this.state.comments} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: selectBlogPost(
      ownProps.match.params.blogId,
      ownProps.match.url
    )(state),
    prevHistory: state.blog.history,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setCurrentReading: (reading) => dispatch(setCurrentReading(reading)),
  updateBlogComments: (comment) => dispatch(updateBlogComments(comment)),
  addToHistory: (history) => dispatch(updateHistory(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
