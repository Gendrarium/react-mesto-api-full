import React from 'react';
import PopupWithForm from './PopupWithForm';
import PopupChildrenRedactAvatar from './PopupChildrenRedactAvatar';
import { useFormWithValidation } from '../hooks/useForm';

function EditAvatarPopup({
  isOpen,
  onUpdateAvatar,
  onClose
}) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm({avatar: ''});
  }, [isOpen, resetForm]);

  function handleSubmitForm(e) {
    e.preventDefault();

    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name='avatar-edit'
      title='Обновить аватар'
      buttonCaption='Сохранить'
      isOpen={isOpen ? 'popup_display-flex' : ''}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmitForm}
    >
      <PopupChildrenRedactAvatar
        values={values}
        errors={errors}
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
