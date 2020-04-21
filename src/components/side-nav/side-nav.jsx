import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import './side-nav.scss';
const SideNav = ({ currentUser, handleToggleSidebar, history, match }) => {
  const [isShow, setisShow] = useState(false);
  const handleToggleShow = () => {
    setisShow(!isShow);
  };
  return (
    <div className="side-nav">
      <div className="links">
        <Link to="/" className="option" onClick={handleToggleSidebar}>
          HOME
        </Link>
        <div className="drop">
          <div className="controller" onClick={handleToggleShow}>
            <h5 className="opton">CATEGORIES</h5>
            <span className="tog">
              {isShow ? <span> &#8722; </span> : <span> &#43; </span>}
            </span>
          </div>
          {isShow ? (
            <div className="drop-links" onClick={handleToggleSidebar}>
              <h4
                className="drop-link"
                onClick={() => history.push(`/blog/anime`)}
              >
                ANIME
              </h4>
              <h4
                className="drop-link"
                onClick={() => history.push(`/blog/design`)}
              >
                DESIGN
              </h4>
              <h4
                className="drop-link"
                onClick={() => history.push(`/blog/health`)}
              >
                HEALTH
              </h4>
              <h4
                className="drop-link"
                onClick={() => history.push(`/blog/music`)}
              >
                MUSIC
              </h4>
              <h4
                className="drop-link"
                onClick={() => history.push(`/blog/sport`)}
              >
                SPORT
              </h4>
              <h4
                className="drop-link"
                onClick={() => history.push(`/blog/travel`)}
              >
                TRAVEL
              </h4>
            </div>
          ) : null}
        </div>
        <Link to="/about" className="option" onClick={handleToggleSidebar}>
          ABOUT
        </Link>
        <Link to="/contact" className="option" onClick={handleToggleSidebar}>
          CONTACT
        </Link>
      </div>
    </div>
  );
};
export default withRouter(SideNav);
