

// css 
import "../styles/OfferGrid.css"
import "../styles/Pagination.css"

const OfferGrid = ({offer}) => {

	const click_AllInfo = () => 
	{
		//window.open(`http://localhost:3000/`);
		window.open(`http://localhost:3000/details/${offer.requestID}/${offer.responseID}`, "Dupa", "width=800,height=600");
	}
	
	return (
		<>
			<div className='OfferGrid'>
				<div className='OfferGrid-element'>
					<div>Data</div>
					<div>{offer.date}</div>
				</div>
				<div className='OfferGrid-element'>
					<div> Liczba rat </div>
					<div>{offer.numberOfInstallments}</div>
				</div>
				<div>
					<div>Rozmiar kredytu</div>
					<div>{offer.amount}</div>
				</div>
				<div>
					<div>Typ pracy</div>
					<div>{offer.jobType}</div>
				</div>
				<div>
					<div>Zarobki</div>
					<div>{offer.incomeLevel}</div>
				</div>

				<button onClick={click_AllInfo} className="Batonik-szczegoly">Szczegóły</button>
			</div>
		</>
	)
}

export default OfferGrid