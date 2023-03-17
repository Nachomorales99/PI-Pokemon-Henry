import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</>
	);
};

export default App;
