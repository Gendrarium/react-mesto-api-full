import { memo, useCallback, useEffect, useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { useNavigate } from "react-router-dom";
import { register } from "@utils/auth";
import { Link } from "react-router-dom";

interface RegisterProps {
  openNotice: (i: boolean) => void;
}

const Register: React.FC<RegisterProps> = memo(({ openNotice }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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
      register(password, email).then((res) => {
        if (!res.message) {
          navigate("/sign-in");
          openNotice(true);
        } else {
          openNotice(false);
        }
      });
    },
    [email, navigate, openNotice, password]
  );

  useEffect(() => {
    // Если ошибки пустые, а инпуты заполнены, кнопка активна (isDisabled=false)
    errors.email === "" && errors.password === ""
      ? email !== "" && password !== ""
        ? setIsButtonDisabled(false)
        : setIsButtonDisabled(true)
      : setIsButtonDisabled(true);
  }, [errors, email, password]);

  return (
    <AuthPage
      email={email}
      errors={errors}
      password={password}
      isDisabled={isButtonDisabled}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      onSubmit={handleSubmit}
      children={
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      }
    />
  );
});

export default Register;
