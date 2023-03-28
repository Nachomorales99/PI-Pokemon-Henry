import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination';
import Nav from '../../Components/Nav/Nav';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import {
	// get_all_pokemons,
	filters,
	setFilter,
} from '../../Redux/Actions/actions';

const Home = () => {
	//HOOKS
	let dispatch = useDispatch();
	let usePoke = useSelector((state) => state.allPokemons);
	let types2 = useSelector((state) => state.types2);
	let origin = useSelector((state) => state.origin);
	let order = useSelector((state) => state.order);

	let allTypes = useSelector((state) => state.types).filter(
		(el) => el.name !== 'unknown',
	);
	let refType = useRef(null);
	let refOrigin = useRef(null);
	let refOrder = useRef(null);

	//STATES
	let [currentPage, setCurrentPage] = useState(1);
	let [pokesPerPage] = useState(12);
	let [range, setRange] = useState({ firts: 0, last: 12 });
	let [currentPokes, setCurrentPokes] = useState(
		usePoke?.slice(range.firts, range.last),
	);
	let [charge, setCharge] = useState(true);
	let [flag, setFlag] = useState(true);
	// let [filter, setFilter] = useState({
	// 	types: 'all',
	// 	origin: 'all',
	// 	order: 'ascendent',
	// });

	//EFFECTS
	//when the component is assembled the pokemon is loaded
	useEffect(() => {
		setTimeout(() => {
			setCharge(false);
		}, 11000);
	}, []);

	useEffect(() => {
		setCurrentPokes(usePoke?.slice(range.firts, range.last));

		setRange({
			firts: (currentPage - 1) * pokesPerPage,
			last: currentPage * pokesPerPage,
		});
	}, [usePoke, range.firts, range.last, currentPage, pokesPerPage]);

	//FUNCTIONS

	let paginated = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	let handleFilter = (event) => {
		event.preventDefault();
		dispatch(filters());

		if (flag) {
			setFlag({ ...flag, flag: false });
		} else {
			setFlag({ ...flag, flag: true });
		}

		setCurrentPage(1);
		setCurrentPokes(usePoke?.slice(range.firts, range.last));
	};

	const handleFilterTypes = (event) => {
		dispatch(setFilter({ types2: event.target.value }));
	};

	const handleFilterOrigin = (event) => {
		dispatch(setFilter({ origin: event.target.value }));
	};

	const handleFilterOrder = (event) => {
		dispatch(setFilter({ order: event.target.value }));
	};

	return (
		<>
			<Nav setCurrentPage={setCurrentPage} />

			<div className="filters">
				<div className="box">
					<select
						className="selectTypes"
						value={types2}
						onChange={handleFilterTypes}
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
							handleFilterOrigin(event);
						}}
					>
						<option value="all">All Pokemons</option>
						<option value="api">Poke Api</option>
						<option value="db">My Pokemons</option>
					</select>
				</div>

				<div className="box">
					<select
						className="selectTypes"
						value={order}
						onChange={(event) => {
							handleFilterOrder(event);
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

			<button
				id="button"
				onClick={(event) => {
					handleFilter(event);
				}}
			>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				Filter
			</button>

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
