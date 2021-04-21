import React from 'react';
import PopupWithForm from './PopupWithForm';
import PopupChildrenAddCard from './PopupChildrenAddCard';
import { useFormWithValidation } from '../hooks/useForm';

function AddPlacePopup({
  isOpen,
  onAddPlace,
  onClose,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm({name: '', link: ''});
  }, [isOpen, resetForm]);

  function handleSubmitForm(e) {
    e.preventDefault();

    onAddPlace(values);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmitForm}
      name='add'
      title='Новое место'
      buttonCaption='Создать'
      isOpen={isOpen ? 'popup_display-flex' : ''}
      onClose={onClose}
      isValid={isValid}
    >
      <PopupChildrenAddCard
        values={values}
        errors={errors}
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
