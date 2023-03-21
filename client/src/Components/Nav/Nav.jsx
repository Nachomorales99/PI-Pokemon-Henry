import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

import SearchBar from '../SearchBar/SearchBar';

const Nav = () => {
	return (
		<>
			<nav className="navbar">
				<div>
					<div className="nav-title">
						<NavLink to="/home">
							<img
								src="https://res.cloudinary.com/nacho-morales/image/upload/v1678940016/Pokemon%20App/65b08dfbffa956edd0a3649c89881012_g3ztnx.png"
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
