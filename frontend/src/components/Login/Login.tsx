import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorize } from "@utils/auth";
import AuthPage from "../AuthPage/AuthPage";
import { handleLogin } from "@redux/user/actions";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectLoggedIn } from "@redux/user/selectors";

interface LoginProps {
  openNotice: (i: boolean) => void;
}

const Login: React.FC<LoginProps> = memo(({ openNotice }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const loggedIn = useAppSelector(selectLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setErrors((prev) => {
        return { ...prev, email: e.target.validationMessage };
      });
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setErrors((prev) => {
        return { ...prev, email: e.target.validationMessage };
      });
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      authorize(password, email)
        .then((data) => {
          if (!data.message) {
            setEmail("");
            setPassword("");
            dispatch(handleLogin(data.user));
            navigate("/");
          } else {
            throw new Error("Неверный логин или пароль!");
          }
        })
        .catch((err) => {
          openNotice(false);
          console.log(err);
        });
    },
    [dispatch, email, navigate, openNotice, password]
  );

  useEffect(() => {
    // Если ошибки пустые, а инпуты заполнены, кнопка активна (isDisabled=false)
    errors.email === "" && errors.password === ""
      ? email !== "" && password !== ""
        ? setIsButtonDisabled(false)
        : setIsButtonDisabled(true)
      : setIsButtonDisabled(true);
  }, [errors, email, password]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [navigate, loggedIn]);

  return (
    <AuthPage
      email={email}
      errors={errors}
      isDisabled={isButtonDisabled}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      title="Вход"
      buttonTitle="Войти"
      onSubmit={handleSubmit}
    />
  );
});

export default Login;
