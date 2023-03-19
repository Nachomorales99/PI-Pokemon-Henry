import React, { useState, useEffect } from 'react';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination';
import Card from '../../Components/Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_pokemons } from '../../Redux/Actions/actions';

const Home = () => {
	//HOOKS
	let dispatch = useDispatch();
	let usePoke = useSelector((state) => state.allPokemons);

	//STATES
	let [currentPage, setCurrentPage] = useState(1);
	let [pokesPerPage] = useState(12);
	let [range, setRange] = useState({ firts: 0, last: 12 });
	let [currentPokes, setCurrentPokes] = useState(
		usePoke?.slice(range.firts, range.last),
	);

	//EFFECTS
	//when the component is assembled the pokemon is loaded
	useEffect(() => {
		dispatch(get_all_pokemons());
	}, [dispatch]);

	useEffect(() => {
		setCurrentPokes(usePoke?.slice(range.firts, range.last));
	}, [usePoke, range.firts, range.last]);

	useEffect(() => {
		setRange({
			firts: (currentPage - 1) * pokesPerPage,
			last: currentPage * pokesPerPage,
		});
	}, [currentPage, pokesPerPage]);

	//FUNCTIONS

	let paginated = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="home">
				<Pagination
					pokesPerPage={pokesPerPage}
					usePoke={usePoke?.length}
					paginated={paginated}
					currentPage={currentPage}
				/>
				<div className="contain">
					{currentPokes.map((pokemon) => {
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
			</div>
		</>
	);
};

export default Home;
