import React, { useEffect } from 'react';
import { useParams /*useNavigate*/ } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_pokemon_detail, resetState } from '../../Redux/Actions/actions';
import './Detail.css';

const Detail = () => {
	//HOOKS
	let { id } = useParams();
	// let navigate = useNavigate();
	let dispatch = useDispatch();
	let pokemon = useSelector((state) => state.detail);

	//EFFECTS
	useEffect(() => {
		dispatch(get_pokemon_detail(id));
		return () => {
			dispatch(resetState());
		};
	}, [dispatch, id]);

	console.log(pokemon);

	//FUNCTIONS
	const capitalizeFirstLetter = (name) => {
		// converting first letter to uppercase
		return name?.charAt(0).toUpperCase() + name?.slice(1);
	};

	const convertWeight = (weight) => {
		/* 
            hg * (1.0kg/10.0hg) 
            hg*0.1
        */
		return (weight * 0.1).toFixed(2);
	};

	const convertHeight = (height) => {
		/* 
            dm * (0.1m/1dg)
            dm*0.1
        */
		return (height * 0.1).toFixed(2);
	};

	const colorChange = (valor) => {
		if (valor <= 49) return 'red';

		if (valor <= 79) return 'yellow';

		return 'green';
	};

	return (
		<>
			<section className="content-poke">
				<article className="box1-poke">
					<div className="poke-name">
						<h1 className="inter-bold name-poke">
							{capitalizeFirstLetter(pokemon.name)}
						</h1>
						{pokemon.types?.map((el) => {
							return (
								<span className="inter-medium values-rectangle">
									{capitalizeFirstLetter(el)}
								</span>
							);
						})}
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
							{pokemon.types?.map((el) => {
								return (
									<span className="inter-medium values-rectangle">
										{capitalizeFirstLetter(el)}
									</span>
								);
							})}
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
			</section>
		</>
	);
};

export default Detail;
