import React from 'react';
import { withRouter } from 'react-router-dom';
import './single-post.scss';
const SinglePost = ({ history, cont }) => {
  const { title, views, comments, content, image, tag, updated_at } = cont;
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
      'Dec'
    ],
    currentMonth = months[date.getMonth()],
    currentDate = date.getDate(),
    trunc = content
      .split(' ')
      .slice(0, 3)
      .join(' ');
  return (
    <div className="card">
      <div className="single-post post-style-1">
        <div className="blog-image">
          <img src={image} alt="post img" />
          <button className="date-created">
            {currentDate} <br /> {currentMonth}
          </button>
        </div>

        <div className="blog-info">
          <h4 className="date" id="post-link">
            <span
              className="title"
              onClick={() => history.push(`/${tag}/${title}`)}
            >
              <b>{title}</b>
            </span>
          </h4>
          <h6 className="date author">
            by Jimoh Abdul-Rahman <br />
            <span className="btn-tag">
              {' '}
              <strong>category:</strong> {tag}
            </span>
          </h6>

          <p className="trunc">{trunc}...</p>
          <ul className="post-footer">
            <li>
              <span>
                <i className="icon ion-md-chatbubbles"></i>
                {comments}
              </span>
            </li>
            <li>
              <span>
                <i className="icon ion-md-eye"></i>
                {views}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SinglePost);
