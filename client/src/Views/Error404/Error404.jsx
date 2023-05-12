import React from 'react';
import './Error404.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Error404 = () => {
	let navigate = useNavigate();

	return (
		<>
			<div className="wrapper">
				<motion.p
					initial={{ y: -1000 }}
					animate={{ y: 0, transition: { duration: 0.8, ease: 'linear' } }}
				>
					You seem to be lost on your pokemon journey.
					<br />
					Press the pokedex button to return to Kanto region.
				</motion.p>

				<motion.span
					initial={{ y: -1000 }}
					animate={{ y: 0, transition: { duration: 0.4, ease: 'linear' } }}
				>
					44
				</motion.span>
				<motion.button
					type="button"
					onClick={() => navigate('/home')}
					initial={{ x: -1000 }}
					animate={{ x: 0, transition: { duration: 1, ease: 'linear' } }}
				>
					Go to Kanto region
				</motion.button>
			</div>
		</>
	);
};

export default Error404;
