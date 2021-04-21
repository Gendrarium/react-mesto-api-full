function PopupChildrenAddCard({
  values,
  errors,
  onChange,
}) {

  return (
    <>
      <input
        className="popup__input popup__input_content_name"
        value={values.name}
        onChange={onChange}
        id="place-name"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="place-name-error" className="popup__error">{errors.name}</span>
      <input
        className="popup__input popup__input_content_link"
        value={values.link}
        onChange={onChange}
        id="user-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="user-link-error" className="popup__error">{errors.link}</span>
    </>
  );
}

export default PopupChildrenAddCard;
