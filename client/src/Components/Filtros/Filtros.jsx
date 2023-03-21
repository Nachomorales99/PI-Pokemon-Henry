import React from 'react';
import './Filtros.css';

const Filtros = () => {
	return (
		<>
			<div className="box">
				<select>
					<option selected disabled>
						Choose Region
					</option>
					<option>My Pokemons</option>
					<option>Kanto</option>
					<option>Johto</option>
					<option>Hoenn</option>
					<option>Sinnoh</option>
					<option>Tesalia/Unova</option>
					<option>Kalos</option>
					<option>Alola</option>
					<option>Galar</option>
					<option>Paldea</option>
					<option>Extras</option>
				</select>
			</div>

			<div className="box">
				<select>
					<option selected disabled>
						Choose Order
					</option>
					<option>Ascendent</option>
					<option>Descendant</option>
					<option>A - Z</option>
					<option>Z - A</option>
					<option>Increased attack</option>
					<option>Decreased attack</option>
				</select>
			</div>
		</>
	);
};

export default Filtros;
