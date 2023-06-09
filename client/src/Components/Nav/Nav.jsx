import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

import SearchBar from '../SearchBar/SearchBar';

const Nav = () => {
	return (
		<>
			<nav className="navbar">
				<div className="links">
					<NavLink className="route" to="/">
						Exit
					</NavLink>
				</div>
				<div>
					<div className="nav-title">
						<NavLink to="/home">
							<img
								src="https://res.cloudinary.com/nacho-morales/image/upload/v1679763018/Pokemon%20App/Icon_yzrpe5.png"
								alt=""
							/>
						</NavLink>
					</div>
				</div>

				<SearchBar />

				<div className="links">
					<NavLink className="route" to="/create">
						Create Pokemon
					</NavLink>
				</div>
			</nav>
		</>
	);
};

export default Nav;
