import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';


import "../styles/Details.css"

const Details = () => {
  
    var { id, resid } = useParams();

    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

    const [oferta, setOferta] = useState(null);

    useEffect( () => 
    {
        getOffer(id);

        // eslint-disable-next-line
    }, [])

    const getOffer = (requestID) => 
    {
        execute("GET", protectedResources.apiLoanComparer.endpoint + `inspect/${requestID}`)
        .then((response) => {
            console.log(response);

            setOferta(response);
        })
        .catch((e) => {
            console.log("An error occured = ", e);
        })
    }

    const approveResponse = () => 
    {   
        execute("POST", protectedResources.apiLoanComparer.endpoint + `ApproveResponse/${resid}`)
        .then( (response) => 
        {
            console.log("responese = ", response);
        })
        .catch( (e) => 
        {
            console.log("error = ", e);
        })
    }

    const refuseResponse = () => 
    {  
        execute("POST", protectedResources.apiLoanComparer.endpoint + `RefuseResponse/${resid}`)
        .then( (response) => 
        {
            console.log("responese = ", response);
        })
        .catch( (e) => 
        {
            console.log("error = ", e);
        })
    }

    //const getDetails()
    // {
        
    // }
  
    return (
        <div className="Details-island">
            <div className="Details-whole">
                <h2>Szczegóły oferty</h2>

                {
                    oferta !== null 
                        ?
                    <>
                    <table className="styled-table">
                        <tbody>
                            <tr>
                                <td>Imię</td>
                                <td>{oferta.name}</td>
                            </tr>
                            <tr>
                                <td>nazwisko</td>
                                <td>{oferta.surname}</td>
                            </tr>
                            <tr>
                                <td>e-mail</td>
                                <td>{oferta.email}</td>
                            </tr>
                            <tr>
                                <td>Numer urzędowy</td>
                                <td>{oferta.govermentId}</td>
                            </tr>
                            <tr>
                                <td>Praca</td>
                                <td>{oferta.jobType}</td>
                            </tr>
                            <tr>
                                <td>Zarobki</td>
                                <td>{oferta.incomeLevel}</td>
                            </tr>
                            <tr>
                                <td>Rozmiar kredytu</td>
                                <td>{oferta.amount}</td>
                            </tr>
                            <tr>
                                <td>Liczba rat</td>
                                <td>{oferta.numberOfInstallments}</td>
                            </tr>
                            <tr>
                                <td>Data</td>
                                <td>{oferta.date}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{oferta.status}</td>
                            </tr>
                            <tr>
                                <td>RequestID</td>
                                <td>{oferta.requestID}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <button onClick={approveResponse(id)}>Podtwierdź</button>
                    <button onClick={refuseResponse(id)}>Odrzuć</button> */}
                    </>
                        :
                    (
                        isLoading
                            ?
                        <Circles 
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="circles-loading"
                            wrapperStyle={{ margin: 25}}
                            wrapperClass=""
                            visible={true}
                        />
                            :
                        <div>Nieudałosię</div>
                    )
                }


                {
                    resid !== "null"
                        ?
                    <div className='Przyciski'>
                        <button className='Przyciski-przycisk' onClick={approveResponse}> Zaakceptuj </button>
                        <button className='Przyciski-przycisk' onClick={refuseResponse}> Odrzuć </button>
                    </div>
                        :
                    null
                }
            </div>
        </div>
    )
}

export default Details