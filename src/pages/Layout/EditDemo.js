import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ApiCall from '../../Apicall/ApiCall';
import * as Yup from 'yup';

const EditDemo = (props) => {

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#EditDemoModal"
                ref={props.open}
            >
                Launch edit modal
            </button>

            <div
                className="modal fade"
                id="EditDemoModal"
                tabIndex="-1"
                aria-labelledby="EditDemoModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EditDemoModalLabel">
                                Edit Demo
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

export default EditDemo;
