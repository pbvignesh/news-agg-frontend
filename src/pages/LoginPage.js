import Alert from '../components/common/Alert';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import useAlert from '../hooks/useAlert';

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, showAlert] = useAlert();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      if (isAuthenticated) {
        navigate('/');
      }
    } catch (error) {
      showAlert('Error logging in : ' + error.response.data.message, 'danger');
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="container my-5">
      <Alert message={alert.message} type={alert.type} show={alert.show} onClose={() => showAlert('', '')} />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <img src="logo.png" height={100} width={100} alt="NewsFeed Logo"></img>
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="text-center">
            <div className="d-inline-flex align-items-center">
              <button className="btn btn-primary me-4" onClick={handleLogin}>
                Login
              </button>
              <button className="btn btn-outline-primary" onClick={navigateToSignup}>
                Signup
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
