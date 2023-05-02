import PlusIcon from "@icons/PlusIcon";
import { memo } from "react";

interface PopupWithFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  title: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactElement;
  isValid?: boolean;
  buttonCaption: string;
}

const PopupWithForm: React.FC<PopupWithFormProps> = memo(
  ({ isOpen, onClose, title, onSubmit, children, isValid, buttonCaption }) => {
    return (
      <div
        className={`popup page__popup${isOpen ? " popup_display-flex" : ""}`}
      >
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            onClick={onClose}
          >
            <PlusIcon
              className="popup__close-icon"
              fill="popup__close-icon-fill"
            />
          </button>
          <h2 className="popup__title">{title}</h2>
          <form
            onSubmit={onSubmit}
            className="popup__form"
            target="_self"
            method="get"
          >
            {children}
            <button
              className={`popup__button ${
                !isValid && "popup__button_disabled"
              }`}
              type="submit"
              disabled={!isValid}
            >
              {buttonCaption}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default PopupWithForm;
