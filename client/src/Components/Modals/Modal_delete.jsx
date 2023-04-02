import React from 'react';
import './Modal_delete.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	show_modal,
	delete_pokemon,
	set_Delete_Pokemon,
	maybe_eliminate,
} from '../../Redux/Actions/actions';

const ModalDelete = () => {
	let dispatch = useDispatch();
	let pokemon_delete = useSelector((state) => state.maybe_delete);

	let handleConfirm = (id) => {
		dispatch(show_modal(null));
		dispatch(set_Delete_Pokemon(pokemon_delete));
		dispatch(delete_pokemon(pokemon_delete));
		dispatch(maybe_eliminate(null));
	};

	let handleCancel = () => {
		dispatch(show_modal(null));
		dispatch(maybe_eliminate(null));
	};

	return (
		<div>
			<div className="modal-container">
				<div className="modal">
					<p>Sure you want to delete this pokemon?</p>
					<div className="modal-buttons">
						<button onClick={() => handleConfirm()}>Yes!</button>
						<button onClick={() => handleCancel()}>No!</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalDelete;
