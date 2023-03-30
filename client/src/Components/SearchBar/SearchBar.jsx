import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, getName } from '../../Redux/Actions/actions';
import './SearchBar.css';

const SearchBar = ({ setCurrentPage }) => {
	//HOOKS
	let dispatch = useDispatch();
	let name = useSelector((state) => state.name);

	//FUNCTION

	let handleSetName = (event) => {
		dispatch(setName({ name: event }));
	};

	let handleGetName = (event) => {
		dispatch(getName());
		setCurrentPage(1);
	};

	return (
		<>
			<div className="container">
				<input
					type="text"
					placeholder="Search..."
					value={name}
					onChange={(event) => {
						handleSetName(event.target.value);
						handleGetName();
					}}
					id="searchBar"
					className="searchbar"
				/>
			</div>
		</>
	);
};

export default SearchBar;
