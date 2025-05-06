import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInput = e => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit} role="search" aria-label="Site-wide search">
        <input
            type="text"
            className={styles.searchInput}
            placeholder="Search posts..."
            value={query}
            onChange={handleInput}
            aria-label="Search posts"
        />
        <button type="submit" className={styles.searchButton} aria-label="Submit search">
            🔍
        </button>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;