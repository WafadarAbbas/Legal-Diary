import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall'; // Ensure this module has the function to make API calls
import Swal from 'sweetalert2';

const CreateLitigantType = (props) => {
  const formik = useFormik({
    initialValues: {
      litigantTypeName: '',
      litigantTypeDesciption: '',
      status: true,
    },
    validationSchema: Yup.object({
      litigantTypeName: Yup.string().required('Litigant type name is required'),
      litigantTypeDesciption: Yup.string().required('Description is required'),
      status: Yup.boolean(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await ApiCall({
          method: 'POST',
          url: 'https://localhost:44311/api/services/app/LitigantTypeUpdated/Create',
          data: values,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Litigant type created successfully!',
          });
          resetForm(); 
          if (typeof props.onclick === "function") {
            props.onclick(); 
          }
          props.close.current.click();  
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while creating litigant type.';
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: errorMessage,
        });
      }
    },
  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateLitigantTypeModal"
        ref={props.open}
      >
        Launch CreateLitigantType modal
      </button>

      <div
        className="modal fade"
        id="CreateLitigantTypeModal"
        tabIndex="-1"
        aria-labelledby="CreateLitigantTypeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateLitigantTypeModalLabel">
                Create Litigant Type
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
                <div className="row mb-3">
                  <label htmlFor="litigantTypeName" className="col-sm-4 col-form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Litigant Type Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className={`form-control ${formik.touched.litigantTypeName && formik.errors.litigantTypeName ? 'is-invalid' : ''}`}
                      id="litigantTypeName"
                      name="litigantTypeName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.litigantTypeName}
                    />
                    {formik.touched.litigantTypeName && formik.errors.litigantTypeName ? (
                      <div className="invalid-feedback">{formik.errors.litigantTypeName}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="litigantTypeDesciption" className="col-sm-4 col-form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Description<span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className={`form-control ${formik.touched.litigantTypeDesciption && formik.errors.litigantTypeDesciption ? 'is-invalid' : ''}`}
                      id="litigantTypeDesciption"
                      name="litigantTypeDesciption"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.litigantTypeDesciption}
                    />
                    {formik.touched.litigantTypeDesciption && formik.errors.litigantTypeDesciption ? (
                      <div className="invalid-feedback">{formik.errors.litigantTypeDesciption}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="status" className="col-sm-4 col-form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Status<span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="col-sm-8 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="status"
                      name="status"
                      onChange={formik.handleChange}
                      checked={formik.values.status}
                    />
                    <label htmlFor="status" className="form-check-label ms-2">
                      Active
                    </label>
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create
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

export default CreateLitigantType;
