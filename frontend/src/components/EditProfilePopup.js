import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        value={name || ''}
        onChange={handleNameChange}
        className="popup__input-text popup__input-text_type_name"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="input-name-error" className="popup__input-error"></span>
      <input
        id="input-caption"
        value={description || ''}
        onChange={handleDescriptionChange}
        className="popup__input-text popup__input-text_type_caption"
        name="about"
        type="text"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="input-caption-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
