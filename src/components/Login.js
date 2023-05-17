import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormValue({ email: "", password: "" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .login(formValue.password, formValue.email)
      .then((res) => {
        handleLogin(formValue.email);
        localStorage.setItem("token", res.token);
        navigate("/main", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="entry">
      <h2 className="entry__title">Вход</h2>
      <form className="entry__form" onSubmit={handleSubmit}>
        <input
          className="entry__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          className="entry__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button className="entry__submit">Войти</button>
      </form>
    </div>
  );
}
