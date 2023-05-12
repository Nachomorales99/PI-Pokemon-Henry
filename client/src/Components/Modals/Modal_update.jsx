import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Modal_update.css';
import {
	update_pokemon,
	show_modal,
	get_new_detail,
	new_pokemon_detail,
	get_all_pokemons,
} from '../../Redux/Actions/actions';
import validation from '../../Views/Form/Validations/Validations';
import validationEmpty from '../../Views/Form/Validations/ValidationEmpty';
import LoaderDos from '../../Components/Loader/LoaderDos';
import { motion } from 'framer-motion';
import useToast from '../../utils/hooks/useToast';

const ModalUpdate = () => {
	//HOOKS
	let dispatch = useDispatch();
	let allTypes = useSelector((state) => state.types).filter(
		(el) => el.name !== 'unknown',
	);
	let pokemons = useSelector((state) => state.pokemons);
	let pokemonDetail = useSelector((state) => state.detail);

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

	//STATES
	let [input, setInput] = useState({
		id: pokemonDetail.id,
		name: pokemonDetail.name,
		hp: pokemonDetail.hp,
		attack: pokemonDetail.attack,
		defense: pokemonDetail.defense,
		speed: pokemonDetail.speed,
		height: pokemonDetail.height,
		weight: pokemonDetail.weight,
		special_attack: pokemonDetail.special_attack,
		special_defense: pokemonDetail.special_defense,
		image: pokemonDetail.image,
		types: pokemonDetail.types,
		abilities: ['Defensa Ferrea', 'Ataque veloz'],
	});
	let [errors, setErrors] = useState({});
	let [loading, setLoading] = useState(false);
	//FUNCTIONS
	let handleSubmit = (event) => {
		event.preventDefault();

		let pokeNameExist = pokemons.find(
			(el) => el.name === input.name.trim().toLocaleLowerCase(),
		);
		if (pokeNameExist && input.name !== pokemonDetail.name) {
			return alert('There is a pokémon with that name, try another');
		}

		if (
			input.name &&
			input.hp &&
			input.attack &&
			input.defense &&
			input.height &&
			input.speed &&
			input.weight &&
			input.types &&
			input.special_attack &&
			input.special_defense &&
			(input.name !== pokemonDetail.name ||
				Number(input.hp) !== pokemonDetail.hp ||
				Number(input.attack) !== pokemonDetail.attack ||
				Number(input.defense) !== pokemonDetail.defense ||
				Number(input.height) !== pokemonDetail.height ||
				Number(input.speed) !== pokemonDetail.speed ||
				Number(input.weight) !== pokemonDetail.weight ||
				input.types !== pokemonDetail.types ||
				Number(input.special_attack) !== pokemonDetail.special_attack ||
				Number(input.special_defense) !== pokemonDetail.special_defense)
		) {
			let update = {
				id: input.id,
				name: input.name.toLowerCase(),
				attack: Number(input.attack),
				hp: Number(input.hp),
				defense: Number(input.defense),
				speed: Number(input.speed),
				height: Number(input.height),
				weight: Number(input.weight),
				special_attack: Number(input.special_attack),
				special_defense: Number(input.special_defense),
				image: input.image ? input.image : '',
				types: input.types,
				abilities: input.abilities,
			};
			dispatch(update_pokemon(update));
			dispatch(get_all_pokemons());

			setTimeout(() => {
				dispatch(get_new_detail(input.id));
			}, 1000);

			setTimeout(() => {
				dispatch(new_pokemon_detail());
			}, 2000);

			setLoading(true);

			setTimeout(() => {
				setLoading(false);
			}, 3000);

			setTimeout(() => {
				dispatch(show_modal(null));
				handlerSuccess();
			}, 3000);
		} else if (
			!input.name ||
			!input.hp ||
			!input.attack ||
			!input.defense ||
			!input.height ||
			!input.speed ||
			!input.weight ||
			!input.types ||
			!input.special_attack ||
			!input.special_defense
		) {
			setErrors(validationEmpty({ ...input }));
		} else {
			handlerError();
		}
	};

	let handlerChange = (event) => {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});

		setErrors(
			validation({ ...input, [event.target.name]: event.target.value }),
		);
	};

	let handlerSelectTypes = (event) => {
		let { value } = event.target;

		if (input.types.includes(value)) {
			return alert("You've already selected that type");
		}

		if (input.types.length < 2) {
			setInput({
				...input,
				types: [...input.types, value],
			});
		} else alert("You've reached the max amount of types");
	};

	let handlerDelete = (event) => {
		event.preventDefault();
		setInput({
			...input,
			types: input.types.filter((type) => type !== event.target.value),
		});

		setErrors(validation({ ...input, types: [...input.types] }));
	};

	let handleCancel = () => {
		dispatch(show_modal(null));
		handlerCancel();
	};

	const { success, error } = useToast();

	const handlerSuccess = () => {
		success('Pokemon successfully updated', { duration: 2000 });
	};

	const handlerError = () => {
		error('No data has been modified!', { duration: 2000 });
	};

	const handlerCancel = () => {
		error('Update cancelled', { duration: 2000 });
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
		exit: {
			y: '200vh',
			transition: {
				ease: 'easeInOut',
				duration: 0.5,
			},
		},
	};

	const form = {
		hidden: {
			x: '-100vw',
		},
		visible: {
			x: 0,
			transition: {
				type: 'spring',
				stiffness: 70,
				delay: 0.4,
			},
		},
	};

	const updateimg = {
		hidden: {
			y: '-100vh',
		},
		visible: {
			y: -200,
			x: 50,
			transition: {
				type: 'spring',
				stiffness: 70,
				delay: 0.3,
			},
		},
	};

	return (
		<>
			{!loading ? (
				<motion.div
					className="modal-container-update"
					variants={container}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<motion.div
						className="modal-update"
						variants={form}
						initial="hidden"
						animate="visible"
					>
						<div className="login-box">
							<h2>Pokemon Lab</h2>
							<form onSubmit={(event) => handleSubmit(event)}>
								<div className="principalcolum">
									<div className="colum1">
										<div className="input-box">
											<input
												autoComplete="off"
												type="text"
												name="name"
												placeholder="Pokemon name"
												value={input.name}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Name</label>
											<span className="errorAlert">{errors.name}</span>
										</div>
										<div className="input-box">
											<input
												type="number"
												name="attack"
												placeholder="Attack level"
												value={input.attack}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Attack</label>
											<span className="errorAlert">{errors.attack}</span>
										</div>
										<div className="input-box">
											<input
												type="number"
												name="defense"
												placeholder="Defense level"
												value={input.defense}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Defense</label>
											<span className="errorAlert">{errors.defense}</span>
										</div>
										<div className="input-box">
											<input
												type="number"
												name="speed"
												placeholder="Speed level"
												value={input.speed}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Speed</label>
											<span className="errorAlert">{errors.speed}</span>
										</div>
										<div className="input-box">
											<input
												type="number"
												name="height"
												placeholder="Height"
												value={input.height}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Height</label>
											<span className="errorAlert">{errors.height}</span>
										</div>
									</div>

									<div className="colum2">
										<div className="input-box">
											<input
												type="number"
												name="weight"
												placeholder="Weight"
												value={input.weight}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Weight</label>
											<span className="errorAlert">{errors.weight}</span>
										</div>
										<div className="input-box">
											<input
												type="number"
												name="special_attack"
												placeholder="Special attack level"
												value={input.special_attack}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Special Attacks</label>
											<span className="errorAlert">
												{errors.special_attack}
											</span>
										</div>
										<div className="input-box">
											<input
												type="number"
												name="special_defense"
												placeholder="Special Defense level"
												value={input.special_defense}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Special Defense</label>
											<span className="errorAlert">
												{errors.special_defense}
											</span>
										</div>
										<div className="input-box">
											<input
												type="number"
												name="hp"
												placeholder="HP Level"
												value={input.hp}
												onChange={(event) => handlerChange(event)}
											/>
											<label>HP</label>
											<span className="errorAlert">{errors.hp}</span>
										</div>
										<div className="input-box">
											<input
												autoComplete="off"
												name="image"
												placeholder="Url"
												value={input.image}
												onChange={(event) => handlerChange(event)}
											/>
											<label>Image</label>
											<span className="errorAlert">{errors.image}</span>
										</div>
									</div>
								</div>

								<div className="selectType">
									<label kvalue="types6" name="types7">
										Types
									</label>
									<select
										className="selectTypeForm"
										value={allTypes}
										onChange={(event) => handlerSelectTypes(event)}
									>
										<option className="optionTypeForm" value="">
											Choose Types
										</option>
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

									<div className="choosetypes">
										{!input.types.length ? (
											<span className="errorAlert">{errors.types}</span>
										) : (
											input.types.map((value, index) => {
												if (value === 'dark') {
													return (
														<div key={index} className="type">
															<button
																className="delete"
																onClick={handlerDelete}
																value={value}
																style={{
																	backgroundColor: TypeColor[value],
																	color: 'white',
																}}
															>
																X
															</button>
															<span
																className="textType"
																style={{
																	backgroundColor: TypeColor[value],
																	color: 'white',
																}}
															>
																{value[0].toUpperCase() + value.slice(1)}
															</span>
														</div>
													);
												}
												return (
													<div key={index} className="type">
														<button
															className="delete"
															onClick={handlerDelete}
															value={value}
															style={{
																backgroundColor: TypeColor[value],
															}}
														>
															X
														</button>
														<span
															className="textType"
															style={{
																backgroundColor: TypeColor[value],
															}}
														>
															{value[0].toUpperCase() + value.slice(1)}
														</span>
													</div>
												);
											})
										)}
									</div>
								</div>
								<div className="modal-buttons-update">
									<button type="submit">Confirm!</button>
									<button onClick={() => handleCancel()}>Cancel!</button>
								</div>
							</form>
						</div>
					</motion.div>
				</motion.div>
			) : (
				<div className="modal-container-update">
					<motion.div variants={updateimg} initial="hidden" animate="visible">
						<img
							className="msg"
							src="https://res.cloudinary.com/nacho-morales/image/upload/v1680535628/update_pokemon_fhr9do.png"
							alt=""
						/>
					</motion.div>
					<LoaderDos />
				</div>
			)}
		</>
	);
};

export default ModalUpdate;
