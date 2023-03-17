import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Cards.css';
import { useSelector, useDispatch } from 'react-redux';

const Cards = () => {
	let allPokemons = useSelector((state) => state.allPokemons);
	let dispatch = useDispatch();

	return (
		<>
			<div class="container">
				<Card />
			</div>
		</>
	);
};

export default Cards;
