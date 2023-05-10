import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
	return (
		<>
			<div className="landing">
				<motion.div
					className="welcome"
					initial={{ y: -1000 }}
					animate={{ y: 0, transition: { duration: 0.9, ease: 'linear' } }}
				>
					<img
						src="https://res.cloudinary.com/nacho-morales/image/upload/v1678917765/Pokemon%20App/Welcome_sn8fnh.png"
						alt="welcome"
					/>
				</motion.div>

				<motion.div
					className="gif"
					initial={{ x: -1000 }}
					animate={{ x: 0, transition: { duration: 0.6, ease: 'linear' } }}
				>
					<img
						src="https://res.cloudinary.com/nacho-morales/image/upload/v1678934021/Pokemon%20App/Pikachu_gif_fnaqp7.gif"
						alt="gif_bulbasaur"
					/>
				</motion.div>

				<Link to="/home">
					<motion.button
						className="start"
						initial={{ y: -1000 }}
						animate={{ y: 0, transition: { duration: 0.3, ease: 'linear' } }}
					>
						<img
							src="https://res.cloudinary.com/nacho-morales/image/upload/v1678917989/Pokemon%20App/Start_qh1faz.png"
							alt="start"
						/>
					</motion.button>
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
