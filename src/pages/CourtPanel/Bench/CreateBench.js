import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall';

const CreateBench = (props) => {
  

 
 
  
 
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateBenchModal"
        ref={props.open}
      >
        Launch CreateBench modal
      </button>

      <div
        className="modal fade"
        id="CreateBenchModal"
        tabIndex="-1"
        aria-labelledby="CreateBenchModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateBenchModalLabel">
                Create Bench
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBench;
