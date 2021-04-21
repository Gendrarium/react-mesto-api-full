import React from 'react';
import PopupWithForm from './PopupWithForm';
import PopupChildrenRedactProfile from './PopupChildrenRedactProfile';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../hooks/useForm';

function EditProfilePopup({
  onUpdateUser,
  isOpen,
  onClose,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);


  function handleSubmitForm(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name='redact'
      title='Редактировать профиль'
      buttonCaption='Сохранить'
      isOpen={isOpen ? 'popup_display-flex' : ''}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmitForm}
    >
      <PopupChildrenRedactProfile
        values={values}
        errors={errors}
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
