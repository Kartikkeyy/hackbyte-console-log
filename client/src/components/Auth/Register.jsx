import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaUniversity } from 'react-icons/fa';
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [institute, setInstitute] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        let instituteValue = role === "Company" ? null : institute;
      const { data } = await axios.post(
        "http://localhost:4000/user/register",
        { name, phone, email, role, password , institute: instituteValue},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setInstitute("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/logo_word_hp.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
              <FaRegUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Company">Company</option>
                  <option value="Tnp">Tnp</option>
                  <option value="Student">Student</option>
                </select>
                
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
              <FaPencilAlt />
                <input
                  type="text"
                  placeholder="John"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
              <MdOutlineMailOutline />
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <FaPhoneFlip />
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="inputTag">
              <label>Institute</label>
              <div>
                <FaUniversity />
                <input
                  type="text"
                  placeholder="Your Institute"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <RiLock2Fill />
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;