import React, { useState, useEffect } from 'react';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination';
import Nav from '../../Components/Nav/Nav';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import {
	filters,
	setFilter,
	ordered,
	set_page,
} from '../../Redux/Actions/actions';
import { motion } from 'framer-motion';

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
	let currentPage = useSelector((state) => state.currentPage);

	//STATES
	let [pokesPerPage] = useState(12);
	let [range, setRange] = useState({ firts: 0, last: 12 });
	let [currentPokes, setCurrentPokes] = useState(
		usePoke?.slice(range.firts, range.last),
	);
	let [charge, setCharge] = useState(true);
	let [flag, setFlag] = useState(false);

	//EFFECT

	useEffect(() => {
		setTimeout(() => {
			setCharge(false);
		}, 3000);

		setCurrentPokes(usePoke?.slice(range.firts, range.last));

		setRange({
			firts: (currentPage - 1) * pokesPerPage,
			last: currentPage * pokesPerPage,
		});

		// eslint-disable-next-line
	}, [usePoke, range.firts, range.last, currentPage]);

	//FUNCTIONS

	let paginated = (pageNumber) => {
		dispatch(set_page(pageNumber));
	};

	let handleFilter = () => {
		setFlag(true);

		setTimeout(() => {
			setFlag(false);
		}, 1000);

		dispatch(filters());
		dispatch(ordered());

		dispatch(set_page(1));

		setCurrentPokes(usePoke?.slice(range.firts, range.last));
	};

	let handlerOrder = () => {
		setFlag(true);

		setTimeout(() => {
			setFlag(false);
		}, 1000);

		dispatch(ordered());

		dispatch(set_page(1));

		setCurrentPokes(usePoke?.slice(range.firts, range.last));
	};

	let handleFilterTypes = (event) => {
		dispatch(setFilter({ types2: event.target.value }));
	};

	let handleFilterOrigin = (event) => {
		dispatch(setFilter({ origin: event.target.value }));
	};

	let handleFilterOrder = (event) => {
		dispatch(setFilter({ order: event.target.value }));
	};

	const panel = {
		hidden: {
			y: '-50vh',
		},
		visible: {
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.div variants={panel} initial="hidden" animate="visible">
			<Nav />
			<div className="header">
				<div className="containButton">
					<button
						className="button"
						onClick={(event) => {
							handleFilter(event);
						}}
					>
						Apply Filter
					</button>

					<button
						className="button"
						onClick={(event) => {
							handlerOrder(event);
						}}
					>
						Apply Order
					</button>
				</div>

				<div className="filters">
					<div className="box">
						<select
							className="selectTypes"
							value={types2}
							onChange={(event) => {
								handleFilterTypes(event);
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
								handleFilterOrigin(event);
							}}
						>
							<option value="all">All Regions</option>
							<option value="kanto">Kanto</option>
							<option value="johto">Johto</option>
							<option value="hoenn">Hoenn</option>
							<option value="sinnoh">Sinnoh</option>
							<option value="tesalia">Tesalia</option>
							<option value="kalos">Kalos</option>
							<option value="alola">Alola</option>
							<option value="galar">Galar</option>
							<option value="paldea">Paldea</option>
							<option value="database">My Pokemons</option>
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
			</div>
			{(charge && !usePoke.length) || flag ? (
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
				{(charge && !usePoke.length) || flag ? (
					<div>
						<Loader />
					</div>
				) : currentPokes.length ? (
					currentPokes.map((pokemon) => {
						return (
							<Card
								id={pokemon.id}
								name={pokemon.name}
								types={pokemon.types}
								image={pokemon.image}
							/>
						);
					})
				) : (
					<div className="notfound">
						<h2 className="notfoundTitle">Ups! Pokémon not found here</h2>
						<img
							src="https://res.cloudinary.com/nacho-morales/image/upload/v1679760646/Pokemon%20App/Pikachu_no_found_ofvyzw.png"
							alt=""
						/>
						<h2 className="notfoundTitle">Try clicking the searchbar</h2>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Home;
