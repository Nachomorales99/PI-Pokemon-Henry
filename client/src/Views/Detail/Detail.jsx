import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_pokemon_detail, resetState } from '../../Redux/Actions/actions';
import Loader from '../../Components/Loader/Loader';
import './Detail.css';

const Detail = () => {
	//HOOKS
	let { id } = useParams();
	let navigate = useNavigate();
	let dispatch = useDispatch();
	let pokemon = useSelector((state) => state.detail);

	//STATE
	let [loading, setLoading] = useState(false);

	//EFFECTS
	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 500);

		dispatch(get_pokemon_detail(id));
		return () => {
			dispatch(resetState());
		};
	}, [dispatch, id]);

	//FUNCTIONS
	const capitalizeFirstLetter = (name) => {
		return name?.charAt(0).toUpperCase() + name?.slice(1);
	};

	const convertWeight = (weight) => {
		return (weight * 0.1).toFixed(2);
	};

	const convertHeight = (height) => {
		return (height * 0.1).toFixed(2);
	};

	const colorChange = (valor) => {
		if (valor <= 49) return 'red';

		if (valor <= 79) return 'yellow';

		return 'green';
	};

	//COLORS
	const TypeColor = {
		bug: '#26de81',
		dragon: '#30385c',
		electric: '#fed330',
		fairy: '#FF0069',
		fighting: '#b54',
		fire: '#f0932b',
		flying: '#2eb3b3',
		grass: '#00b894',
		ground: '#EFB549',
		ghost: '#a55eea',
		ice: '#74b9ff',
		normal: '#95afc0',
		poison: '#6c5ce7',
		psychic: '#a29bfe',
		rock: '#2d3436',
		water: '#0190FF',
		steel: '#c5c3c2',
		dark: '#383838',
		shadow: '#6d6565',
	};

	const appendTypes = (types) => {
		return types?.map((item) => (
			<span
				className="inter-medium values-rectangle"
				style={{ backgroundColor: TypeColor[item] }}
			>
				{capitalizeFirstLetter(item)}
			</span>
		));
	};

	const appendDebilities = (debility) => {
		if (pokemon.types?.includes('shadow')) {
			return (
				<span
					className="inter-medium values-rectangle"
					style={{ backgroundColor: TypeColor.shadow }}
				>
					No posee debiliades
				</span>
			);
		}

		let newDebility = Array.from(new Set(debility));

		newDebility = newDebility.filter((el) => !pokemon.types?.includes(el));

		return newDebility?.map((item) => (
			<span
				className="inter-medium values-rectangle"
				style={{ backgroundColor: TypeColor[item] }}
			>
				{capitalizeFirstLetter(item)}
			</span>
		));
	};

	return (
		<>
			<div className="bs">
				{!loading ? (
					<>
						<button class="custom-btn btn-12" onClick={() => navigate('/home')}>
							<span>Click!</span>
							<span>¿Back to home?</span>
						</button>
						<section className="content-poke">
							<article className="box1-poke">
								<div className="poke-name">
									<h1 className="inter-bold name-poke">
										{capitalizeFirstLetter(pokemon.name)}
									</h1>
								</div>
								<div className="group-habilities">
									<h3 className="inter-bold">Types:</h3>
									<div className="habilities">
										{appendTypes(pokemon?.types)}
									</div>
								</div>
								<div className="physical">
									<div>
										<h3 className="inter-bold">Height:</h3>
										<div>
											<span className="inter-medium values-rectangle">
												{convertHeight(pokemon.height)}m
											</span>
										</div>
									</div>
									<div>
										<h3 className="inter-bold">Weight:</h3>
										<span className="inter-medium values-rectangle">
											{convertWeight(pokemon.weight)} kg
										</span>
									</div>
								</div>
								<div className="group-habilities">
									<h3 className="inter-bold">Habilities:</h3>
									<div className="habilities">
										{pokemon.abilities?.map((el) => {
											return (
												<span className="inter-medium values-rectangle">
													{capitalizeFirstLetter(el)}
												</span>
											);
										})}
									</div>
								</div>
								<div className="group-habilities">
									<h3 className="inter-bold">Debilities:</h3>
									<div className="habilities debility">
										{appendDebilities(pokemon?.debility)}
									</div>
								</div>

								<div>
									<h3 className="inter-bold">Stats:</h3>
									<div className="first-row-stats">
										<div className="power">
											<span
												className={`inter-medium values-round ${colorChange(
													pokemon.hp,
												)}`}
											>
												{pokemon.hp}
											</span>
											<h4 className="inter-bold">HP</h4>
										</div>
										<div className="power">
											<span
												className={`inter-medium values-round ${colorChange(
													pokemon.attack,
												)}`}
											>
												{pokemon.attack}
											</span>
											<h4 className="inter-bold">Attack</h4>
										</div>
										<div className="power">
											<span
												className={`inter-medium values-round ${colorChange(
													pokemon.defense,
												)}`}
											>
												{pokemon.defense}
											</span>
											<h4 className="inter-bold">Defense</h4>
										</div>
									</div>
									<div className="second-row-stats">
										<div className="power">
											<span
												className={`inter-medium values-round ${colorChange(
													pokemon.special_attack,
												)}`}
											>
												{pokemon.special_attack}
											</span>
											<h4 className="inter-bold">Special Attack</h4>
										</div>
										<div className="power">
											<span
												className={`inter-medium values-round ${colorChange(
													pokemon.special_defense,
												)}`}
											>
												{pokemon.special_defense}
											</span>
											<h4 className="inter-bold">Special Defense</h4>
										</div>
										<div className="power">
											<span
												className={`inter-medium values-round ${colorChange(
													pokemon.speed,
												)}`}
											>
												{pokemon.speed}
											</span>
											<h4 className="inter-bold">Speed</h4>
										</div>
									</div>
								</div>
							</article>
							<article className="box2-poke">
								<img src={pokemon.image} alt={pokemon.name} />
							</article>
						</section>{' '}
					</>
				) : (
					<div className="loader">
						<Loader />
					</div>
				)}
			</div>
		</>
	);
};

export default Detail;
