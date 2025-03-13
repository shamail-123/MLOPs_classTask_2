import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';

function App() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
            {showLogin ? (
                <Login toggle={() => setShowLogin(false)} />
            ) : (
                <Signup toggle={() => setShowLogin(true)} />
            )}
        </div>
    );
}

export default App;