import { Routes, Route } from 'react-router-dom';
import { Landing, Home, Detail, Form, Error404 } from './Views/index';
import { useDispatch } from 'react-redux';
import {
	get_all_pokemons,
	get_all_types,
	filters,
} from './Redux/Actions/actions';
import { useEffect } from 'react';

const App = () => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_pokemons());
		dispatch(get_all_types());
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/create" element={<Form />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	);
};

export default App;
