import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
	const TypeColor = {
		bug: '#26de81',
		dragon: '#ffeaa7',
		electric: '#fed330',
		fairy: '#FF0069',
		fighting: '#30336b',
		fire: '#f0932b',
		flying: '#81ecec',
		grass: '#00b894',
		ground: '#EFB549',
		ghost: '#a55eea',
		ice: '#74b9ff',
		normal: '#95afc0',
		poison: '#6c5ce7',
		psychic: '#a29bfe',
		rock: '#2d3436',
		water: '#0190FF',
	};

	let themeColor = TypeColor[props.types[0]];

	const appendTypes = (types) => {
		return types.map((item) => (
			<span style={{ backgroundColor: TypeColor[item] }}>
				{item.charAt(0).toUpperCase() + item.slice(1)}
			</span>
		));
	};

	const styleCard = (color) => {
		return {
			background: `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`,
		};
	};

	return (
		<>
			<Link to={`/detail/${props.id}`}>
				<div id="card" style={styleCard(themeColor)}>
					<p className="number">
						{props.id < 10
							? `#000${props.id}`
							: props.id < 100
							? `#00${props.id}`
							: props.id < 1000
							? `#0${props.id}`
							: `#${props.id}`}
					</p>
					<img src={props.image} alt="Pokemon" />
					<h2 className="poke-name">
						{props.name.charAt(0).toUpperCase() + props.name.slice(1)}
					</h2>
					<div className="types">{appendTypes(props.types)}</div>
				</div>
			</Link>
		</>
	);
};

export default Card;
