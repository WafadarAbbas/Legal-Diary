import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select'; // Import react-select
import ApiCall from '../../../Apicall/ApiCall';

const EditPresiding = (props) => {
    const [designations, setDesignations] = useState([]); // State for designations
    const [initialValues, setInitialValues] = useState({
        presidingOfficerName: '',
        presidingOfficerNameNotes: '',
        designationId: null
    });


    const fetchPresidingOfficerData = async (officerId) => {
        try {
            const response = await ApiCall({
                url: `https://localhost:44311/api/services/app/PresidingOfficer/GetPresidingOfficerForEdit?Id=${officerId}`,
                method: 'GET'
            });

            if (response?.data?.result) {
                const officerData = response.data.result;
                setInitialValues({
                    presidingOfficerName: officerData.presidingOfficerName || '',
                    presidingOfficerNameNotes: officerData.presidingOfficerNameNotes || '',
                    designationId: officerData.designationId || ''
                });
            } else {
                console.error('Failed to fetch officer data');
            }
        } catch (error) {
            console.error('Error fetching presiding officer data', error);
        }
    };

    // Fetch designation options
    const fetchDesignations = async () => {
        try {
            const response = await ApiCall({
                url: 'https://localhost:44311/api/services/app/Designation/GetAllDesignationItems',
                method: 'GET'
            });

            if (response?.data?.result?.items) {
                const options = response.data.result.items.map(item => ({
                    value: item.value,
                    label: item.displayText 
                }));
                setDesignations(options); 
            } else {
                console.error('Failed to fetch designations');
            }
        } catch (error) {
            console.error('Error fetching designations', error);
        }
    };

    useEffect(() => {
        if (props.officerId) {
            fetchPresidingOfficerData(props.officerId); // Fetch presiding officer details
        }
        fetchDesignations();  
    }, [props.officerId]);

 
    const formik = useFormik({
        enableReinitialize: true, // This allows formik to update the form when initialValues change
        initialValues,
        validationSchema: Yup.object({
            presidingOfficerName: Yup.string().required('Name is required'),
            presidingOfficerNameNotes: Yup.string().required('Notes are required'),
            designationId: Yup.string().required('Designation is required') // Validation for select field
        }),
        onSubmit: async (values) => {
            const payload = {
                id: props.officerId, // The ID of the officer being edited
                presidingOfficerName: values.presidingOfficerName,
                presidingOfficerNameNotes: values.presidingOfficerNameNotes,
                designationId: values.designationId, // Ensure it's submitted as a number
            };
        
            try {
             
                const response = await ApiCall({
                    url: 'https://localhost:44311/api/services/app/PresidingOfficer/Update',
                    method: 'PUT',
                    data: payload, 
                });
        
                if (response?.data?.success) {
                    console.log('Officer updated successfully:', response.data);
                    if (typeof props.onclick === "function") {
                        props.onclick(); 
                      }
                    props.close.current.click();  
                } else {
                    console.error('Failed to update officer:', response?.data?.error?.message || 'Unknown error');
                 
                }
            } catch (error) {
                console.error('Error updating officer:', error);
               
            }
        }
        
    });

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#EditPresidingModal"
                ref={props.open}
            >
                Launch edit modal
            </button>

            <div
                className="modal fade"
                id="EditPresidingModal"
                tabIndex="-1"
                aria-labelledby="EditPresidingModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EditPresidingModalLabel">
                                Edit Presiding Officer
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
                                    <label htmlFor="presidingOfficerName" className="form-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        Officer Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="presidingOfficerName"
                                        name="presidingOfficerName"
                                        onChange={formik.handleChange}
                                        value={formik.values.presidingOfficerName}
                                    />
                                    {formik.touched.presidingOfficerName && formik.errors.presidingOfficerName ? (
                                        <div className="text-danger">{formik.errors.presidingOfficerName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="presidingOfficerNameNotes" className="form-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        Notes
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="presidingOfficerNameNotes"
                                        name="presidingOfficerNameNotes"
                                        onChange={formik.handleChange}
                                        value={formik.values.presidingOfficerNameNotes}
                                    />
                                    {formik.touched.presidingOfficerNameNotes && formik.errors.presidingOfficerNameNotes ? (
                                        <div className="text-danger">{formik.errors.presidingOfficerNameNotes}</div>
                                    ) : null}
                                </div>

                              {/* Designation Select Field */}
<div className="mb-3">
    <label htmlFor="designationId" className="form-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
        Designation
    </label>
    <Select
        id="designationId"
        options={designations}
        onChange={(selectedOption) => formik.setFieldValue('designationId', Number(selectedOption.value))} // Convert to number
        onBlur={() => formik.setFieldTouched('designationId', true)}
        value={designations.find(option => option.value === formik.values.designationId)}
    />
    {formik.touched.designationId && formik.errors.designationId ? (
        <div className="text-danger">{formik.errors.designationId}</div>
    ) : null}
</div>


                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPresiding;
