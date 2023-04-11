import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    const mailFormat = /^([a-zA-Z0-9_\.\-])+\@gmail.com/;
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp nhau!", toastOptions);
      return false;
    } else if (username.length < 2) {
      toast.error("Username phải ít nhất 2 ký tự.", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Mật khẩu ít nhất 6 ký tự.", toastOptions);
      return false;
    } else if (!password || !confirmPassword || !username || !email) {
      toast.error("Vui lòng điền đủ thông tin.", toastOptions);
      return false;
    } else if (!mailFormat.test(email)) {
      toast.error("Sai định dạng gmail !", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
        //   JSON.stringify(data.user)
        // );
        toast.success("Đăng ký thành công!", toastOptions);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="register-container">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>register</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </div>

      <ToastContainer />
    </>
  );
}

export default Register;
