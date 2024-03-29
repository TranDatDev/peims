import React, { useState } from "react";
import "./Register.scss";
import RegisterLight from "../../../assets/RegisterLight.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleClick = async () => {
      try {
         // Gửi yêu cầu đăng ký về API của Django port 8000
         const response = await axios.post("http://localhost:8000/register/", {
            customer_username: username,
            customer_password: password,
         });

         // Nếu đăng ký thành công
         Swal.fire({
            title: "Thank you for using PEIMS!",
            text: "Register successfully!",
            icon: "success",
         }).then((result) => {
            if (result.isConfirmed) {
               window.location.href = "/login";
            }
         });
      } catch (error) {
         // Xử lý lỗi đăng ký
         Swal.fire({
            title: "Register failed!",
            text: "This account already exists or is invalid",
            icon: "error",
         });
      }
   };

   return (
      <section className="register__container">
         <div className="register__instance--1">
            <div className="register__title">
               <h1>Register</h1>
               <p>
                  A financier's register is a map to their treasure,
                  <br />A window into their soul, their greed, and their
                  pleasure.
               </p>
            </div>
            <div className="register__inputplace">
               <div className="register__username">
                  <h2 className="register__username__title">
                     Username <span>*</span>
                  </h2>
                  <div className="register__username__box">
                     <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        className="register__input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>
               </div>
               <div className="register__password">
                  <h2 className="register__password__title">
                     Password <span>*</span>
                  </h2>
                  <div className="register__username__box">
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="register__input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
               </div>
               <div className="register__password">
                  <h2 className="register__password__title">
                     Confirm Password <span>*</span>
                  </h2>
                  <div className="register__username__box">
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Confirm your password"
                        className="register__input"
                     />
                  </div>
               </div>
            </div>
            <div className="register__submit">
               <div className="register__button">
                  <h3>
                     <button onClick={handleClick}>Register</button>
                  </h3>
               </div>
               <div className="register__extend__register">
                  <p>
                     Already have an account?{" "}
                     <span className="register__register__now">
                        <Link to="/login">Log in</Link>
                     </span>
                  </p>
               </div>
            </div>
         </div>
         <div className="register__instance--2">
            <img src={RegisterLight} alt="" />
         </div>
      </section>
   );
};

export default Register;
