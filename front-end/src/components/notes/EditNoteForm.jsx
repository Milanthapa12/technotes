import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useUpdateNoteMutation } from "./noteApiSlice";
import { InputForm, TextAreaForm, SelectOption } from "../FormHelpers";
function EditNoteForm({ id, note, users }) {
  const navigate = useNavigate();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [formData, setFormData] = useState({
    id: id,
    user: note.user,
    title: note.title,
    description: note.description,
  });
  const inputChangeHandler = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = await updateNote(formData);
    if (result) {
      //   navigate("/dash/notes");
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

export default EditNoteForm;
