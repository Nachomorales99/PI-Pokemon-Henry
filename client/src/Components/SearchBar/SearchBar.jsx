import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../Redux/Actions/actions';
import './SearchBar.css';

const SearchBar = ({ setCurrentPage }) => {
	//HOOKS
	let dispatch = useDispatch();

	//STATES
	let [name, setName] = useState('');

	//FUNCTION

	let handleInputChange = (event) => {
		dispatch(getName(event));
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
						setName(event.target.value);
						handleInputChange(event.target.value);
					}}
					id="searchBar"
					className="searchbar"
				/>
			</div>
		</>
	);
};

export default SearchBar;
