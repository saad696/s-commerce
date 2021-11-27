import Login from './components/Login';
import 'antd/dist/antd.css';
import 'tachyons';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { ProductList } from './components';

function App() {
    const [loggedinORloggedout, setloggedinORloggedout] = useState(false);
    const [reRedner, setReRender] = useState()
    let navigate = useNavigate();

    const renderLogin = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        console.log(isLoggedIn);
        if (isLoggedIn === 'false') {
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        renderLogin();
        setReRender(Math.random())
    }, [loggedinORloggedout]);

    return (
        <div key={reRedner}>
            <Routes>
                <Route
                    path='/login'
                    element={
                        <Login
                            setloggedinORloggedout={setloggedinORloggedout}
                        />
                    }
                />
                <Route
                    path='/'
                    element={
                        <ProductList
                            setloggedinORloggedout={setloggedinORloggedout}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
