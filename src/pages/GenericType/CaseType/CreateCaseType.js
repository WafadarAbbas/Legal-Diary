import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall';

const CreateCaseType = (props) => {
    const formik = useFormik({
        initialValues: {
            caseTypeName: '',
            caseTypeDesciption: '',
        },
        validationSchema: Yup.object({
            caseTypeName: Yup.string()
                .required('Case type name is required'),
            caseTypeDesciption: Yup.string()
                .required('Case type description is required'),
        }),
        onSubmit: async (values) => {
           
            try {
                const response = await ApiCall({
                    url: 'https://localhost:44311/api/services/app/CaseType/Create', 
                    method: 'POST',
                    data: values,
                });
               
                if (typeof props.onclick === "function") {
                    props.onclick(); 
                  }
                props.close.current.click();
            } catch (error) {
                console.error('Error creating case type:', error);
            }
        },
    });

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#CreateCaseTypeModal"
                ref={props.open}
            >
                Launch CreateCaseType modal
            </button>

            <div
                className="modal fade"
                id="CreateCaseTypeModal"
                tabIndex="-1"
                aria-labelledby="CreateCaseTypeModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="CreateCaseTypeModalLabel">
                                Create Case Type
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
                                <div className="mb-3 row">
                                    <label htmlFor="caseTypeName" className="col-sm-4 col-form-label fw-bold" style={{ fontSize: '1.2rem' }}>
                                        Case Type Name<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.caseTypeName && formik.errors.caseTypeName ? 'is-invalid' : ''}`}
                                            id="caseTypeName"
                                            {...formik.getFieldProps('caseTypeName')}
                                        />
                                        {formik.touched.caseTypeName && formik.errors.caseTypeName ? (
                                            <div className="invalid-feedback">{formik.errors.caseTypeName}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="caseTypeDesciption" className="col-sm-4 col-form-label fw-bold" style={{ fontSize: '1.2rem' }}>
                                        Case Type Description<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.caseTypeDesciption && formik.errors.caseTypeDesciption ? 'is-invalid' : ''}`}
                                            id="caseTypeDesciption"
                                            {...formik.getFieldProps('caseTypeDesciption')}
                                        />
                                        {formik.touched.caseTypeDesciption && formik.errors.caseTypeDesciption ? (
                                            <div className="invalid-feedback">{formik.errors.caseTypeDesciption}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={props.close}>
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Create Case Type</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCaseType;
