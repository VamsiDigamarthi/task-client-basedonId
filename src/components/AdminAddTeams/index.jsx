import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiTeamLine } from "react-icons/ri";
import "./index.css";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminAddTeams = ({ addTeams, setAddTeams, getAllTeamsByAdmin }) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  //   console.log(UUU);
  //   console.log(UUU._id);

  const [user, setUser] = useState({
    name: "",

    username: "",
    password: "",
    role: "",
    head: UUU.role,
  });

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const theme = useMantineTheme();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/auth/register", user)
      .then((res) => {
        console.log(`api data ${res.data}`);
        setAddTeams(false);
        // setAddUserModal(false);
        // getTeamOfEmployee();
        getAllTeamsByAdmin();
      })
      .catch((e) => {
        console.log(e);
      });

    setUser({ name: "", username: "", password: "", role: "" });
  };

  // console.log(user);

  return (
    <>
      <Modal
        centered
        opened={addTeams}
        onClose={() => setAddTeams(false)}
        title="Register"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 2,
        }}
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "linear",
        }}
      >
        <form onSubmit={submitForm} className="signup-form">
          <div className="form-input-container">
            <AiOutlineUser className="form-icons" />
            <input
              placeholder="Name"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="name"
              value={user.name}
            />
          </div>

          <div className="form-input-container">
            <HiOutlineMail className="form-icons" />
            <input
              placeholder="Email"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="username"
              value={user.username}
            />
          </div>

          <div className="form-input-container">
            <RiLockPasswordLine className="form-icons" />
            <input
              placeholder="Password"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="password"
              value={user.password}
            />
          </div>

          {/* <div className="form-input-container">
            <select
              className="employee-type"
              name="role"
              onChange={usernameChange}
            >
              <option disabled selected hidden>
                Please select role of Employee
              </option>
              <option value="employee">Employee</option>
            </select>
          </div> */}
          <div className="form-input-container">
            <RiTeamLine className="form-icons" />
            <input
              placeholder="add teams"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="role"
              value={user.role}
            />
          </div>

          <button className="signup-btn new-add-signup-btn" type="submit">
            Add team
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AdminAddTeams;