import React from 'react';
import success from '../images/icons/success.svg';
import fail from '../images/icons/fail.svg';
import { usePopupClose } from '../hooks/usePopupClose';

function InfoTooltip({ isOpen, onClose, message, isSuccessful }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose} />
        <div className="popup__sign-container">
          <img src={isSuccessful ? success : fail} alt="Sign" className="popup__sign-icon" />
          <h2 className="popup__title popup__title_sign">{message}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
