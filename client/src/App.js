import { Routes, Route } from 'react-router-dom';
import { Landing, Home, Detail, Form, Error404 } from './Views/index';
import { useDispatch } from 'react-redux';
import { get_all_pokemons, get_all_types } from './Redux/Actions/actions';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_pokemons());
		dispatch(get_all_types());
	}, [dispatch]);

	const container = {
		hidden: {
			y: '-100vh',
		},
		visible: {
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
		exit: {
			y: '200vh',
			transition: {
				ease: 'easeInOut',
				duration: 0.5,
			},
		},
	};

	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/home"
					element={
						<motion.div
							variants={container}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<Home />
						</motion.div>
					}
				/>
				<Route path="/create" element={<Form />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	);
};

export default App;
