import { Routes, Route } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './Views/index';
import { useDispatch } from 'react-redux';
import { get_all_pokemons } from './Redux/Actions/actions';
import { useEffect } from 'react';

const App = () => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_pokemons());
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/create" element={<Form />} />
				<Route path="/detail/:id" element={<Detail />} />
			</Routes>
		</>
	);
};

export default App;
