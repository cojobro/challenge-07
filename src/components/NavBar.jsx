import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from './NavBar.module.css';

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const inPost = location.pathname.includes('/posts/');
  const isEditing = location.pathname.includes('/postform');
  const postId = inPost ? Number(location.pathname.split('/').pop()) : null;
  const linkLabel = inPost ? 'Edit Post' : 'New Post';

  const handleSearch = term => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    onSearch(term);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsSearchOpen(prev => !prev);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isSearchOpen) setIsSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, isSearchOpen]);

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo}>BlogApp</Link>

      <div className={styles.navOptions}>
        <div className={styles.searchWrapper}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
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
      </div>

      <div className={styles.mobileIcons}>
        <button
          className={styles.mobileSearchIcon}
          onClick={toggleMobileSearch}
          aria-label="Open search"
        >
          🔍
        </button>
        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

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

      {isSearchOpen && (
        <div className={styles.mobileSearchOverlay}>
          <form className={styles.mobileSearchForm} onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              className={styles.mobileSearchInput}
              placeholder="Search posts..."
              autoFocus
              onChange={e => handleSearch(e.target.value)}
            />
            <button
              type="button"
              className={styles.mobileSearchCancel}
              onClick={toggleMobileSearch}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default NavBar;