import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoaderDos from '../../Components/Loader/LoaderDos';
import {
	get_all_types,
	create_pokemon,
	get_all_pokemons,
} from '../../Redux/Actions/actions';
import validation from './Validations/Validations';
import validationEmpty from './Validations/ValidationEmpty';
import './Form.css';
import { motion } from 'framer-motion';
import useToast from '../../utils/hooks/useToast';

const Form = () => {
	//HOOKS
	let dispatch = useDispatch();
	let allTypes = useSelector((state) => state.types).filter(
		(el) => el.name !== 'unknown',
	);
	let pokemons = useSelector((state) => state.pokemons);
	let navigate = useNavigate();

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
		name: '',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		special_attack: '',
		special_defense: '',
		image: '',
		types: [],
		abilities: ['Defensa Ferrea', 'Ataque veloz'],
	});
	let [errors, setErrors] = useState({});
	let [loading, setLoading] = useState(false);

	//EFFECTS
	useEffect(() => {
		dispatch(get_all_types());

		return () => {
			dispatch(get_all_pokemons());
		};
		// eslint-disable-next-line
	}, []);

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

	//FUNCTIONS
	let handleSubmit = (event) => {
		event.preventDefault();

		let pokeNameExist = pokemons.find(
			(el) => el.name === input.name.trim().toLocaleLowerCase(),
		);
		if (pokeNameExist) {
			return alert('There is a pokémon with that name, try another');
		}

		if (
			input.name.length &&
			input.hp.length &&
			input.attack.length &&
			input.defense.length &&
			input.height.length &&
			input.speed.length &&
			input.weight.length &&
			input.types.length &&
			input.special_attack.length &&
			input.special_defense.length &&
			input.types.length
		) {
			let pokePost = {
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

			dispatch(create_pokemon(pokePost));

			setLoading(true);

			setTimeout(() => {
				setLoading(false);
			}, 3000);

			setTimeout(() => {
				handlerNotify();
			}, 3200);

			setInput({
				name: '',
				hp: '',
				attack: '',
				defense: '',
				speed: '',
				height: '',
				weight: '',
				special_attack: '',
				special_defense: '',
				image: '',
				types: [],
				abilities: ['Defensa Ferrea', 'Ataque veloz'],
			});
		} else {
			setErrors(validationEmpty({ ...input }));
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

	const { success } = useToast();

	const handlerNotify = () => {
		success('Pokemon successfully created', { duration: 2000 });
	};

	return (
		<>
			<motion.div
				className="bg"
				variants={container}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{!loading ? (
					<motion.div
						className="login-box"
						variants={form}
						initial="hidden"
						animate="visible"
					>
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
										<span className="errorAlert">{errors.special_attack}</span>
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
										<span className="errorAlert">{errors.special_defense}</span>
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

							<div className="buttoms">
								<button id="button" type="submit">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									Create Pokemon
								</button>
								<button id="button" onClick={() => navigate('/home')}>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									Back to home
								</button>
							</div>
						</form>
					</motion.div>
				) : (
					<>
						<motion.img
							variants={updateimg}
							initial="hidden"
							animate="visible"
							className="msg"
							src="https://res.cloudinary.com/nacho-morales/image/upload/v1679952058/Pokemon%20App/Form_b0pbr2.png"
							alt=""
						/>

						<LoaderDos />
					</>
				)}
			</motion.div>
		</>
	);
};

export default Form;
