import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';

const EditLitigantType = (props) => {
    const [initialValues, setInitialValues] = useState({
        litigantTypeName: '',
        litigantTypeDesciption: '',
        status: true,
    });

    
    useEffect(() => {
        const fetchInitialValues = async () => {
            try {
                const response = await ApiCall({
                    url: `https://localhost:44311/api/services/app/LitigantTypeUpdated/Get?Id=${props.litigantTypeId}`,
                    method: 'GET',
                });

                if (response?.data?.result) {
                    setInitialValues({
                        litigantTypeName: response.data.result.litigantTypeName,
                        litigantTypeDesciption: response.data.result.litigantTypeDesciption,
                        status: response.data.result.status,
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to fetch litigant type details', 'error');
            }
        };

        fetchInitialValues();
    }, [props.litigantTypeId]);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true, 
        validationSchema: Yup.object({
            litigantTypeName: Yup.string().required('Required'),
            litigantTypeDesciption: Yup.string().required('Required'),
            status: Yup.boolean().required('Required'),
        }),
        onSubmit: async (values) => {
            const dataToSubmit = {
                ...values,
                id: props.litigantTypeId,
            };
            try {
                await ApiCall({
                    url: `https://localhost:44311/api/services/app/LitigantTypeUpdated/Update`,
                    method: 'PUT',
                    data: dataToSubmit,
                });
                Swal.fire('Success', 'Litigant type updated successfully', 'success');
                if (typeof props.onclick === "function") {
                    props.onclick(); 
                  }
                props.close.current.click(); // Close modal after success
            } catch (error) {
                Swal.fire('Error', 'Failed to update litigant type', 'error');
            }
        },
    });


    return (
        <div>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#EditLitigentTypeModal"
                ref={props.open}
            >
                Launch edit modal
            </button>

            <div
                className="modal fade"
                id="EditLitigentTypeModal"
                tabIndex="-1"
                aria-labelledby="EditLitigentTypeModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EditLitigentTypeModalLabel">
                                Edit Litigant Type
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
                                {/* Litigant Type Name Field */}
                                <div className="mb-3">
                                    <label htmlFor="litigantTypeName" className="form-label">Litigant Type Name</label>
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

                                {/* Litigant Type Description Field */}
                                <div className="mb-3">
                                    <label htmlFor="litigantTypeDesciption" className="form-label">Litigant Type Description</label>
                                    <textarea
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

                                {/* Status Checkbox */}
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
                                            onChange={(e) => formik.setFieldValue('status', e.target.checked)}
                                            checked={formik.values.status}
                                        />
                                        <label htmlFor="status" className="form-check-label ms-2">
                                            Active
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLitigantType;
