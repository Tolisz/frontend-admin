import React, { useEffect, useState } from 'react'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';


// myComponents
import SortingOption from './SortingOption';

// css 
import "../styles/MainPage.css"

export const MainPage = ( { isInquiries} ) => {
	
    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });
	
	const [sortingParametrs, setSortingParametrs] = useState([]);
	const [states, setStates] = useState([]);

	useEffect(() => 
	{
		getSortingParametrs();
		getStates();
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

	const SubmitParametrs = async () =>
	{
		console.log("Dupa");	
	}

	return (
		<div className='MainPage-island'>
			<div className='MainPage-whole'>				
				<div className='MainPage-sortParametrs'>
					<div className='MainPage-sortParametrs-element'>
						<label> Parametr sortowania </label>
						<select>
							{ sortingParametrs ? sortingParametrs.map( (param, index) => 
							(	
								<SortingOption key={index} value={param} text={param} />
							)) : null}
						</select>
					</div>

					<div className='MainPage-sortParametrs-element'>
						<label>State</label>
						<select>
							{ states ? states.map( (param, index) => 
							(
								<SortingOption key={index} value={param} text={param} />
							) ) : null}
						</select>
					</div>
					
					<div className='MainPage-sortParametrs-element'>
						<label>minAmount</label>
						<input />
					</div>
					<div className='MainPage-sortParametrs-element'>
						<label>maxAmount</label>
						<input />
					</div>
					<div className='MainPage-sortParametrs-element'>
						<label>minRate</label>
						<input />
					</div>
					<div className='MainPage-sortParametrs-element'>
						<label>maxRate</label>
						<input />
					</div>
					<div className='MainPage-sortParametrs-element'>
						<label>minIncomeLevel</label>
						<input />
					</div>
					<div className='MainPage-sortParametrs-element'>
						<label>maxIncomeLevel</label>
						<input />
					</div>
					<div className='MainPage-sortParametrs-element'>
						<label>PageSize</label>
						<input />
					</div>
					<button onClick={SubmitParametrs}>Zastosuj</button>
				</div>
					
			</div>
			<div className='MainPage-whole-offers'>
				Tu będą wyświetlane oferty 
			</div>
		</div>
	)
}
