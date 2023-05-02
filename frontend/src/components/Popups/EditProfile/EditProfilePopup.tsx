import { memo, useEffect } from "react";
import PopupWithForm from "../PopupWithForm";
import EditProfileChild from "./EditProfileChild";
import useForm from "@hooks/useForm";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectIsEditProfileOpen } from "@redux/page/selectors";
import { closeAllPopups } from "@redux/page/actions";
import { selectCurrentUser } from "@redux/user/selectors";

export interface ValueProps {
  name: string;
  about: string;
}

interface EditProfilePopupProps {
  onUpdateUser: (data: ValueProps) => void;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = memo(
  ({ onUpdateUser }) => {
    const { values, errors, isValid, handleChange, resetForm } =
      useForm<ValueProps>({
        name: "",
        about: "",
      });

    const currentUser = useAppSelector(selectCurrentUser);
    const isOpen = useAppSelector(selectIsEditProfileOpen);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (currentUser) {
        const { name, about } = currentUser;
        resetForm({ name, about }, { name: "", about: "" }, true);
      }
    }, [currentUser, resetForm]);

    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      onUpdateUser(values);
    }

    return (
      <PopupWithForm
        title="Редактировать профиль"
        buttonCaption="Сохранить"
        isOpen={isOpen}
        isValid={isValid}
        onClose={dispatch.bind(null, closeAllPopups())}
        onSubmit={handleSubmitForm}
      >
        <EditProfileChild
          values={values}
          errors={errors}
          onChange={handleChange}
        />
      </PopupWithForm>
    );
  }
);

export default EditProfilePopup;
