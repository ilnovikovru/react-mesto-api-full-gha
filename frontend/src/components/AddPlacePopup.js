import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({ name: '', link: '' });

  useEffect(() => {
    setValues({ name: '', link: '' });
  }, [props.isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace(values);
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Название"
        id="input-title"
        className="popup__input-text popup__input-text_type_title"
        name="name"
        type="text"
        minLength="2"
        maxLength="30"
        required
        value={values.name || ''}
        onChange={handleChange}
      />
      <span id="input-title-error" className="popup__input-error"></span>
      <input
        placeholder="Ссылка на картинку"
        id="input-link"
        className="popup__input-text popup__input-text_type_link"
        name="link"
        type="url"
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      <span id="input-link-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;