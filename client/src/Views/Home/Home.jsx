import React, { useState, useEffect } from 'react';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination';
import Nav from '../../Components/Nav/Nav';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import {
	handler_types,
	handler_origin,
	order,
	get_all_pokemons,
} from '../../Redux/Actions/actions';

const Home = () => {
	//HOOKS
	let dispatch = useDispatch();
	let usePoke = useSelector((state) => state.allPokemons);
	let allTypes = useSelector((state) => state.types).filter(
		(el) => el.name !== 'unknown',
	);

	//STATES
	let [currentPage, setCurrentPage] = useState(1);
	let [pokesPerPage] = useState(12);
	let [range, setRange] = useState({ firts: 0, last: 12 });
	let [currentPokes, setCurrentPokes] = useState(
		usePoke?.slice(range.firts, range.last),
	);
	let [types, setTypes] = useState('all');
	let [origin, setOrigin] = useState('all');
	let [sort, setSort] = useState('ascendent');
	let [charge, setCharge] = useState(true);

	//EFFECTS
	//when the component is assembled the pokemon is loaded
	useEffect(() => {
		setTimeout(() => {
			setCharge(false);
		}, 11000);
	}, []);

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

	let handlerFilterType = (event) => {
		dispatch(handler_types(event.target.value));
		setCurrentPage(1);
		setCurrentPokes(usePoke?.slice(range.firts, range.last));
		setTypes(event.target.value);
	};

	let handleOrigin = (event) => {
		setOrigin(event.target.value);
		dispatch(handler_origin(event.target.value));
		setCurrentPage(1);
		setCurrentPokes(usePoke?.slice(range.firts, range.last));
	};

	let handleOrder = (event) => {
		setSort(event.target.value);
		dispatch(order(event.target.value));
		setCurrentPage(1);
		setCurrentPokes(usePoke?.slice(range.firts, range.last));
	};

	// let reloadPokemon = () => {
	// 	setCharge(true);
	// 	setTimeout(() => {
	// 		setCharge(false);
	// 	}, 11000);
	// 	setTypes('all');
	// 	setOrigin('all');
	// 	setSort('ascendent');
	// 	dispatch(get_all_pokemons());
	// };

	return (
		<>
			<Nav setCurrentPage={setCurrentPage} />
			{/* <div>
				<button
					onClick={() => {
						reloadPokemon();
					}}
				>
					Reload Pokemons
				</button>
			</div> */}
			<div className="filters">
				<div className="box">
					<select
						className="selectTypes"
						value={types}
						onChange={(event) => {
							handlerFilterType(event);
						}}
					>
						<option value="all">All Types</option>

						{allTypes &&
							allTypes
								.sort((a, b) => (a.name > b.name ? 1 : -1))
								.map((el, index) => (
									<option
										className="optionTypeForm"
										key={index}
										value={el.name}
									>
										{el.name[0].toUpperCase() + el.name.slice(1)}
									</option>
								))}
					</select>
				</div>

				<div className="box">
					<select
						className="selectTypes"
						value={origin}
						onChange={(event) => {
							handleOrigin(event);
						}}
					>
						<option value="all">All Pokemons</option>
						<option value="db">My Pokemons</option>
					</select>
				</div>

				<div className="box">
					<select
						className="selectTypes"
						value={sort}
						onChange={(event) => {
							handleOrder(event);
						}}
					>
						<option value="ascendent">Ascendent</option>
						<option value="descendant">Descendant</option>
						<option value="a_z">A - Z</option>
						<option value="z_a">Z - A</option>
						<option value="major_attack">Increased attack</option>
						<option value="minor_attack">Decreased attack</option>
					</select>
				</div>
			</div>

			{charge && !currentPokes?.length ? (
				''
			) : (
				<Pagination
					pokesPerPage={pokesPerPage}
					usePoke={usePoke?.length}
					paginated={paginated}
					currentPage={currentPage}
				/>
			)}

			<div className="contain">
				{charge && !currentPokes?.length ? (
					<div>
						<Loader />
					</div>
				) : currentPokes.length ? (
					currentPokes.map((pokemon, index) => {
						return (
							<Card
								id={pokemon.id}
								id2={pokemon.id2}
								name={pokemon.name}
								types={pokemon.types}
								image={pokemon.image}
							/>
						);
					})
				) : (
					<div className="notfound">
						<h2 className="notfoundTitle">Ups! Pokémon not found</h2>
						<img
							src="https://res.cloudinary.com/nacho-morales/image/upload/v1679760646/Pokemon%20App/Pikachu_no_found_ofvyzw.png"
							alt=""
						/>
						<h2 className="notfoundTitle">
							Try creating it on "Create Pokemon"
						</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
