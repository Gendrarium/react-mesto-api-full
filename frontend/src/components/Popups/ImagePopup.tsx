import { memo } from "react";

import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  selectIsCardFullOpen,
  selectSelectedCard,
} from "@redux/page/selectors";
import { closeAllPopups } from "@redux/page/actions";
import PlusIcon from "@icons/PlusIcon";

const ImagePopup: React.FC = memo(() => {
  const isOpen = useAppSelector(selectIsCardFullOpen);
  const card = useAppSelector(selectSelectedCard);
  const dispatch = useAppDispatch();

  return (
    <div className={`popup page__popup${isOpen ? " popup_display-flex" : ""}`}>
      <div className="popup__container popup__container_img-popup">
        <button
          className="popup__close-button"
          type="button"
          onClick={dispatch.bind(null, closeAllPopups())}
        >
          <PlusIcon
            className="popup__close-icon"
            fill="popup__close-icon-fill"
          />
        </button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
});

export default ImagePopup;
