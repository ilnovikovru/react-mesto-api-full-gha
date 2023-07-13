import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    onLogin(values.email, values.password).then((data) => {
      if (data) {
        navigate('/');
      }
    });
  };

  return (
    <div className="sign__container">
      <h2 className="sign__title">Вход</h2>
      <form onSubmit={handleSubmit} id="form_login" className="sign__form" name="login">
        <input 
          id="input-email" 
          placeholder="Email" 
          className="sign__input" 
          name="email" 
          type="email" 
          required
          value={values.email}
          onChange={handleChange} 
        />
        <input 
          id="input-password" 
          placeholder="Пароль" 
          className="sign__input" 
          name="password" 
          type="password" 
          required 
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit" form="form_login" className="sign__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
