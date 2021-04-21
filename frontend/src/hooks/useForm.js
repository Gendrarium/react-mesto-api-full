import React from 'react';

export function useFormWithValidation () {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name, validationMessage } = input;
    setValues({ ...values, [name]: value});
    setErrors({ ...errors, [name]: validationMessage});
    setIsValid(input.closest("form").checkValidity());
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid)
    }, [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid };
}
