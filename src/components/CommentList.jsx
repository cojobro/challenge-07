import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => (
  <div className={styles.list} aria-live="polite">
    {comments.length > 0 ? (
      comments.map((c, i) => <Comment key={i} {...c} />)
    ) : (
      <p className={styles.empty}>No comments yet. Be the first to comment!</p>
    )}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentList;