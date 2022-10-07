import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../config/roles";
import { InputForm, SelectOptions } from "../FormHelpers";
// const USER_REGEX = /^[A-z]{3,25}$/;
// const PWD_REGEX = /^[A-z0-9]{8,25}$/;
function Create() {
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
    await addNewUser(formData);
    console.log(formData);
  };

  return (
    <>
      {isError ? <p>{error?.data?.message}</p> : null}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <InputForm
            type="text"
            name="email"
            value={formData.email}
            handleChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <InputForm
            type="text"
            name="username"
            value={formData.username}
            handleChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <InputForm
            type="password"
            name="password"
            value={formData.password}
            handleChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roles">Roles</label>
          <SelectOptions
            name="roles"
            defaultValue="Employee"
            options={roles}
            handleChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <button type="submit">
            <FontAwesomeIcon icon={faSave} />
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default Create;
