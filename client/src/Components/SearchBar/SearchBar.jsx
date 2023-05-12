import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setName,
	getName,
	set_page,
	get_by_name,
} from '../../Redux/Actions/actions';
import './SearchBar.css';

const SearchBar = () => {
	//HOOKS
	let dispatch = useDispatch();
	let name = useSelector((state) => state.name);
	//FUNCTION

	let handleSetName = (event) => {
		dispatch(setName({ name: event }));
	};

	let handleGetName = () => {
		dispatch(getName());
		dispatch(set_page(1));
	};

	let handlerSearch = async () => {
		dispatch(get_by_name(name));
	};

	return (
		<>
			<div className="container">
				<input
					autoComplete="off"
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
				<button
					className="lupa"
					onClick={() => {
						handlerSearch();
					}}
				>
					🔍
				</button>
			</div>
		</>
	);
};

export default SearchBar;
