// css 
import "../styles/OfferGrid.css"
import "../styles/Pagination.css"

const OfferGrid = ({offer}) => {

	const click_AllInfo = () => 
	{
		console.log("IDE W SZCZEGÓŁY = ", offer);
		window.open(`https://dotnetfrontend-admin.azurewebsites.net/details/${offer.requestID}/${offer.responseID}`, "szczegoly", "width=800,height=600");
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