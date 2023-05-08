import React from 'react';
import './Pagination.css';

const Pagination = ({ pokesPerPage, usePoke, paginated, currentPage }) => {
	let pageNumbers = [];
	let arrayPages;
	let numNeighbors = 2;
	let totalPage = Math.ceil(usePoke / pokesPerPage) - 1;

	for (let i = 0; i <= totalPage; i++) {
		pageNumbers.push(i + 1);
	}

	if (totalPage <= 8) {
		arrayPages = pageNumbers;
	} else {
		if (numNeighbors + 2 >= currentPage) {
			arrayPages = [
				...pageNumbers.slice(undefined, currentPage + numNeighbors),
				'...',
				pageNumbers.length,
			];
		} else if (currentPage > totalPage - (numNeighbors + 2)) {
			arrayPages = [
				1,
				'...',
				...pageNumbers.slice(currentPage - numNeighbors - 1, undefined),
			];
		} else {
			arrayPages = [
				1,
				'...',
				...pageNumbers.slice(
					currentPage - numNeighbors - 1,
					currentPage + numNeighbors,
				),
				'...',
				pageNumbers.length,
			];
		}
	}

	return (
		<>
			<div className="pagination">
				{arrayPages.length <= 1 ? (
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
					{arrayPages &&
						arrayPages.map((number) =>
							number === '...' ? (
								<span style={{ fontSize: '20px', color: 'blue' }}>...</span>
							) : (
								<li
									className={currentPage === number ? 'active' : ''}
									key={number}
									onClick={() => paginated(number)}
								>
									<p>{number}</p>
								</li>
							),
						)}
				</ul>

				{arrayPages.length <= 1 ? (
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
