import React from 'react';

const Form = () => {
	return (
		<>
			<form action="">
				<div>
					<label htmlFor="">Name</label>
					<input type="text" />
				</div>

				<div>
					<label htmlFor="">Attack</label>
					<input type="text" />
				</div>

				<div>
					<label htmlFor="">Defense</label>
					<input type="text" />
				</div>
			</form>
		</>
	);
};

export default Form;
