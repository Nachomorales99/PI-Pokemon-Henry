import React from 'react';
import './Home.css';
import Nav from '../Nav/Nav';
import Pagination from '../Pagination/Pagination';
import Cards from '../Cards/Cards';

const Home = () => {
	return (
		<>
			<Nav />
			<Pagination />
			<Cards />
		</>
	);
};

export default Home;
