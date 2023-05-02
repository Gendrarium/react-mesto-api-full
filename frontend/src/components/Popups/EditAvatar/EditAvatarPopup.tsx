import { memo, useEffect } from "react";
import PopupWithForm from "../PopupWithForm";
import EditAvatarChild from "./EditAvatarChild";
import useForm from "@hooks/useForm";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectIsEditAvatarOpen } from "@redux/page/selectors";
import { closeAllPopups } from "@redux/page/actions";

interface EditAvatarPopupProps {
  onUpdateAvatar: (d: ValueProps) => void;
}

export interface ValueProps {
  avatar: string;
}

const EditAvatarPopup: React.FC<EditAvatarPopupProps> = memo(
  ({ onUpdateAvatar }) => {
    const isOpen = useAppSelector(selectIsEditAvatarOpen);
    const initialState = { avatar: "" };
    const { values, errors, isValid, handleChange, resetForm } =
      useForm<ValueProps>(initialState);
    const dispatch = useAppDispatch();

    useEffect(() => {
      resetForm();
    }, [isOpen, resetForm]);

    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      onUpdateAvatar(values);
    }

    return (
      <PopupWithForm
        title="Обновить аватар"
        buttonCaption="Сохранить"
        isOpen={isOpen}
        onClose={dispatch.bind(null, closeAllPopups())}
        isValid={isValid}
        onSubmit={handleSubmitForm}
      >
        <EditAvatarChild
          values={values}
          errors={errors}
          onChange={handleChange}
        />
      </PopupWithForm>
    );
  }
);

export default EditAvatarPopup;
