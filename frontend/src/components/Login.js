import React from 'react';
import {useHistory} from 'react-router-dom';
import * as auth from '../utils/auth.js';
import AuthPage from './AuthPage';

function Login({setLocation, handleLogin, setAppEmail, openNotice}) {
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
    auth.authorize(password, email)
      .then((data) => {
        if (!data.message){
          setAppEmail(email);
          setEmail('');
          setPassword('');
          handleLogin();
          history.push('/');
      } else {
        throw new Error('Неверный логин или пароль!')
      }
      })
      .catch((err) => {
        openNotice(false);
        console.log(err)
      });
  }

  React.useEffect(()=> {
    setLocation('/sign-in');
  },[setLocation]);

  React.useEffect(()=> {
  // Если ошибки пустые, а инпуты заполнены, кнопка активна (isDisabled=false)
  error.email === '' && error.password === '' ? (email !== '' && password !== '' ? setIsButtonDisabled(false) : setIsButtonDisabled(true)) : setIsButtonDisabled(true);
  }, [error, email, password]);

  return (
    <AuthPage
      email={email}
      error={error}
      isDisabled={isButtonDisabled}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      title="Вход"
      buttonTitle="Войти"
      onSubmit={handleSubmit}
    />
  );
}

export default Login;
