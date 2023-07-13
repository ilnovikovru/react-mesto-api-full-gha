import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Register({ onRegister }) {
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onRegister(values.email, values.password);
  };

  return (
    <>
      <div className="sign__container">
        <h2 className="sign__title">Регистрация</h2>
        <form id="form_login" className="sign__form" name="login" onSubmit={handleSubmit}>
          <input 
            id="input-email" 
            placeholder="Email" 
            className="sign__input" 
            name="email" 
            type="email" 
            value={values.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            id="input-password" 
            placeholder="Пароль" 
            className="sign__input" 
            name="password" 
            type="password" 
            value={values.password} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" form="form_login" className="sign__button">Зарегистрироваться</button>
          <Link to="/sign-in" className="sign__caption">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </>
  );
}

export default Register;