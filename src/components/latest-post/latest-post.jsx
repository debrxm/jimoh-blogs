import React from 'react';
import PostPreview from '../post-preview/post-preview';
import './latest-post.scss';
const LatestPost = ({ blog }) => {
  return (
    <div className="latest-post">
      <section className="blog-area section">
        <br />
        <br />
        <h2 className="heading">Latest Posts</h2>
        <div className="output">
          {blog
            .filter((item, index) => index < 9)
            .map((blog) => (
              <PostPreview key={blog.title} blog_data={blog} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default LatestPost;
