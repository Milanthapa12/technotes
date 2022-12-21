import React, { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../config/roles";
import { InputForm, SelectOptions } from "../FormHelpers";
// const USER_REGEX = /^[A-z]{3,25}$/;
// const PWD_REGEX = /^[A-z0-9]{8,25}$/;
function Create(props) {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    roles: "Employee",
  });
  const [roles, setRoles] = useState(["Employee", "Manager"]);
  const inputChangeHandler = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const happy = await addNewUser(formData);
    console.log(isSuccess);
    if (happy) {
      console.log(isSuccess, "Happy");
    }
  };

  return (
    <>
      {isError ? <p>{error?.data?.message}</p> : null}
      <form onSubmit={handleFormSubmit} id="user-create-form">
        <InputForm
          label="email"
          type="text"
          name="email"
          value={formData.email}
          handleChange={inputChangeHandler}
        />
        <InputForm
          type="text"
          name="username"
          label="username"
          value={formData.username}
          handleChange={inputChangeHandler}
        />
        <InputForm
          type="password"
          name="password"
          label="password"
          value={formData.password}
          handleChange={inputChangeHandler}
        />
        <SelectOptions
          name="roles"
          defaultValue="Employee"
          options={roles}
          handleChange={inputChangeHandler}
        />
        {/* <div className="form-group">
          <button type="submit" variant="primary btn-sm rounded-0">
            <FontAwesomeIcon icon={faSave} />
            Create
          </button>
        </div> */}
      </form>
    </>
  );
}

export default Create;
