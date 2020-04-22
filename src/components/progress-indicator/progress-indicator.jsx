import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: 0,
      // isSmallScreen: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollProgress);
    // window.innerWidth <= 500
    //   ? this.setState({ isSmallScreen: true })
    //   : this.setState({ isSmallScreen: false });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollProgress);
  }

  scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
    this.setState({
      scrolled: scrolled,
    });
  };

  render() {
    const progressContainerStyle = {
      background: 'transparent',
      height: '5px',
      position: 'fixed',
      top: '80px',
      width: '100vw',
      left: '0px',
      right: '0px',
      zIndex: 1,
    };

    const progressBarStyle = {
      height: '5px',
      background: '#46322e',
      width: this.state.scrolled,
    };

    return (
      <div>
        <div className="progress-container" style={progressContainerStyle}>
          <div className="progress-bar" style={progressBarStyle} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(ProgressIndicator);
