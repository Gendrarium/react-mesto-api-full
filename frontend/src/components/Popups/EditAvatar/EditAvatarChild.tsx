import { HandleChange } from "@hooks/useForm";
import { memo } from "react";
import { ValueProps } from "./EditAvatarPopup";

interface EditAvatarChildProps {
  values: ValueProps;
  onChange: HandleChange;
  errors: ValueProps;
}

const EditAvatarChild: React.FC<EditAvatarChildProps> = memo(
  ({ values, onChange, errors }) => {
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
        <span id="avatar-url-error" className="popup__error">
          {errors.avatar}
        </span>
      </>
    );
  }
);

export default EditAvatarChild;
