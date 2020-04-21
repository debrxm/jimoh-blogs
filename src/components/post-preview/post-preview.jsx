import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectAllComments, selectViews } from '../../redux/blog/blog.selector';
import renderHTML from 'react-render-html';
import comment from '../../assets/comment.svg';
import share from '../../assets/share.svg';
import facebook from '../../assets/socials/facebook.svg';
import twitter from '../../assets/socials/twitter.svg';
import linkedin from '../../assets/socials/linkedin.svg';
import view from '../../assets/view.svg';
import './post-preview.scss';
class PostPreview extends React.Component {
  state = {
    setComment: {},
    views: {},
  };
  componentDidMount() {
    this.props.postComments
      .filter(
        (item, index) => item.id === this.props.blog_data.title.toLowerCase()
      )
      .map((comm) => this.setState({ setComment: comm }));
    this.props.postViews
      .filter(
        (item, index) => item.id === this.props.blog_data.title.toLowerCase()
      )
      .map((view) => this.setState({ views: view }));
  }
  render() {
    const {
      blog_data,
      showTrunc,
      showDate,
      closeSearch,
      showViewShare,
    } = this.props;
    const { title, content, image, tag, updated_at, truncate } = blog_data;
    const handleRouting = () => {
      if (closeSearch) {
        this.props.closeSearch();
      }
    };
    const date = new Date(updated_at.seconds * 1000),
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      currentMonth = months[date.getMonth()],
      currentDate = date.getDate();
    // year = date.getFullYear(),
    // trunc = truncate.split(' ').slice(0, 12).join(' ');
    let commentLength = 0;
    if (this.state.setComment.comments) {
      this.state.setComment.comments.comments.forEach((comment) => {
        commentLength = commentLength + comment.replies.length;
      });
    }
    return (
      <div className="post-preview">
        <div className="blog-image">
          <img src={image} alt="post img" />
          {showDate ? (
            <button className="date-created">
              {currentDate} <br /> {currentMonth}
            </button>
          ) : null}
        </div>

        <div className="blog-info">
          <div
            className="post-preview-header"
            style={showTrunc ? { minHeight: '150px' } : { minHeight: '70px' }}
          >
            <Link
              to={`/blog/${tag}/${title.split(' ').join('-').toLowerCase()}`}
            >
              <h4 className="title" id="post-link" onClick={handleRouting}>
                {title}
              </h4>
            </Link>
            <br />
            <h5 className="tag">
              Category: <span>{tag.replace('_', ' ')}</span>
            </h5>
            {showTrunc ? (
              <p className="preview-text">
                {/* {renderHTML(content)[0]
                  .props.children[0].split(' ')
                  .slice(0, 30)
                  .join(' ')} */}
                {renderHTML(content).props
                  ? renderHTML(content)
                      .props.children[0].split(' ')
                      .slice(0, 12)
                      .join(' ')
                  : renderHTML(content)[0]
                      .props.children[0].split(' ')
                      .slice(0, 12)
                      .join(' ')}
                ...{' '}
                <Link
                  to={`/blog/${tag.toString().toLowerCase()}/${title
                    .split(' ')
                    .join('-')
                    .toLowerCase()}`}
                >
                  <span className="read-more" onClick={handleRouting}>
                    read more
                  </span>
                </Link>
              </p>
            ) : null}
          </div>
          <div className="post-footer">
            <span className="post-footer-comment">
              <img src={comment} alt="Comment Icon" />
              {this.state.setComment.comments
                ? commentLength + this.state.setComment.comments.comments.length
                : 0}{' '}
              Comments
            </span>
            <span className="post-footer-comment">
              <img src={view} alt="Comment Icon" />
              {this.state.views.view
                ? this.state.views.view.views.length
                : 0}{' '}
              Views
            </span>

            {showViewShare ? (
              <span className="post-footer-share">
                <img src={share} alt="Comment Icon" />
                share
                <div className="share">
                  <ul>
                    <li>
                      <a
                        href={`http://www.facebook.com/sharer.php?u=https://wereadafrican.com/${tag}/${title
                          .split(' ')
                          .join('-')
                          .toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={facebook} alt="Facebook Icon" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={twitter} alt="Twitter Icon" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`http://www.linkedin.com/shareArticle?mini=true&amp;url=https://wereadafrican.com/${tag}/${title
                          .split(' ')
                          .join('-')
                          .toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={linkedin} alt="Linkedin Icon" />
                      </a>
                    </li>
                  </ul>
                </div>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  postComments: selectAllComments,
  postViews: selectViews,
});

export default withRouter(connect(mapStateToProps)(PostPreview));
