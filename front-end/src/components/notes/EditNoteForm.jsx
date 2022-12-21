import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useUpdateNoteMutation } from "./noteApiSlice";
import { InputForm, TextAreaForm, SelectOption } from "../FormHelpers";
import { Col, Card, Button } from "react-bootstrap";
function EditNoteForm({ id, note, users }) {
  const navigate = useNavigate();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [formData, setFormData] = useState({
    ticket_id: note.ticket,
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
      navigate("/dash/notes");
    }
  };

  return (
    <Col className="vh-100 my-5" md={{ span: 6, offset: 3 }}>
      {isError ? <p>{error.data.message}</p> : null}
      {!isLoading ? (
        <Card className="px-3 py-4 rounded-0 shadow">
          <Card.Title>Edit Note - # {formData.ticket_id}</Card.Title>
          <form onSubmit={handleFormSubmit}>
            <InputForm
              type="text"
              name="title"
              value={formData.title}
              handleChange={inputChangeHandler}
            />
            <TextAreaForm
              name="description"
              value={formData.description}
              handleChange={inputChangeHandler}
            />
            <SelectOption
              name="user"
              label="Assigned To"
              defaultValue={formData.user}
              options={users}
              handleChange={inputChangeHandler}
            />
            <div className="form-group text-end my-3">
              <Button type="submit" className="btn-sm rounded-0">
                <FontAwesomeIcon icon={faSave} className="px-1" />
                Update
              </Button>
            </div>
          </form>
        </Card>
      ) : null}
    </Col>
  );
}

export default EditNoteForm;
