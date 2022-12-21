// import React from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
export const InputForm = (props) => {
  return (
    <Form.Group className="mb-2" controlId={props.label}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        size="sm"
        className={props.classProperties ? props.classProperties : "rounded-0"}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placeholder={`Enter ${props.name}...`}
      />
      {props?.error ? (
        <Form.Control.Feedback type="invalid">
          Please provide a valid city.
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export const TextAreaForm = (props) => {
  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label id={props.name}>
          {props.label ? props.label : props.name}
        </Form.Label>
        <Form.Control
          as="textarea"
          id={props.name}
          rows={8}
          name={props.name}
          className="rounded-0"
          placeholder={`Enter ${props.name}...`}
          onChange={props.handleChange}
        >
          {props.value}
        </Form.Control>
      </Form.Group>
    </>
  );
};

export const SelectOptions = (props) => {
  return (
    <Form.Select
      name={props.name}
      id={props.name}
      defaultValue={props.defaultValue}
      onChange={props.handleChange}
    >
      <Form.Label>{props.label ? props.label : props.name}</Form.Label>
      {props.options?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Form.Select>
  );
};

export const SelectOption = (props) => {
  return (
    <Form.Group className="mb-2">
      <Form.Label>{props.label ? props.label : props.name}</Form.Label>
      <Form.Select
        className="rounded-0"
        aria-label={props.label ? props.label : props.name}
        name={props.name}
        id={props.name}
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
      >
        <option>Select {props.name}</option>
        {props.options.length > 0 &&
          props.options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
  );
};

export const FormCheckBox = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Check
        type="checkbox"
        label={props.label}
        checked={props.checked}
        onChange={props.handleChange}
      />
    </Form.Group>
  );
};

export const MyTable = (props) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {props.theads.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.body}</tbody>
    </Table>
  );
};

export const ModalContainer = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labeledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">
          {props.btnCloseText ? props.btnCloseText : "Close"}
        </Button>
        <Button type="submit" form={`${props.id}-form`}>
          {props.buttonText ? props.buttonText : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
