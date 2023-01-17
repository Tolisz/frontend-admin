import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MsalProvider} from "@azure/msal-react";

// my components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { MainPage } from "./components/MainPage";
import Details from "./components/Details";

const Pages = () => {
	
	return (
		<div className="Pages">			
			<Header />

			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/inquiries' element={<MainPage isInquiries={true}/>} />
				<Route path='/requests' element={<MainPage isInquiries={false}/>} />
				<Route path='/details/:id/:resid' element={<Details />} />
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
