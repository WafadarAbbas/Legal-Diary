import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall';

const EditCourt = (props) => {

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#EditCourtModal"
                ref={props.open}
            >
                Launch edit modal
            </button>

            <div
                className="modal fade"
                id="EditCourtModal"
                tabIndex="-1"
                aria-labelledby="EditCourtModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EditCourtModalLabel">
                                Edit Court
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
                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCourt;
