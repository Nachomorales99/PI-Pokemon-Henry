import { Routes, Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './Views/index';

const App = () => {
	let location = useLocation();

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
