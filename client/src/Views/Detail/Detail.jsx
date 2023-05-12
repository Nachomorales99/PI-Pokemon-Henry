import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	get_pokemon_detail,
	resetState,
	show_modal,
} from '../../Redux/Actions/actions';
import './Detail.css';
import ModalUpdate from '../../Components/Modals/Modal_update';
import { motion } from 'framer-motion';

const Detail = () => {
	//HOOKS
	let { id } = useParams();
	let navigate = useNavigate();
	let dispatch = useDispatch();
	let pokemon = useSelector((state) => state.detail);
	let showModal = useSelector((state) => state.showModal);

	//EFFECTS
	useEffect(() => {
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

	const image = {
		hidden: {
			x: '100vw',
		},
		visible: {
			x: 0,
			transition: {
				type: 'spring',
				stiffness: 60,
				delay: 0.25,
			},
		},
	};

	const info = {
		hidden: {
			x: '-100vw',
		},
		visible: {
			x: 0,
			transition: {
				type: 'spring',
				stiffness: 70,
				delay: 0.5,
			},
		},
	};

	const backButton = {
		hidden: {
			scale: 0,
		},
		visible: {
			scale: 1,
			transition: {
				delay: 1,
				duration: 0.2,
			},
		},
		hover: {
			scale: 1.1,
		},
	};

	const container = {
		hidden: {
			y: '-100vh',
		},
		visible: {
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
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
				{showModal ? (
					<ModalUpdate />
				) : (
					<>
						<motion.button
							className="custom-btn btn-12"
							onClick={() => navigate('/home')}
							variants={backButton}
							initial="hidden"
							animate="visible"
							whileHover="hover"
						>
							<span>Click!</span>
							<span>Back to home?</span>
						</motion.button>
						{id > 1008 ? (
							<motion.button
								className="custom-btn btn-12"
								onClick={() => dispatch(show_modal(true))}
								variants={backButton}
								initial="hidden"
								animate="visible"
								whileHover="hover"
							>
								<span>Click!</span>
								<span>Edit Pokemon?</span>
							</motion.button>
						) : (
							''
						)}

						<motion.section
							className={`content-poke ${
								pokemon && pokemon.types && pokemon.types[0]
							}`}
							variants={container}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<motion.article
								className="box1-poke"
								variants={info}
								initial="hidden"
								animate="visible"
							>
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
											<span className="inter-medium values-rectangle letter">
												{convertHeight(pokemon.height)} m
											</span>
										</div>
									</div>
									<div>
										<h3 className="inter-bold">Weight:</h3>
										<span className="inter-medium values-rectangle letter">
											{convertWeight(pokemon.weight)} kg
										</span>
									</div>
								</div>
								<div className="group-habilities">
									<h3 className="inter-bold">Habilities:</h3>
									<div className="habilities habilities2">
										{pokemon.abilities?.map((el) => {
											return (
												<span className="inter-medium values-rectangle letter">
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
							</motion.article>
							<article className="box2-poke">
								<motion.img
									src={pokemon.image}
									alt={pokemon.name}
									variants={image}
									initial="hidden"
									animate="visible"
								/>
							</article>
						</motion.section>
					</>
				)}
			</div>
		</>
	);
};

export default Detail;
