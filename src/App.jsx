// src/App.jsx
import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';
import Layout from './components/Layout';
import { samplePosts } from './mockData';
import './App.css';

const PostDetailPlaceholder = (posts) => {
  const postId = window.location.pathname.split('/').pop();
  let post = null;
  let found = false;
  for (let i = 0; i < posts.posts.length; i++) {
    if (posts.posts[i].id == postId) {
        post = posts.posts[i];
        found = true;
        console.log("post was found!")
    }
  }
  if (!found) {
    console.warn(`Post with ID: ${postId} not found`)
    return;
  }
  return (
    <BlogPostDetail
      title={post.title}
      content={post.content}
      author={post.author}
      date={post.date}
    />
  );
};

const PostFormPlaceholder = ({posts, onSubmit, onDelete}) => {
  const { state } = useLocation();
  const pageID = state?.pageID;              // undefined if you came from “New Post”
  const post   = pageID
    ? posts.find(post => post.id == pageID)
    : null;

  console.log('editing post #', pageID);

  return (
    <BlogPostForm
      post={post} posts={posts} onSubmit={onSubmit} onDelete={onDelete}
    />
  );
};

const updatePosts = (newPost, allPosts) => {
  //check if post was in the list and then update the list
  let found = false;
  for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].id == newPost.id) {
          allPosts[i] = newPost;
          found = true;
      }
  }
  if (!found) {
    newPost.id = Number(allPosts.at(-1).id) + 1;
    newPost.url = `/posts/${newPost.id}`;
    allPosts.push(newPost);
  }
  return allPosts;
}

const deletePost = (postID, allPosts) => {
  //check if postID was in the list and then delete the post
  let found = false;
  let indexToRemove = null;
  for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].id == postID) {
          indexToRemove = i;
          found = true;
      }
  }
  if (indexToRemove || indexToRemove == 0) {
    allPosts.splice(indexToRemove, 1);
  }
  if (!found) {
    console.warn("No post found to remove with provided ID")
  }
  return allPosts;
}

// We need our hooks to live _inside_ the Router context,
// so we wrap the inner UI in its own component.
function AppRoutes() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([...samplePosts]);

  const handleUpdate = (post, posts) => {
    console.log(posts);
    setPosts(updatePosts(post, posts));
    console.log(posts);
    navigate('/');
  };

  const handleDelete = (postID, posts) => {
    console.log(posts);
    setPosts(deletePost(postID, posts));
    console.log(posts);
    navigate('/');
  };


  return (
    <Layout>
      <h1 className="title">Conor&apos;s Epic Blog</h1>

      <Routes>
        <Route path="/" element={<BlogPostList posts={posts} />} />
        <Route path="/posts/:postId" element={<PostDetailPlaceholder posts={posts}/>} />
        <Route path="/postform" element={<PostFormPlaceholder posts={posts} onSubmit={handleUpdate} onDelete={handleDelete}/>} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}
