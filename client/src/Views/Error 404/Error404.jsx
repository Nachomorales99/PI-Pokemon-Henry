import React from 'react';
import './Error404.css';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
	let navigate = useNavigate();

	return (
		<>
			<div className="wrapper">
				<p>
					You seem to be lost on the pokemon trail.
					<br />
					Press the pokedex button to return to the Kanto region.
				</p>
				<span>44</span>

				<button type="button" onClick={() => navigate('/home')}>
					Go to Kanto region
				</button>
			</div>
		</>
	);
};

export default Error404;
