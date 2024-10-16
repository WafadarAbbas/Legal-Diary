import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";

const AddCaseTypeModal = ({ show, onHide }) => {
  const formik = useFormik({
    initialValues: {
      caseTypeName: '',
    },
    onSubmit: (values) => {
      console.log('Submitted Values:', values)
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Case Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="caseTypeName" className="form-label">Case Type Name</label>
            <input
              type="text"
              id="caseTypeName"
              name="caseTypeName"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Add onBlur handling
              value={formik.values.caseTypeName}
            />
            {formik.touched.caseTypeName && formik.errors.caseTypeName ? (
              <div className="text-danger">{formik.errors.caseTypeName}</div>
            ) : null}
          </div>
          <Button type="submit" variant="primary">
            Add
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCaseTypeModal;

