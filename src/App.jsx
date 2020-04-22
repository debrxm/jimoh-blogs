import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
  auth,
  firestore,
  createUserProfileDocument,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import {
  updateCategories,
  updateBlogComments,
  updateBlogViews,
} from './redux/blog/blog.actions';
import { selectAllBlog } from './redux/blog/blog.selector';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Contactpage from './pages/contactpage/contactpage';
import Homepage from './pages/homepage/homepage';
import Aboutpage from './pages/aboutpage/aboutpage';
import Blogpage from './pages/blogpage/blogpage';
import NotFound from './pages/notfoundpage/NotFoundPage';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    isShowSearch: false,
  };
  unsubscribFromSnapshot = null;
  unSubscribeFromAuth = null;
  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        document.querySelector('.navbar').classList.remove('trans');
        document.querySelector('.navbar').classList.add('dark');
      } else {
        document.querySelector('.navbar').classList.add('trans');
        document.querySelector('.navbar').classList.remove('dark');
      }
    });
    const {
      updateBlogComments,
      updateCategories,
      setCurrentUser,
      updateBlogViews,
    } = this.props;
    this.setState({ isLoading: true });
    const blogRef = firestore.collection('blog').orderBy('updated_at', 'desc');
    const commentRef = firestore.collection('blog_comments');
    const viewRef = firestore.collection('blog_views');
    commentRef.onSnapshot(async (snapshot) => {
      const comments = [];
      snapshot.docs.forEach((doc) => {
        const commentObj = {
          id: doc.id,
          comments: doc.data(),
        };
        comments.push(commentObj);
      });
      updateBlogComments(comments);
    });
    blogRef.onSnapshot(async (snapshot) => {
      const blogs = [];
      snapshot.docs.forEach((doc) => {
        blogs.push(doc.data());
      });
      updateCategories(blogs);
    });
    viewRef.onSnapshot(async (snapshot) => {
      const views = [];
      snapshot.docs.forEach((doc) => {
        const viewObj = {
          id: doc.id,
          view: doc.data(),
        };
        views.push(viewObj);
      });
      // const compare = (a, b) => {
      //   if (a.posted_at > b.posted_at) return 1;
      //   return 0;
      // };
      updateBlogViews(views);
    });
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
      this.setState({
        isLoading: false,
      });
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  handleSearchShow = () => {
    this.setState({ isShowSearch: !this.state.isShowSearch });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/blog" component={Blogpage} />
          <Route exact path="/about" component={Aboutpage} />
          <Route exact path="/contact" component={Contactpage} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  updateCategories: (collectionsMap) =>
    dispatch(updateCategories(collectionsMap)),
  updateBlogComments: (comment) => dispatch(updateBlogComments(comment)),
  updateBlogViews: (views) => dispatch(updateBlogViews(views)),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  allBlogs: selectAllBlog,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
