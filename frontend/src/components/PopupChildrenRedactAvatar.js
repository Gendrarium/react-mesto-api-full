function PopupChildrenRedactAvatar({
  values,
  onChange,
  errors,
}) {

  return (
    <>
      <input
        className="popup__input popup__input_content_name"
        value={values.avatar}
        onChange={onChange}
        id="avatar-url"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="avatar-url-error" className="popup__error">{errors.avatar}</span>
    </>
  );
}

export default PopupChildrenRedactAvatar;
