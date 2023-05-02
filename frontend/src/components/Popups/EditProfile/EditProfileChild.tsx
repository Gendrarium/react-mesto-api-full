import { HandleChange } from "@hooks/useForm";
import { memo } from "react";
import { ValueProps } from "./EditProfilePopup";

interface EditProfileChildProps {
  values: ValueProps;
  onChange: HandleChange;
  errors: ValueProps;
}

const EditProfileChild: React.FC<EditProfileChildProps> = memo(
  ({ values, onChange, errors }) => {
    return (
      <>
        <input
          className="popup__input popup__input_content_name"
          value={values.name}
          onChange={onChange}
          id="user-name"
          name="name"
          type="text"
          minLength={2}
          maxLength={40}
          required
        />
        <span id="user-name-error" className="popup__error">
          {errors.name}
        </span>
        <input
          className="popup__input popup__input_content_job"
          value={values.about}
          onChange={onChange}
          id="user-about"
          name="about"
          type="text"
          minLength={2}
          maxLength={200}
          required
        />
        <span id="user-job-error" className="popup__error">
          {errors.about}
        </span>
      </>
    );
  }
);

export default EditProfileChild;
