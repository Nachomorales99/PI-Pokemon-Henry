import React from 'react';
import './Pagination.css';

const Pagination = ({ pokesPerPage, usePoke, paginated, currentPage }) => {
	let pageNumbers = [];

	for (let i = 0; i <= Math.ceil(usePoke / pokesPerPage) - 1; i++) {
		pageNumbers.push(i + 1);
	}

	return (
		<>
			<ul className="paginated">
				{pageNumbers &&
					pageNumbers.map((number) => (
						<li
							className={currentPage === number ? 'active' : ''}
							key={number}
							onClick={() => paginated(number)}
						>
							<p>{number}</p>
						</li>
					))}
			</ul>
		</>
	);
};

export default Pagination;
