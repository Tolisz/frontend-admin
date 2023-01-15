// react
import { useNavigate } from 'react-router-dom';

// microsoft

// my components
import LogButton from './LogButton';

// css
import "../styles/Header.css"

const Header = () => {

	const navigate = useNavigate();

    const click_HomePage = () => {
        navigate('/');
    }

    return (
        <div className='Header'>
			<div onClick={click_HomePage}>
                Kredyt.pl
            </div>
            <LogButton />
            <div>
                STRONA PRACOWNIKA
            </div>
		</div>
    )
}

export default Header