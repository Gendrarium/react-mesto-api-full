import { memo } from "react";

interface AuthPageProps {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
  isDisabled: boolean;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  buttonTitle: string;
  children?: React.ReactElement;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthPage: React.FC<AuthPageProps> = memo(
  ({
    email,
    password,
    errors,
    isDisabled,
    handleEmailChange,
    handlePasswordChange,
    title,
    buttonTitle,
    children,
    onSubmit,
  }) => {
    return (
      <section className="auth main__no-margin">
        <h1 className="auth__title">{title}</h1>
        <form
          onSubmit={onSubmit}
          className="auth__form"
          target="_self"
          name="auth-form"
          method="get"
        >
          <input
            className="auth__input"
            value={email}
            onChange={handleEmailChange}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="auth__error">{errors.email}</span>
          <input
            className="auth__input"
            value={password}
            onChange={handlePasswordChange}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength={2}
            maxLength={200}
            required
          />
          <span className="auth__error">{errors.password}</span>
          <button
            disabled={isDisabled}
            className={`auth__button ${isDisabled && "auth__button_disabled"}`}
          >
            {buttonTitle}
          </button>
        </form>
        {children}
      </section>
    );
  }
);

export default AuthPage;
