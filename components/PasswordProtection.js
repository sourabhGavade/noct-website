import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export default function PasswordProtection({ onSubmit, onClose, isLoading = false, error = null }) {
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <PasswordModal show={showModal}>
      <PasswordModalBG onClick={handleClose} />
      <PasswordModalInner show={showModal}>
        <div className="close-icon" onClick={handleClose}>
          <MdClose size="24" color="#1A1A1A" />
        </div>
        
        <div className="content">
          <h3 className="mb-4">This project is password protected</h3>
          <p className="mb-4">Please enter the password to view this project:</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="password-input"
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            {error && (
              <div className="error-message mb-3">
                <p>{error}</p>
              </div>
            )}
            
            <div className="buttons">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? 'Verifying...' : 'Access Project'}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </PasswordModalInner>
    </PasswordModal>
  );
}

const PasswordModal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  z-index: 999;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const PasswordModalBG = styled.div`
  z-index: 1;
  position: absolute;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
`;

const PasswordModalInner = styled.div`
  z-index: 2;
  position: relative;
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  margin: 20px;
  scale: ${props => props.show ? 1 : 0.9};
  transition: scale 0.15s ease 0.05s;

  .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 3;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  .content {
    text-align: center;

    h3 {
      font-weight: 600;
      color: #1A1A1A;
      margin-bottom: 16px;
    }

    p {
      color: #666;
      font-size: 16px;
      line-height: 1.5;
    }
  }

  .form-group {
    margin-bottom: 24px;
  }

  .password-input {
    width: 100%;
    height: 50px;
    padding: 0 16px;
    border: 2px solid #E5E5E5;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s ease;
    background: #fff;

    &:focus {
      outline: none;
      border-color: #1A1A1A;
    }

    &:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #999;
    }
  }

  .error-message {
    background: #FEF2F2;
    border: 1px solid #FECACA;
    border-radius: 6px;
    padding: 12px 16px;
    text-align: center;

    p {
      color: #DC2626;
      font-size: 14px;
      margin: 0;
    }
  }

  .buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .submit-btn,
  .cancel-btn {
    height: 48px;
    padding: 0 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    min-width: 120px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .submit-btn {
    background: #1A1A1A;
    color: #fff;

    &:hover:not(:disabled) {
      background: #333;
    }
  }

  .cancel-btn {
    background: transparent;
    color: #666;
    border: 1px solid #E5E5E5;

    &:hover:not(:disabled) {
      background: #f5f5f5;
      color: #1A1A1A;
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 20px;

    .buttons {
      flex-direction: column;
    }

    .submit-btn,
    .cancel-btn {
      width: 100%;
    }
  }
`;
