import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import ApiCall from '../../../Apicall/ApiCall';

const CreatePresiding = (props) => {
  const [designations, setDesignations] = useState([]);

  const fetchDesignations = async () => {
    try {
      const response = await ApiCall({
        url: 'https://localhost:44311/api/services/app/Designation/GetAllDesignationItems',
        method: 'GET',
      });

      if (response?.data?.result?.items) {
        const options = response.data.result.items.map(item => ({
          value: item.value,
          label: item.displayText, 
        }));
        setDesignations(options);
      } else {
        console.error('Failed to fetch designations');
      }
    } catch (error) {
      console.error('Error fetching designations:', error);
    }
  };

  useEffect(() => {
    fetchDesignations();  
  }, []);

  const formik = useFormik({
    initialValues: {
      presidingOfficerName: '',    
      presidingOfficerNameNotes: '',  
      designationId: 0,          
    },
    validationSchema: Yup.object({
      presidingOfficerName: Yup.string().required('Required'),
      presidingOfficerNameNotes: Yup.string().required('Required'),
      designationId: Yup.number().required('Required').moreThan(0, 'Select a designation'), 
    }),
    onSubmit: async (values) => {
      try {
        const response = await ApiCall({
          url: 'https://localhost:44311/api/services/app/PresidingOfficer/Create',
          method: 'POST',
          data: values,
        });

        if (response?.data?.success) {
          console.log('Presiding Officer created successfully:', response.data.result);
          if (typeof props.onclick === "function") {
            props.onclick(); 
          }
          formik.resetForm();  
          props.close.current.click(); 

        } else {
          console.error('Failed to create presiding officer', response.data.message);
        }
      } catch (error) {
        console.error('Error creating presiding officer:', error);
      }
    },
  });
 

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreatePresidingModal"
        ref={props.open}
      >
        Launch Create Presiding modal
      </button>

      <div
        className="modal fade"
        id="CreatePresidingModal"
        tabIndex="-1"
        aria-labelledby="CreatePresidingModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreatePresidingModalLabel">
                Create Presiding Officer
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
                  <label htmlFor="designationId" className="form-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Designation
                  </label>
                  <Select
                    id="designationId"
                    options={designations}
                    onChange={(selectedOption) => formik.setFieldValue('designationId', selectedOption.value)}
                    onBlur={() => formik.setFieldTouched('designationId', true)}
                  />
                  {formik.touched.designationId && formik.errors.designationId ? (
                    <div className="text-danger">{formik.errors.designationId}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="presidingOfficerName" className="form-label"style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Presiding Officer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="presidingOfficerName"
                    {...formik.getFieldProps('presidingOfficerName')}
                  />
                  {formik.touched.presidingOfficerName && formik.errors.presidingOfficerName ? (
                    <div className="text-danger">{formik.errors.presidingOfficerName}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="presidingOfficerNameNotes" className="form-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Presiding Officer Notes
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="presidingOfficerNameNotes"
                    {...formik.getFieldProps('presidingOfficerNameNotes')}
                  />
                  {formik.touched.presidingOfficerNameNotes && formik.errors.presidingOfficerNameNotes ? (
                    <div className="text-danger">{formik.errors.presidingOfficerNameNotes}</div>
                  ) : null}
                </div>

                <div className="modal-footer d-flex justify-content-between">
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

export default CreatePresiding;
