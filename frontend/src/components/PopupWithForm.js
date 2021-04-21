function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  isValid,
  buttonCaption
}) {

  return (
    <div className={`popup page__popup popup_button_${name} ${isOpen}`}   >
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} className="popup__form" target="_self" name={name} method="get">
        {children}
          <button className={`popup__button ${!isValid && 'popup__button_disabled'}`} type="submit" disabled={!isValid}>{buttonCaption}</button>
        </form>
      </div>
     </div>
  );
}

export default PopupWithForm;
