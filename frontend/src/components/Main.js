import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const { cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-title-container">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button type="button" className="profile__info-edit-button" aria-label="Редактировать" onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button type="button" value="Добавить" className="profile__info-add-button" aria-label="Добавить" onClick={onAddPlace}>
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
