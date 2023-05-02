import { memo } from "react";
import AuthSuccessIcon from "@icons/AuthSuccessIcon";
import AuthErrorIcon from "@icons/AuthErrorIcon";
import { useAppSelector } from "@redux/store";
import { selectIsInfoTooltipOpen } from "@redux/page/selectors";
import PlusIcon from "@icons/PlusIcon";

interface InfoTooltipProps {
  onClose: () => void;
  isSuccess: boolean;
}

const InfoTooltip: React.FC<InfoTooltipProps> = memo(
  ({ onClose, isSuccess }) => {
    const isOpen = useAppSelector(selectIsInfoTooltipOpen);

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
          {isSuccess ? (
            <AuthSuccessIcon className="popup__icon" fill="popup__icon-fill" />
          ) : (
            <AuthErrorIcon
              className="popup__icon"
              fill="popup__icon-fill popup__icon-fill_error"
            />
          )}
          <h2 className="popup__title">
            {isSuccess
              ? "Вы успешно зарегистрировались"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    );
  }
);

export default InfoTooltip;
