// microsoft
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import { loginRequest } from "../authConfig";

// microsoft

// my components

// css 
import "../styles/LogButton.css"

const LogButton = () => {
    
    const { instance } = useMsal();
    
    const click_LogOut = () => {
        instance.logoutRedirect({ postLogoutRedirectUri: "/" })
    }

    const useClick_LogIn = () => {
        instance.loginRedirect(loginRequest)
    }

    return (
    <>
        <AuthenticatedTemplate>
            <button className="LogButton" onClick={click_LogOut}>
                Wylogój
            </button>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
            <button className="LogButton">
                <div onClick={useClick_LogIn}> Zaloguj się </div>
            </button>
        </UnauthenticatedTemplate>
    </>
    )
}

export default LogButton