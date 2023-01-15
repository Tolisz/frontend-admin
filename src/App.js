import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider} from "@azure/msal-react";
import { useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import { protectedResources } from "./authConfig";
import { loginRequest } from "./authConfig";

// my components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { MainPage } from "./components/MainPage";

const Pages = () => {
	
	return (
		<div className="Pages">			
			<Header />

			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/inquiries' element={<MainPage isInquiries={true}/>} />
				<Route path='/requests' element={<MainPage isInquiries={false}/>} />
			</Routes>
		</div>
	);
}

const App = ({ instance }) => 
{

	return (
		<MsalProvider instance={instance}>
			<BrowserRouter>
				<Pages/>
			</BrowserRouter>
		</MsalProvider>
	);
}

export default App;
