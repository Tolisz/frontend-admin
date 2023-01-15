// react
import ReactPaginate from 'react-paginate';
//import styled from 'styled-components';

// css 
import "../styles/OffersGrid.css"
import "../styles/Pagination.css"

const OffersGrid = () => {

	const handlePageClick = (e) => 
	{
		let page = e.selected;
		console.log("page = ", e.selected);
	}
	
	return (
		<>
			    {/* <link
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
				rel="stylesheet"
				integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
				crossorigin="anonymous"
				/> */}

			<nav aria-label="Page navigation comments" className="mt-4">
				<ReactPaginate
					previousLabel="previous"
					nextLabel="next"
					breakLabel="..."
					breakClassName="page-item"
					breakLinkClassName="page-link"
					pageCount={20}
					pageRangeDisplayed={4}
					marginPagesDisplayed={2}
					onPageChange={handlePageClick}
					containerClassName="pagination justify-content-center"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					previousClassName="page-item"
					previousLinkClassName="page-link"
					nextClassName="page-item"
					nextLinkClassName="page-link"
					activeClassName="active"
					// eslint-disable-next-line no-unused-vars
					hrefBuilder={(page, pageCount, selected) =>
					page >= 1 && page <= pageCount ? `/page/${page}` : '#'
					}
					hrefAllControls
					onClick={(clickEvent) => {
					console.log('onClick', clickEvent);
					// Return false to prevent standard page change,
					// return false; // --> Will do nothing.
					// return a number to choose the next page,
					// return 4; --> Will go to page 5 (index 4)
					// return nothing (undefined) to let standard behavior take place.
					}}
				/>
			</nav>
		</>
	)
}

export default OffersGrid