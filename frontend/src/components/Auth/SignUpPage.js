import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SignUpPage = () => {
    const navigate = useNavigate();
    const { register, registrationError, isRegistering } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [authMode, setAuthMode] = useState("signup")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await register({ username: username, email: email, password: password });
            if (result) {
                // Redirect the user to the login page or any other page
                navigate('/sign-in');
            }

        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
    React.useEffect(() => {
        if (authMode === "signin") {
            navigate('/sign-in');
        }
    }, [authMode, navigate]);

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit} disabled={isRegistering}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            className="form-control mt-1"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>

                    {isRegistering && <p>Registering...</p>}
                    {registrationError && <p>Error: {registrationError}</p>}
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;