import { Routes, Route } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './Views/index';

const App = () => {
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
