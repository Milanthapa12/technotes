import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewNoteMutation } from "./noteApiSlice";
import { InputForm, TextAreaForm, SelectOption } from "../FormHelpers";

function NewNoteForm({ users }) {
  const navigate = useNavigate();
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  const [formData, setFormData] = useState({
    user: "",
    title: "",
    description: "",
  });
  const inputChangeHandler = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = await addNewNote(formData);
    if (result) {
      navigate("/dash/notes");
    }
  };

  return (
    <>
      {isError ? <p>{error.data.message}</p> : null}
      {!isLoading ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">title</label>
            <InputForm
              type="text"
              name="title"
              value={formData.title}
              handleChange={inputChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <TextAreaForm
              name="description"
              value={formData.description}
              handleChange={inputChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roles">Assigned To</label>
            <SelectOption
              name="user"
              defaultValue=""
              options={users}
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
      ) : null}
    </>
  );
}

export default NewNoteForm;
