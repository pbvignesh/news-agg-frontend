import Alert from '../components/common/Alert';
import { AuthContext } from '../AuthContext';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';

const SignupPage = () => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, showAlert] = useAlert();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  }

  const handleSignup = async () => {
    try {
      await signup(username, email, password);
      navigate('/');
    } catch (error) {
      showAlert('Error in creating account: ' + error.response.data.message, 'danger');
    }
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
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
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
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="text-center">
          <button className="btn btn-primary me-4" onClick={navigateToLogin}>
              Login Page
            </button>
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup and Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
