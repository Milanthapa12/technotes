import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewNoteMutation } from "./noteApiSlice";
import { InputForm, TextAreaForm, SelectOption } from "../FormHelpers";
import { Button, Card, Col, Form } from "react-bootstrap";

function NewNoteForm({ users }) {
  const navigate = useNavigate();
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  const [formData, setFormData] = useState({
    user: "",
    title: "",
    description: "",
  });
  const inputChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(event.target.name, event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = await addNewNote(formData);
    if (result) {
      navigate("/dash/notes");
    }
  };

  return (
    <Col className="vh-100 my-5" md={{ span: 6, offset: 3 }}>
      {isError ? <p>{error.data.message}</p> : null}
      {!isLoading ? (
        <Card className="px-3 py-4 rounded-0 shadow">
          <Card.Title>New Note</Card.Title>
          <Form onSubmit={handleFormSubmit}>
            <InputForm
              type="text"
              name="title"
              label="Title"
              value={formData.title}
              handleChange={inputChangeHandler}
            />
            <TextAreaForm
              name="description"
              label="Description"
              value={formData.description}
              handleChange={inputChangeHandler}
            />
            <SelectOption
              name="user"
              label="Assigned To"
              defaultValue=""
              options={users}
              handleChange={inputChangeHandler}
            />
            <div className="form-group text-end my-3">
              <Button type="submit" className="btn-sm rounded-0">
                <FontAwesomeIcon icon={faSave} className="px-1" />
                Create
              </Button>
            </div>
          </Form>
        </Card>
      ) : null}
    </Col>
  );
}

export default NewNoteForm;
