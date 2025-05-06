import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CommentForm.module.css';

const CommentForm = ({ onComment, post, posts, isLoggedIn, userName }) => {
  const [name, setName] = useState(userName || '');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim() || (!isLoggedIn && !name.trim())) {
      setError('Please fill out all fields.');
      return;
    }
    const comment = { name: name || 'Anonymous', text, date: new Date().toISOString() };
    onComment(post, posts, comment);
    setText('');
    if (!isLoggedIn) setName('');
    setError('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!isLoggedIn && (
        <label>
          Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
      )}
      <label>
        Comment
        <textarea value={text} onChange={e => setText(e.target.value)} />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Post Comment</button>
    </form>
  );
};

CommentForm.propTypes = {
  onComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  userName: PropTypes.string
};

export default CommentForm;