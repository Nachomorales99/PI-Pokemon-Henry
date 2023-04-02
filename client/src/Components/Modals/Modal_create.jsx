import React from 'react';
import './Modal_create.css';
import { useDispatch } from 'react-redux';
import { show_modal } from '../../Redux/Actions/actions';

const ModalCreate = () => {
	let dispatch = useDispatch();

	let handleConfirm = () => {
		dispatch(show_modal(null));
	};

	return (
		<div>
			<div className="modal-container">
				<div className="modal-create">
					<p>Pokemon successfully created</p>
					<div className="modal-buttons-create">
						<button onClick={() => handleConfirm()}>Close!</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalCreate;
