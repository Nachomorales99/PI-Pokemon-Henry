import React from 'react';
import './Pagination.css';

const Pagination = ({ pokesPerPage, usePoke, paginated, currentPage }) => {
	let pageNumbers = [];

	for (let i = 0; i <= Math.ceil(usePoke / pokesPerPage) - 1; i++) {
		pageNumbers.push(i + 1);
	}

	return (
		<>
			<div className="pagination">
				{pageNumbers.length <= 1 ? (
					''
				) : (
					<button
						disabled={currentPage - 1 <= 0}
						className="button-prev-next"
						onClick={() => paginated(currentPage - 1)}
					>
						Prev
					</button>
				)}

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

				{pageNumbers.length <= 1 ? (
					''
				) : (
					<button
						disabled={currentPage + 1 > pageNumbers.length}
						className="button-prev-next"
						onClick={() => paginated(currentPage + 1)}
					>
						Next
					</button>
				)}
			</div>
		</>
	);
};

export default Pagination;
