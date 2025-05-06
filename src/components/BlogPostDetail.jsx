import React from 'react';
import { useState } from 'react';
import styles from './BlogPostDetail.module.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const BlogPostDetail = ({ title, content, author, date, post, posts, onComment }) => {
    if (!title || !content || !author || !date) {
        return <p>Blog post not found.</p>;
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <>
            <div className={styles.blogPostDetail}>

                <h1 className={styles.title}>{title}</h1>

                <p className={styles.author}>By {author}</p>

                <p className={styles.date}>Published on {formattedDate}</p>

                <div className={styles.content} dangerouslySetInnerHTML={{ __html:content }} />
                
            </div>

            <CommentList comments={post.comments} />
            <CommentForm onComment={onComment} post={post} posts={posts} isLoggedIn={false} />

        </>
    );
};
export default BlogPostDetail;