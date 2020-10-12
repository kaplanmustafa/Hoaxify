import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/authActions";

const LoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  // username veya passwordde değişiklik olunca ilk fonksiyon çalışır --> Trigger
  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();

    const creds = {
      username,
      password,
    };

    const { history } = props;
    const { push } = history;

    setError(undefined);

    try {
      await dispatch(loginHandler(creds));
      push("/"); // Giriş başarılıysa home'a yönlendir
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t } = useTranslation();

  const pendingApiCall = useApiProgress("post", "/api/1.0/auth");
  const buttonEnabled = username && password; // 2 değerin varlığına göre buttonEnabled'a true veya false atar

  return (
    <div className="container w-25">
      <form>
        <h1 className="text-center">{t("Login")}</h1>
        <Input
          label={t("Username")}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          label={t("Password")}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="text-center">
          <ButtonWithProgress
            disabled={!buttonEnabled || pendingApiCall}
            onClick={onClickLogin}
            pendingApiCall={pendingApiCall}
            text={t("Login")}
          ></ButtonWithProgress>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
