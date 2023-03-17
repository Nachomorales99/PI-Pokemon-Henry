import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<>
			<div className="landing">
				<div className="welcome">
					<img
						src="https://res.cloudinary.com/nacho-morales/image/upload/v1678917765/Pokemon%20App/Welcome_sn8fnh.png"
						alt="welcome"
					/>
				</div>

				<div className="gif">
					<img
						src="https://res.cloudinary.com/nacho-morales/image/upload/v1678934021/Pokemon%20App/Pikachu_gif_fnaqp7.gif"
						alt="gif_bulbasaur"
					/>
				</div>
				<Link to="/home">
					<button className="start">
						<img
							src="https://res.cloudinary.com/nacho-morales/image/upload/v1678917989/Pokemon%20App/Start_qh1faz.png"
							alt="start"
						/>
					</button>
				</Link>

				<div className="img_landing">
					<img
						src="https://res.cloudinary.com/nacho-morales/image/upload/v1678918881/Pokemon%20App/Landing_page_xdagen.png"
						alt="pokemons"
					/>
				</div>
			</div>
		</>
	);
};

export default Landing;
