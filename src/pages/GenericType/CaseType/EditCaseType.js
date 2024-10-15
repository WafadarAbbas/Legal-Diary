import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ApiCall from '../../../Apicall/ApiCall';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const EditCaseType = (props) => {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        caseTypeName: '',
        caseTypeDesciption: ''
    });

  
    const fetchCaseTypeById = async (id) => {
        setLoading(true);
        try {
            const response = await ApiCall({
                url: `https://localhost:44311/api/services/app/CaseType/Get?Id=${id}`,
                method: 'GET',
            });

            if (response?.data?.result) {
                setInitialValues({
                    caseTypeName: response.data.result.caseTypeName,
                    caseTypeDesciption: response.data.result.caseTypeDesciption,
                });
            } else {
                Swal.fire('Error', 'Failed to fetch case type data', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch case type data', 'error');
        } finally {
            setLoading(false);
        }
    };

     
    const formik = useFormik({
        enableReinitialize: true,  
        initialValues,
        validationSchema: Yup.object({
            caseTypeName: Yup.string().required('Case Type Name is required'),
            caseTypeDesciption: Yup.string().required('Case Type Description is required'),
        }),
        onSubmit: async (values) => {
            const dataToSubmit = {
                ...values,
                id: props.caseTypeId,
            };

            try {
                const response = await ApiCall({
                    url: 'https://localhost:44311/api/services/app/CaseType/Update',
                    method: 'PUT',
                    data: dataToSubmit,
                });

                if (response?.data?.success) {
                    Swal.fire('Success', 'Case type updated successfully', 'success');
                    if (typeof props.onclick === "function") {
                        props.onclick(); 
                      }
                    props.close.current.click(); 
                } else {
                    Swal.fire('Error', 'Failed to update case type', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to update case type', 'error');
            }
        },
    });

    useEffect(() => {
        if (props.caseTypeId) {
            fetchCaseTypeById(props.caseTypeId);
        }
    }, [props.caseTypeId]);

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#EditCaseTypeModal"
                ref={props.open}
            >
                Launch edit modal
            </button>

            <div
                className="modal fade"
                id="EditCaseTypeModal"
                tabIndex="-1"
                aria-labelledby="EditCaseTypeModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EditCaseTypeModalLabel">
                                Edit Case Type
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
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
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
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCaseType;
