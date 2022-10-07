import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../config/roles";
import { InputForm, SelectOptions } from "../FormHelpers";

function EditForm({ id, user }) {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [formData, setFormData] = useState({
    id: id,
    email: user?.email,
    username: user?.username,
    password: "12345678",
    roles: user.roles ?? "Employee",
  });

  const [roles, setRoles] = useState(["Employee", "Manager"]);
  const inputChangeHandler = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await updateUser(formData);
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
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default EditForm;
