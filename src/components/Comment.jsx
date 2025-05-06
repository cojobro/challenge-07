import React from 'react';
import PropTypes from 'prop-types';
import styles from './Comment.module.css';

const formatDate = dateStr => {
  const d = new Date(dateStr);
  return d.toLocaleString('default', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

const Comment = ({ name, date, text, avatar }) => (
  <div className={styles.comment}>
    {avatar && <img src={avatar} alt={`${name}'s avatar`} className={styles.avatar} />}
    <div className={styles.body}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>{formatDate(date)}</span>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  </div>
);

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatar: PropTypes.string
};

export default Comment;