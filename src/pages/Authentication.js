import React, { useState } from 'react';
import styled from 'styled-components';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaShieldAlt,
  FaPrint
} from 'react-icons/fa';

const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  @media (max-width: 1023px) {
    padding: 15px;
  }
  
  @media (max-width: 767px) {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
  }
`;

const AuthCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  display: flex;
  min-height: 600px;
  
  @media (max-width: 767px) {
    flex-direction: column;
    min-height: auto;
    border-radius: 15px;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  @media (max-width: 1023px) {
    padding: 30px;
  }
  
  @media (max-width: 767px) {
    padding: 25px 20px;
    text-align: center;
  }
  
  .hero-icon {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.9;
    
    @media (max-width: 1023px) {
      font-size: 60px;
    }
    
    @media (max-width: 767px) {
      font-size: 50px;
      margin-bottom: 15px;
    }
  }
  
  .hero-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 15px;
    
    @media (max-width: 1023px) {
      font-size: 28px;
    }
    
    @media (max-width: 767px) {
      font-size: 24px;
      margin-bottom: 10px;
    }
  }
  
  .hero-subtitle {
    font-size: 16px;
    opacity: 0.9;
    line-height: 1.6;
    max-width: 300px;
    
    @media (max-width: 1023px) {
      font-size: 15px;
      max-width: 100%;
    }
    
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  
  .features {
    margin-top: 30px;
    text-align: left;
    
    @media (max-width: 767px) {
      margin-top: 20px;
      text-align: center;
    }
    
    .feature {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      font-size: 14px;
      
      @media (max-width: 767px) {
        justify-content: center;
        font-size: 13px;
        margin-bottom: 12px;
      }
      
      .feature-icon {
        color: #2ecc71;
        flex-shrink: 0;
      }
    }
  }
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 1023px) {
    padding: 30px;
  }
  
  @media (max-width: 767px) {
    padding: 25px 20px;
  }
`;

const LocalLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;

  h2 {
    margin-bottom: 4px;
    color: var(--text-primary, #2d3748);
  }

  p {
    margin-bottom: 16px;
    color: var(--text-secondary, #718096);
    font-size: 0.9rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #4a5568;
    }

    input {
      padding: 10px 14px;
      border: 1px solid #cbd5e0;
      border-radius: 8px;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #667eea;
      }
    }
  }

  .btn-submit {
    margin-top: 8px;
    padding: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.95;
    }
  }

  .btn-demo {
    padding: 10px;
    background: #edf2f7;
    color: #4a5568;
    border: 1px solid #cbd5e0;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #e2e8f0;
    }
  }

  .error-msg {
    color: #e53e3e;
    font-size: 0.85rem;
  }
`;

const Authentication = () => {
  const isClerkConfigured = Boolean(process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    try {
      await login('admin', 'admin123');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Demo login failed');
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <LeftPanel>
          <FaShieldAlt className="hero-icon" />
          <h1 className="hero-title">Secure Print Link</h1>
          <p className="hero-subtitle">
            Protect your confidential documents with secure printing technology
          </p>
          
          <div className="features">
            <div className="feature">
              <FaShieldAlt className="feature-icon" />
              <span>Document encryption and secure transmission</span>
            </div>
            <div className="feature">
              <FaPrint className="feature-icon" />
              <span>Hold-and-release printing system</span>
            </div>
            
            <div className="feature">
              <FaUser className="feature-icon" />
              <span>User tracking and audit trails</span>
            </div>
          </div>
        </LeftPanel>

        <RightPanel>
          {isClerkConfigured ? (
            <>
              <SignedOut>
                <div style={{ maxWidth: 420, width: '100%' }}>
                  <SignIn />
                </div>
              </SignedOut>
              <SignedIn>
                <div style={{ color: '#667eea', fontWeight: 600 }}>
                  Redirecting to your dashboard…
                </div>
              </SignedIn>
            </>
          ) : (
            <LocalLoginForm onSubmit={handleLocalSubmit}>
              <h2>Sign In</h2>
              <p>Enter your credentials to access Secure Print Link</p>
              
              {error && <div className="error-msg">{error}</div>}

              <div className="input-group">
                <label>Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="admin, user1, or user2"
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="admin123 or user123"
                  required
                />
              </div>

              <button type="submit" className="btn-submit">Sign In</button>
              <button type="button" onClick={handleDemoLogin} className="btn-demo">
                ⚡ Quick Demo Login (Admin)
              </button>
            </LocalLoginForm>
          )}
        </RightPanel>
      </AuthCard>
    </AuthContainer>
  );
};

export default Authentication;
