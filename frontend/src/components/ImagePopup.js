import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({ card, onClose }) {
  const isOpen = card ? "popup_opened" : "";

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_photo ${isOpen}`}>
      <div className="popup__photo-container">
        <button type="button" className="popup__close-button popup__close-button_photo" aria-label="Закрыть" onClick={onClose}></button>
        {card && <img src={card.link} alt={card.name} className="popup__photo-image" />}
        {card && <p className="popup__photo-caption">{card.name}</p>}
      </div>
    </div>
  );
}

export default ImagePopup;