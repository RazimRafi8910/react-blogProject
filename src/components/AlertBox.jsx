import React,{useState} from 'react'
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function AlertBox({ errorMessage }) {
    const theme = useSelector(state => state.themeReducer.theme);
    const [show, setShow] = useState(true);
    return (
        <>
            <div className="container">
            <Alert data-bs-theme={theme} variant="danger" onClose={() => setShow(false)} dismissible>
                    {errorMessage}  
            </Alert>
        </div>
        </>
    )
}

export default AlertBox;