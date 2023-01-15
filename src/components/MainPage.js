import React, { useEffect, useState } from 'react'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';


// myComponents
import SortingOption from './SortingOption';
import FormInput from './FormInput';

// css 
import "../styles/MainPage.css"
import OffersGrid from './OffersGrid';

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

	const [offers, setOffers] = useState([]);

	const getOffers = async () => 
	{
		
	}

	const SubmitParametrs = async () =>
	{
		
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
		PageNumber: NaN,
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
	
	console.log(values);
	


	
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
				<OffersGrid />
			</div>
		</div>
	)
}
