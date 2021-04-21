function ImagePopup(props) {

  return (
    <div className={`popup page__popup popup_button_img ${props.isOpen}`}>
      <div className="popup__container popup__container_img-popup">
        <button className="popup__close-button" type="button" onClick={props.onClose}/>
        <figure className="popup__figure">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
