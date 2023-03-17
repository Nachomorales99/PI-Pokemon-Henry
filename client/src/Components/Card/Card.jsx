import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
	return (
		<>
			<Link to="/detail">
				<div className="card" key={props.id}>
					<img src={props.image} alt="" />
					<p>{props.name}</p>
					<p>height={props.height}</p>
					<p>weight={props.weight}</p>
					<p>hp={props.hp}</p>
					<p>attack={props.attack}</p>
					<p>defense={props.defense}</p>
					<p>special_attack={props.special_attack}</p>
					<p>special_defense={props.special_defense}</p>
					<p>speed={props.speed}</p>
					<p>abilities={props.abilities}</p>
					<p>types={props.types}</p>
					<p>debility={props.debility}</p>
				</div>
			</Link>
		</>
	);
};

export default Card;
