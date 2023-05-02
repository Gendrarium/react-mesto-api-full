import { useCallback, useState } from "react";

export type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

type Form<T = {}> = {
  values: T;
  handleChange: HandleChange;
  resetForm: (v?: T, e?: T, iV?: boolean) => void;
  errors: T;
  isValid: boolean;
};

export default function useForm<T = {}>(initialState: T): Form<T> {
  const [saveInitialState] = useState<T>(initialState);
  const [values, setValues] = useState<T>(saveInitialState);
  const [errors, setErrors] = useState<T>(saveInitialState);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>): void => {
      const input = evt.target;
      const { value, name, validationMessage } = input;
      const form = input.closest("form");
      setValues((prev) => {
        return { ...prev, [name]: value };
      });
      setErrors((prev) => {
        return { ...prev, [name]: validationMessage };
      });
      setIsValid(form ? form.checkValidity() : true);
    },
    []
  );

  const resetForm = useCallback(
    (
      newValues = saveInitialState,
      newErrors = saveInitialState,
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [saveInitialState]
  );

  return { values, handleChange, resetForm, errors, isValid };
}
