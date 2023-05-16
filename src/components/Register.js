import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as auth from "../utils/auth";

export default function Register({ toggleBtnState }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
      .register(formValue.password, formValue.email)
      .then((res) => {
        toggleBtnState();
        setFormValue({ email: "", password: "" });
        navigate("/signin", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button>Зарегистрироваться</button>
      </form>
      <p>
        Уже зарегестрированы? <Link to="/signin">Войти</Link>
      </p>
    </div>
  );
}
