import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
	return (
		<>
			<div>
				<input type="search" placeholder="Search name"></input>
				<button type="button">Search</button>
			</div>
		</>
	);
};

export default SearchBar;
