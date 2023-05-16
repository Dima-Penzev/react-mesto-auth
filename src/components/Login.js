import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Login({ handleLogin }) {
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
      .login(formValue.password, formValue.email)
      .then((res) => {
        handleLogin();
        setFormValue({ email: "", password: "" });
        localStorage.setItem("token", res.token);
        navigate("/main", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Вход</h2>
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
        <button>Войти</button>
      </form>
    </div>
  );
}
