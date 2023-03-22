import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_all_pokemons, getName } from '../../Redux/Actions/actions';
import './SearchBar.css';

const SearchBar = ({ setCurrentPage }) => {
	//HOOKS
	let dispatch = useDispatch();

	//STATES
	let [name, setName] = useState('');

	//EFFECTS

	useEffect(() => {
		dispatch(get_all_pokemons());
	}, [dispatch]);

	//FUNCTION

	let handleInputChange = (event) => {
		dispatch(getName(event));
		setCurrentPage(1);
	};

	return (
		<>
			<div>
				<input
					type="text"
					placeholder="Search name"
					value={name}
					onChange={(event) => {
						setName(event.target.value);
						handleInputChange(event.target.value);
					}}
				></input>
				<button type="button">Search</button>
			</div>
		</>
	);
};

export default SearchBar;
