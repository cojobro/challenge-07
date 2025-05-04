import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const inPost = location.pathname.includes('/posts/');
  const isEditing = location.pathname.includes('/postform');
  const postId = inPost ? Number(location.pathname.split('/').pop()) : null;
  const linkLabel = inPost ? 'Edit Post' : 'New Post';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo}>BlogApp</Link>

      {/* Desktop links */}
      <div className={styles.links}>
        <Link to="/">Home</Link>
        {!isEditing && (
          <Link
            to="/postform"
            state={inPost ? { pageID: postId } : {}}
            className={styles.actionLink}
          >
            {linkLabel}
          </Link>
        )}
      </div>

      {/* Hamburger for mobile */}
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          {!isEditing && (
            <Link
              to="/postform"
              state={inPost ? { pageID: postId } : {}}
              onClick={toggleMobileMenu}
            >
              {linkLabel}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;