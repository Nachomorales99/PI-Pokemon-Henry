import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	delete_pokemon,
	set_Delete_Pokemon,
} from '../../Redux/Actions/actions';
import Swal from 'sweetalert2';

const Card = (props) => {
	let dispatch = useDispatch();

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

	let themeColor = TypeColor[props.types[0]];

	let appendTypes = (types) => {
		return types.map((item) => (
			<span style={{ backgroundColor: TypeColor[item] }}>
				{item.charAt(0).toUpperCase() + item.slice(1)}
			</span>
		));
	};

	let styleCard = (color) => {
		return {
			background: `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`,
		};
	};

	let handlerDelete = (id) => {
		Swal.fire({
			title: 'Sure you want to delete this pokemon?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'rgba(36, 55, 99, 1)',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(set_Delete_Pokemon(id));
				dispatch(delete_pokemon(id));
				Swal.fire('Deleted!', 'Your pokemon has been deleted.', 'success');
			}
		});
	};

	return (
		<>
			<div key={props.id} id="card" style={styleCard(themeColor)}>
				<div className="container_buttoms">
					{props.id > 1008 ? (
						<div
							className="destroy"
							onClick={() => {
								handlerDelete(props.id);
							}}
						>
							<img
								id="img_destroy"
								src="https://res.cloudinary.com/nacho-morales/image/upload/v1680451259/Pokemon%20App/trash_jg141i.png"
								alt=""
							/>
						</div>
					) : (
						<div></div>
					)}

					<p className="number">
						{props.id < 10
							? `#000${props.id}`
							: props.id < 100
							? `#00${props.id}`
							: props.id < 1000
							? `#0${props.id}`
							: `#${props.id}`}
					</p>
				</div>

				<Link to={`/detail/${props.id}`}>
					<img src={props.image} alt="Pokemon" />
				</Link>
				<h2 className="poke-name">
					{props.name.charAt(0).toUpperCase() + props.name.slice(1)}
				</h2>
				<div className="types">{appendTypes(props.types)}</div>
			</div>
		</>
	);
};

export default Card;
