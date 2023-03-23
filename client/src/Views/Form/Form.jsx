import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	get_all_types,
	create_pokemon,
	empty,
} from '../../Redux/Actions/actions';
// import { Link } from 'react-router-dom';
import validation from '../../Components/Validations/Validations';
import './Form.css';

const Form = () => {
	//HOOKS
	let dispatch = useDispatch();
	let allTypes = useSelector((state) => state.types);
	let pokemons = useSelector((state) => state.pokemons);

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
		abilities: ['Defensa Ferrea', 'Ataque veloz'],
	});
	let [errors, setErrors] = useState({});

	//EFFECTS
	useEffect(() => {
		dispatch(get_all_types());
	}, [dispatch]);

	//FUNCTIONS
	let handleSubmit = (event) => {
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
			input.special_defense.length
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

			alert('Pokemon successfully created');

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

			dispatch(empty());
		} else {
			alert('Completa todo flaco');
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

		if (input.types.length < 3) {
			setInput({
				...input,
				types: [...input.types, value],
			});

			setErrors(validation({ ...input, types: [...input.types, value] }));
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

	return (
		<>
			<div>
				<h1>Create Pokémon</h1>
			</div>

			<form onSubmit={(event) => handleSubmit(event)}>
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
					<label kvalue="types6" name="types7">
						Types:
					</label>
					<select onChange={(event) => handlerSelectTypes(event)}>
						<option selected disabled>
							Choose Types
						</option>
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
					<button
						type="submit"
						disabled={
							errors.name ||
							errors.hp ||
							errors.attack ||
							errors.defense ||
							errors.speed ||
							errors.height ||
							errors.weight ||
							errors.types ||
							!input.name
						}
					>
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
