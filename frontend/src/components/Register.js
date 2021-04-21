import React from 'react';
import AuthPage from './AuthPage';
import {useHistory} from 'react-router-dom';
import * as auth from '../utils/auth.js';
import {Link} from 'react-router-dom';

function Register({setLocation, openNotice}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({
    email: '',
    password: ''
  })
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setError({...error, email: e.target.validationMessage});
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setError({...error, password: e.target.validationMessage});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password){
      return;
    }
      auth.register(password, email)
      .then((res) => {
         if(!res.message){
            history.push('/sign-in');
            openNotice(true);
        } else {
          openNotice(false);
          }
      });
  }

  React.useEffect(()=> {
    setLocation('/sign-up')
  },[setLocation]);

  React.useEffect(()=> {
    // Если ошибки пустые, а инпуты заполнены, кнопка активна (isDisabled=false)
    error.email === '' && error.password === '' ? (email !== '' && password !== '' ? setIsButtonDisabled(false) : setIsButtonDisabled(true)) : setIsButtonDisabled(true);
    }, [error, email, password]);

  return (
    <AuthPage
      email={email}
      error={error}
      password={password}
      isDisabled={isButtonDisabled}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      onSubmit={handleSubmit}
      children={<Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>}
    />
  );
}


export default Register;
