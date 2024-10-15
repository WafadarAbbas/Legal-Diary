import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../../Apicall/ApiCall";

const CreateDesignation = (props) => {
  const formik = useFormik({
    initialValues: {
      designationName: "",
      designationNotes: "",
    },
    validationSchema: Yup.object({
      designationName: Yup.string().required("Designation Name is required"),
      designationNotes: Yup.string().required("Designation Notes are required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await ApiCall({
          url: 'https://localhost:44311/api/services/app/Designation/Create',
          method: 'POST',
          data: values,
        });
        console.log('Response:', response);
        if (typeof props.onclick === "function") {
          props.onclick(); 
        }
        props.close.current.click();  
        formik.resetForm();  

      } catch (error) {
        console.error('Error creating designation:', error);
         
      }
    },
    
  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateDesignationModal"
        ref={props.open}
      >
        Launch Create Designation modal
      </button>

      <div
        className="modal fade"
        id="CreateDesignationModal"
        tabIndex="-1"
        aria-labelledby="CreateDesignationModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateDesignationModalLabel">
                Create Designation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="designationName" className="form-label"style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                    Designation Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.designationName &&
                      formik.errors.designationName
                        ? "is-invalid"
                        : ""
                    }`}
                    id="designationName"
                    name="designationName"
                    value={formik.values.designationName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.designationName &&
                  formik.errors.designationName ? (
                    <div className="invalid-feedback">
                      {formik.errors.designationName}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="designationNotes" className="form-label"  style={{ fontSize: '0.95rem', fontWeight: 'bold' }} >
                    Designation Notes
                  </label>
                  <textarea
                    className={`form-control ${
                      formik.touched.designationNotes &&
                      formik.errors.designationNotes
                        ? "is-invalid"
                        : ""
                    }`}
                    id="designationNotes"
                    name="designationNotes"
                    rows="3"
                    value={formik.values.designationNotes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  ></textarea>
                  {formik.touched.designationNotes &&
                  formik.errors.designationNotes ? (
                    <div className="invalid-feedback">
                      {formik.errors.designationNotes}
                    </div>
                  ) : null}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={props.close}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDesignation;
