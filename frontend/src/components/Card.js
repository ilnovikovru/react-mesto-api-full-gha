import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  return (
    <li className="elements__list-item">
      <article className="element">
        {isOwn &&
          <button type="button" value="Удалить" className="element__delete" aria-label="Удалить" onClick={handleDeleteClick} />
        }
        <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
        <div className="element__name">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button type="button" value="Нравится" className={cardLikeButtonClassName} aria-label="Нравится" onClick={handleLikeClick}></button>
            <p className="element__like-count">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
