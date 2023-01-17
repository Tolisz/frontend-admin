import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';

// css
import "../styles/HomePage.css"

const HomePage = () => {
	
    const navigate = useNavigate();

	const Inquiries = () => 
	{
		navigate("/inquiries");
	}
	
	const Request = () => 
	{
		navigate("/requests");
	}

	return (
		<>
		<UnauthenticatedTemplate>
			<div className="HomePage">
				Szanowny pracowniku, musisz być zalogowany żeby wykonywać swoją pracę
			</div>	
		</UnauthenticatedTemplate>
		<AuthenticatedTemplate> 
			<div className="HomePage">
				<div className="HomePage-elements">
					<h1> Witamy w systemie </h1>
					<h2> Poniżej możesz przejść do odpowiednich rozdziałów </h2>

					<button className="GoButton" onClick={Inquiries}>
						Przejdź do Inquiries
					</button>

					<button className="GoButton" onClick={Request}>
						Przejdź do Requests
					</button>
				</div>
			</div>	
		</AuthenticatedTemplate>
	</>
	)
}

export default HomePage