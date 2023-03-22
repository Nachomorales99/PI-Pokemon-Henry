import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	get_all_types,
	create_pokemon,
	get_all_pokemons,
	resetState,
} from '../../Redux/Actions/actions';
// import { Link } from 'react-router-dom';
import { validation } from '../../Components/Validations/Validations';
import './Form.css';

const Form = () => {
	//HOOKS
	let dispatch = useDispatch();
	let allTypes = useSelector((state) => state.types);
	let pokemons = useSelector((state) => state.pokemons); //Llamar al cache

	//STATES
	// let [response, setResponse] = useState(null);
	// let [loading, setLoading] = useState(false);
	// let [err, setErr] = useState(false);
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
		abilities: [],
	});
	let [errors, setErrors] = useState({});

	//EFFECTS
	useEffect(() => {
		dispatch(get_all_types());
		dispatch(resetState(resetState));
		dispatch(get_all_pokemons());
	}, [dispatch]);

	//FUNCTIONS
	function handleSubmit(event) {
		event.preventDefault();

		let pokeNameExist = pokemons.find((el) => el.name === input.name);
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
			input.abilities.length
		) {
			let pokePost = {
				name: input.name,
				attack: input.attack,
				hp: input.hp,
				defense: input.defense,
				speed: input.speed,
				height: input.height,
				weight: input.weight,
				special_attack: input.special_attack,
				special_defense: input.special_defense,
				image: input.image ? input.image : '',
				types: input.types,
				abilities: input.abilities,
			};

			dispatch(create_pokemon(pokePost));

			// setResponse(true);

			// setTimeout(() => setResponse(false), 4000);

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
				abilities: [],
			});
		} else if (
			!input.name.length &&
			!input.hp.length &&
			!input.attack.length &&
			!input.defense.length &&
			!input.height.length &&
			!input.speed.length &&
			!input.weight.length &&
			!input.types.length &&
			!input.special_attack.length &&
			!input.special_defense.length &&
			!input.abilities.length
		) {
			// setErr(true);
			// setTimeout(() => setErr(false), 4000);
		}
	}

	function handlerChange(event) {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});

		setErrors(
			validation({ ...input, [event.target.name]: event.target.value }),
		);
	}

	function handlerSelectTypes(event) {
		let { value } = event.target;

		if (input.types.includes(value)) {
			return alert("You've already selected that type");
		}

		if (input.types.length < 2) {
			setInput({
				...input,
				types: [...input.types, value],
			});

			setErrors(
				validation({
					...input,
				}),
			);
		} else alert("You've reached the max amount of types");
	}

	function handlerDelete(event) {
		event.preventDefault();
		setInput({
			...input,
			types: input.types.filter((type) => type !== event.target.value),
		});
	}

	return (
		<>
			<div>
				<h1>Create Pokémon</h1>
			</div>

			<form onSubmit={resetState}>
				<div>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						placeholder="Pokemon name"
						value={input.name}
						onChange={(event) => handlerChange(event)}
					/>

					<strong>{errors.name}</strong>
				</div>

				<div>
					<label>Attack</label>
					<input
						type="number"
						name="attack"
						placeholder="Attack level"
						value={input.attack}
						onChange={(event) => handlerChange(event)}
					/>

					<strong>{errors.attack}</strong>
				</div>

				<div>
					<label>Defense</label>
					<input
						type="number"
						name="defense"
						placeholder="Defense level"
						value={input.defense}
						onChange={(event) => handlerChange(event)}
					/>

					<strong>{errors.defense}</strong>
				</div>

				<div>
					<label>Speed</label>
					<input
						type="number"
						name="speed"
						placeholder="Speed level"
						value={input.speed}
						onChange={(event) => handlerChange(event)}
					/>
					<strong>{errors.speed}</strong>
				</div>

				<div>
					<label>Height</label>
					<input
						type="number"
						name="height"
						placeholder="Height"
						value={input.height}
						onChange={(event) => handlerChange(event)}
					/>
					<strong>{errors.height}</strong>
				</div>

				<div>
					<label>Weight</label>
					<input
						type="number"
						name="weight"
						placeholder="Weight"
						value={input.weight}
						onChange={(event) => handlerChange(event)}
					/>
					<strong>{errors.weight}</strong>
				</div>

				<div>
					<label>Special Attack</label>
					<input
						type="number"
						name="special_attack"
						placeholder="Special attack level"
						value={input.special_attack}
						onChange={(event) => handlerChange(event)}
					/>
					<strong>{errors.special_attack}</strong>
				</div>

				<div>
					<label>Special Defense</label>
					<input
						type="number"
						name="special_defense"
						placeholder="Special Defense level"
						value={input.special_defense}
						onChange={(event) => handlerChange(event)}
					/>
					<strong>{errors.special_defense}</strong>
				</div>

				<div>
					<label>HP</label>
					<input
						type="number"
						name="hp"
						placeholder="HP Level"
						value={input.hp}
						onChange={(event) => handlerChange(event)}
					/>
					<strong>{errors.hp}</strong>
				</div>

				<div>
					<label>Image</label>
					<input
						name="image"
						placeholder="Url"
						value={input.image}
						onChange={(event) => handlerChange(event)}
					/>
				</div>

				<div>
					<label>Abilities</label>
					<input type="text" />
				</div>

				<div>
					<label kvalue="types6" name="types7">
						Types:
					</label>
					<select onChange={(event) => handlerSelectTypes(event)}>
						{allTypes &&
							allTypes
								.sort((a, b) => (a.name > b.name ? 1 : -1))
								.map((el, index) => (
									<option key={index} value={el.name}>
										{el.name.toUpperCase()}
									</option>
								))}
					</select>

					<div>
						{!input.types.length ? (
							<strong>{errors.types}</strong>
						) : (
							input.types.map((value, index) => {
								return (
									<div key={index}>
										<button onClick={handlerDelete} value={value}>
											X
										</button>
										<span>{value.toUpperCase()}</span>
									</div>
								);
							})
						)}
					</div>
				</div>

				<div>
					<button type="submit" onClick={(event) => handleSubmit(event)}>
						Create Pokémon
					</button>
				</div>
			</form>
		</>
	);
};

export default Form;

{
	/* <div className="overlay">
	<form>
		<div className="con">
			<header className="head-form">
				<h2>Log In</h2>

				<p>login here using your username and password</p>
			</header>

			<br />
			<div className="field-set">
				<span className="input-item">
					<i className="fa fa-user-circle" />
				</span>

				<input
					className="form-input"
					id="txt-input"
					type="text"
					placeholder="@UserName"
					required
				/>
				<br />

				<span className="input-item">
					<i className="fa fa-key" />
				</span>

				<input
					className="form-input"
					type="password"
					placeholder="Password"
					id="pwd"
					name="password"
					required
				/>

				<span>
					<i className="fa fa-eye" aria-hidden="true" type="button" id="eye" />
				</span>
				<br />

				<button className="log-in"> Log In </button>
			</div>

			<div className="other">
				<button className="btn submits frgt-pass">Forgot Password</button>

				<button className="btn submits sign-up">
					Sign Up
					<i className="fa fa-user-plus" aria-hidden="true" />
				</button>
			</div>
		</div>
	</form>
</div>; */
}
