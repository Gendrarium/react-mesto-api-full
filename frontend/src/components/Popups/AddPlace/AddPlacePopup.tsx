import { memo, useEffect } from "react";
import PopupWithForm from "../PopupWithForm";
import AddPlaceChild from "./AddPlaceChild";
import useForm from "@hooks/useForm";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectIsAddPlaceOpen } from "@redux/page/selectors";
import { closeAllPopups } from "@redux/page/actions";

export interface ValueProps {
  name: "";
  link: "";
}

interface AddPlacePopupProps {
  onAddPlace: (d: ValueProps) => void;
}

const AddPlacePopup: React.FC<AddPlacePopupProps> = memo(({ onAddPlace }) => {
  const isOpen = useAppSelector(selectIsAddPlaceOpen);
  const { values, errors, isValid, handleChange, resetForm } =
    useForm<ValueProps>({
      name: "",
      link: "",
    });
  const dispatch = useAppDispatch();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onAddPlace(values);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmitForm}
      title="Новое место"
      buttonCaption="Создать"
      isOpen={isOpen}
      onClose={dispatch.bind(null, closeAllPopups())}
      isValid={isValid}
    >
      <AddPlaceChild values={values} errors={errors} onChange={handleChange} />
    </PopupWithForm>
  );
});

export default AddPlacePopup;
