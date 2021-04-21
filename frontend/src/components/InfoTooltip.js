import authYes from '../images/auth-yes.svg';
import authNo from '../images/auth-no.svg';

function InfoTooltip(props) {

  return (
    <div className={`popup page__popup ${props.isOpen}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose}/>
        <img className="popup__icon" src={props.isSuccess ? authYes : authNo} alt={props.isSuccess ? "Успешно" : "Ошибка"}/>
        <h2 className="popup__title">{props.isSuccess ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
 }
 export default InfoTooltip;
