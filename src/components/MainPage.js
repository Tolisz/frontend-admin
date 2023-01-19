import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';


// myComponents
import SortingOption from './SortingOption';
import FormInput from './FormInput';

// css 
import "../styles/MainPage.css"
import OfferGrid from './OfferGrid';


export const MainPage = ( { isInquiries} ) => {
	
    const { execute } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });
	
	const [sortingParametrs, setSortingParametrs] = useState([]);
	const [states, setStates] = useState([]);

	useEffect(() => 
	{
		getSortingParametrs();
		getStates();
		
		// eslint-disable-next-line
	}, [])

	const getSortingParametrs = async () => 
	{
		execute("GET", protectedResources.apiLoanComparer.endpoint + '/api/ResponsesManagment/GetSortingParameters')
		.then( (response) => 
		{
			setSortingParametrs(response);
		})
		.catch ( (e) => 
		{
			console.log("getSortingParametrs", e);
		})
	}

	const getStates = async () => 
	{
		execute("GET", protectedResources.apiLoanComparer.endpoint + '/api/ResponsesManagment/GetResponsesStates')
		.then( (response) => 
		{
			setStates(response);
		})
		.catch ( (e) => 
		{
			console.log("getStates", e);
		})
	}

	const [offers, setOffers] = useState(null);
	const [pageValue, setPageValue] = useState(null);

	const getAnotherPage = (GetPage) => {

		let path = constructPath(GetPage);

		execute("GET", path)
		.then( (response) => 
		{
			setOffers(response);
			console.log("DUPA = ", response);
		})
		.catch( (e) => 
		{
			console.log("Mamy błąd: ", e);
		})
	}

	const constructPath = (struct) =>
	{
		let path = protectedResources.apiLoanComparer.endpoint + "api/ResponsesManagment/" + (isInquiries ? "GetInquiries?" : "GetRequests?");
		path += struct.State === "" ? "" : `State=${struct.State}&`;
		path += isNaN(struct.minAmount) ? "" : `minAmount=${struct.minAmount}&`;
		path += isNaN(struct.maxAmount) ? "" : `maxAmount=${struct.maxAmount}&`;
		path += isNaN(struct.minRate) ? "" : `minRate=${struct.minRate}&`;
		path += isNaN(struct.maxRate) ? "" : `maxRate=${struct.maxRate}&`;
		path += isNaN(struct.minIncomeLevel) ? "" : `minRate=${struct.minIncomeLevel}&`;
		path += isNaN(struct.maxIncomeLevel) ? "" : `maxRate=${struct.maxIncomeLevel}&`;
		path += struct.Sorting === "" ? "" : `Sorting=${struct.Sorting}&`;
		path += isNaN(struct.PageSize) ? "" : `PageSize=${struct.PageSize}&`;
		path += isNaN(struct.PageNumber) ? "" : `PageNumber=${struct.PageNumber}&`;

		return path;
	}

	const SubmitParametrs = (e) =>
	{
		e.preventDefault();

		let path = constructPath(values);

		execute("GET", path)
		.then( (response) => 
		{
			console.log(response);

			setOffers(response);
			setPageValue(values);
		})
		.catch ( (e) => 
		{
			console.log("getStates", e);
		})

		//https://bank-project-backend-dev.azurewebsites.net/api/ResponsesManagment/GetInquiries?State=Pending&minAmount=0&maxAmount=10000&minRate=0&maxRate=10000&minIncomeLevel=0&maxIncomeLevel=10000&Sorting=DateDesc&PageNumber=1&PageSize=10'

		console.log("path =", path);
	}

	const [values, setValues] = useState({
		State: "",
		minAmount: NaN,
		maxAmount: NaN,
		minRate: NaN,
		maxRate: NaN,
		minIncomeLevel: NaN,
		maxIncomeLevel: NaN,
		Sorting: "",
		PageNumber: 1,
		PageSize: NaN,
	})

	const inputs = [
		{
			id: 1,
			name: "minAmount",
			type: "number",
			label: "minAmount",
			placeholder: "minAmount",
		},
		{
			id: 2,
			name: "maxAmount",
			type: "number",
			label: "maxAmount",
			placeholder: "maxAmount",
		},
		{
			id: 3,
			name: "minRate",
			type: "number",
			label: "minRate",
			placeholder: "minRate",
		}, 
		{
			id: 4,
			name: "maxRate",
			type: "number",
			label: "maxRate",
			placeholder: "maxRate",
		},
		{
			id: 5,
			name: "minIncomeLevel",
			type: "number",
			label: "minIncomeLevel",
			placeholder: "minIncomeLevel",
		},
		{
			id: 6,
			name: "maxIncomeLevel",
			type: "number",
			label: "maxIncomeLevel",
			placeholder: "maxIncomeLevel",
		},
		{
			id: 7,
			name: "PageSize",
			type: "number",
			label: "PageSize",
			placeholder: "PageSize",
		},
	]


	const onChange = (e) => {
		
		switch(e.target.name)
		{
			case "State":
			case "Sorting":
				setValues({...values, [e.target.name]: e.target.value});
				break;
			default:
				setValues({...values, [e.target.name]: parseFloat(e.target.value, 10)});
		}
	}	

	const handlePageClick = (e) => 
	{
		if (pageValue === null)
		{
			return;
		}
		
		let page = e.selected + 1;
		let GetPage = {...pageValue, PageNumber: page}; 
		
		getAnotherPage(GetPage);
	}

	return (
		<div className='MainPage-island'>
			<div className='MainPage-whole'>

				<h1> Parametry sortowania </h1>	

				<form className='MainPage-form'>
					<div className='FormInput'>
						<label className='FormInput-label'> Parametr sortowania </label>
						<select className='FormInput-input' name="Sorting" onChange={onChange}>
							<SortingOption value={""} test={"nieustawione"}/>
							{ sortingParametrs ? sortingParametrs.map( (param, index) => 
							(	
								<SortingOption key={index} value={param} text={param} />
							)) : null}
						</select>
					</div>

					<div className='FormInput'>
						<label className='FormInput-label'>State</label>
						<select className='FormInput-input' name="State" onChange={onChange}>
							<SortingOption value={""} test={"nieustawione"}/>
							{ states ? states.map( (param, index) => 
							(
								<SortingOption key={index} value={param} text={param} />
							) ) : null}
						</select>
					</div>

					{inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                    ))}

					<button onClick={SubmitParametrs} className='SubmitButton'>Zastosuj</button>
				
				</form>			

			</div>
			<div className='MainPage-whole-offers'>
				
				{
					offers === null
						?
					"Nacisnij \"Zastosuj\" żeby pobrać oferty według parametrów sortowania"
						:
					<>
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

						<div className='MainPage-whole-offers-island'>
							{
								offers.map((offer, index) => 
								(
									<OfferGrid key={index} offer={offer} />
								))
							}
						</div>
					</>
				}
				
				{/* <OffersGrid offers={offers}/> */}
			</div>
		</div>
	)
}
