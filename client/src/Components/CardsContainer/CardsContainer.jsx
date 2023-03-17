import React from 'react';
import './CardsContainer.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

const CardsContainer = () => {
	let pokemons = useSelector((state) => state.allPokemons);

	return (
		<>
			<div className="contain">
				{pokemons.map((pokemon) => {
					return (
						<Card
							id={pokemon.id}
							name={pokemon.name}
							height={pokemon.height}
							weight={pokemon.weight}
							hp={pokemon.hp}
							attack={pokemon.attack}
							defense={pokemon.defense}
							special_attack={pokemon.special_attack}
							special_defense={pokemon.special_defense}
							image={pokemon.image}
							speed={pokemon.speed}
							abilities={pokemon.abilities}
							types={pokemon.types}
							debility={pokemon.debility}
						/>
					);
				})}
			</div>
		</>
	);
};

export default CardsContainer;
