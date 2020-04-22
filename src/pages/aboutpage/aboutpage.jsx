import React from 'react';
import { Helmet } from 'react-helmet';
import './aboutpage.scss';
const Aboutpage = () => {
  return (
    <div className="aboutpage">
      <Helmet>
        <title>Jimoh's Blog &mdash; About</title>
        <meta property="og:title" content="Jimoh's Blog &mdash; About" />
        <meta property="og:type" content="website" />
        <meta name="description" content="" />
        <meta property="og:site_name" content="Jimoh's Blog" />
        <meta property="og:url" content="https://www.jimohblogs.com.ng/about" />
      </Helmet>
      <div className="left-right">
        <div className="left">
          <p>
            I'm Sandra, an award-winning book blogger and writer with a passion
            for brilliant books, independent bookstores and literary festivals.
            <br />
            <br />
            WeReadAfrican was named after the African Book Fair's inaugural Book
            Blog of the Year, and is a stylish online space for readers,writers
            and literary travellers.
            <br />
            <br />
            Here you'll find weekly book reviews, beautiful bookstores from
            around the world, literary city guides and some personal insights
            into the life of an expat, all written lovingly from my beach-side
            bedroom.
          </p>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Aboutpage;
