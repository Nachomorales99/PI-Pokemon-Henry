import { Routes, Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './Views/index';
import Nav from './Components/Nav/Nav';

const App = () => {
	let location = useLocation();

	return (
		<>
			{location.pathname !== '/' && <Nav />}
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/create" element={<Form />} />
			</Routes>
		</>
	);
};

export default App;
