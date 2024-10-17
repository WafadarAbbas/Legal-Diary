import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ApiCall from "../../../Apicall/ApiCall";

const CreateProceding = (props) => {
  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    try {
      const response = await ApiCall({
        url: "https://localhost:44311/api/services/app/Branch/GetBranchComboboxItems",
        method: "GET",
      });
      if (response?.data?.result?.items) {
        setBranches(response.data.result.items);
      }
    } catch (error) {
      console.error("Failed to fetch branch data:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const formik = useFormik({
    initialValues: {
      branchId: "",
      branchBranchName: "",
      caseNo: "",
      caseMainNo: "",
      firstPartyName: "",  
      secondPartyName: "",  
      caseTitle: "",  
      benchCode: "",  
      caseType: "",
      previousDate: "",  
      currentDate: "", 
      nextDate: "",
      proceedingId: null,  
      proceedingName: "",
      caseStatus: false,  
      caseTransfer: false,  
      caseFinish: false,  
      courtCaseGenNo: "",  
      courtCaseGaffNo: "",
      proceedingNotes: '',   
      shortOrder: '',
    },
    onSubmit: (values) => {
      
      console.log("Form data:", values);
    },
  });

  const proceedingOptions = [
    { value: 1, label: "Proceeding 1" },
    { value: 2, label: "Proceeding 2" },
    { value: 3, label: "Proceeding 3" },
  ];
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateProcedingModal"
        ref={props.open}
      >
        Launch Create Proceding modal
      </button>

      <div
        className="modal fade"
        id="CreateProcedingModal"
        tabIndex="-1"
        aria-labelledby="CreateProcedingModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateProcedingModalLabel">
                Create Proceding
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
                <div className="row">
                  <div className="col-4 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="branchId"
                      className="form-label"
                    >
                      Select Branch
                    </label>
                    <Select
                      id="branchId"
                      name="branchId"
                      options={branches}
                      getOptionLabel={(option) => option.displayText}
                      getOptionValue={(option) => option.value}
                      value={branches.find(
                        (branch) => branch.value === formik.values.branchId
                      )}
                      onChange={(option) => {
                        formik.setFieldValue("branchId", Number(option.value));
                        formik.setFieldValue(
                          "branchBranchName",
                          option.displayText
                        );
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Select a branch"
                    />
                    {formik.errors.branchId && formik.touched.branchId ? (
                      <div className="text-danger">
                        {formik.errors.branchId}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-4 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="caseNo"
                      className="form-label"
                    >
                      Case No
                    </label>
                    <input
                      type="text"
                      id="caseNo"
                      name="caseNo"
                      className="form-control"
                      value={formik.values.caseNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.caseNo && formik.touched.caseNo ? (
                      <div className="text-danger">{formik.errors.caseNo}</div>
                    ) : null}
                  </div>

                  {/* CaseMainNo Field */}
                  <div className="col-4 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="caseMainNo"
                      className="form-label"
                    >
                      Case Main No
                    </label>
                    <input
                      type="text"
                      id="caseMainNo"
                      name="caseMainNo"
                      className="form-control"
                      value={formik.values.caseMainNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.caseMainNo && formik.touched.caseMainNo ? (
                      <div className="text-danger">
                        {formik.errors.caseMainNo}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  {/* First Party Name Field */}
                  <div className="col-3 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="firstPartyName"
                      className="form-label"
                    >
                      First Party Name
                    </label>
                    <input
                      type="text"
                      id="firstPartyName"
                      name="firstPartyName"
                      className="form-control"
                      value={formik.values.firstPartyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.firstPartyName &&
                    formik.touched.firstPartyName ? (
                      <div className="text-danger">
                        {formik.errors.firstPartyName}
                      </div>
                    ) : null}
                  </div>

                  {/* Second Party Name Field */}
                  <div className="col-3 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="secondPartyName"
                      className="form-label"
                    >
                      Second Party Name
                    </label>
                    <input
                      type="text"
                      id="secondPartyName"
                      name="secondPartyName"
                      className="form-control"
                      value={formik.values.secondPartyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.secondPartyName &&
                    formik.touched.secondPartyName ? (
                      <div className="text-danger">
                        {formik.errors.secondPartyName}
                      </div>
                    ) : null}
                  </div>

                  {/* Case Title Field */}
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="caseTitle"
                      className="form-label"
                    >
                      Case Title
                    </label>
                    <input
                      type="text"
                      id="caseTitle"
                      name="caseTitle"
                      className="form-control"
                      value={formik.values.caseTitle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.caseTitle && formik.touched.caseTitle ? (
                      <div className="text-danger">
                        {formik.errors.caseTitle}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  {/* Bench Code Field */}
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="benchCode"
                      className="form-label"
                    >
                      Bench Code
                    </label>
                    <input
                      type="text"
                      id="benchCode"
                      name="benchCode"
                      className="form-control"
                      value={formik.values.benchCode}
                      readOnly
                    />
                  </div>

                  {/* Case Type Field */}
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="caseType"
                      className="form-label"
                    >
                      Case Type
                    </label>
                    <input
                      type="text"
                      id="caseType"
                      name="caseType"
                      className="form-control"
                      value={formik.values.caseType}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mt-3">
              
                  <div className="col-2 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="previousDate"
                      className="form-label"
                    >
                      Previous Date
                    </label>
                    <input
                      type="date"
                      id="previousDate"
                      name="previousDate"
                      className="form-control"
                      value={formik.values.previousDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      
                    />
                    {formik.errors.previousDate &&
                    formik.touched.previousDate ? (
                      <div className="text-danger">
                        {formik.errors.previousDate}
                      </div>
                    ) : null}
                  </div>

             
                  <div className="col-2 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="currentDate"
                      className="form-label"
                    >
                      Current Date
                    </label>
                    <input
                      type="date"
                      id="currentDate"
                      name="currentDate"
                      className="form-control"
                      value={formik.values.currentDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.currentDate && formik.touched.currentDate ? (
                      <div className="text-danger">
                        {formik.errors.currentDate}
                      </div>
                    ) : null}
                  </div>

                  {/* Next Date Field */}
                  <div className="col-2 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="nextDate"
                      className="form-label"
                    >
                      Next Date
                    </label>
                    <input
                      type="date"
                      id="nextDate"
                      name="nextDate"
                      className="form-control"
                      value={formik.values.nextDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.nextDate && formik.touched.nextDate ? (
                      <div className="text-danger">
                        {formik.errors.nextDate}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="proceeding"
                      className="form-label"
                    >
                      Proceeding
                    </label>
                    <Select
                      id="proceeding"
                      name="proceedingId"
                      options={proceedingOptions}
                      value={
                        proceedingOptions.find(
                          (option) =>
                            option.value === formik.values.proceedingId
                        ) || null
                      }
                      onChange={(option) => {
                        formik.setFieldValue(
                          "proceedingId",
                          Number(option.value)
                        );
                        formik.setFieldValue("proceedingName", option.label);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Select a proceeding"
                    />
                    {formik.errors.proceedingId &&
                    formik.touched.proceedingId ? (
                      <div className="text-danger">
                        {formik.errors.proceedingId}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-2  mt-3 ">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="caseStatus"
                      className="form-label"
                    >
                      Case Status
                    </label>
                    <input
                      id="caseStatus"
                      name="caseStatus"
                      type="checkbox"
                      className="form-check-input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.caseStatus}
                      style={{ marginLeft: 10 }}
                    />
                  </div>

                  <div className="col-2 mt-3 ">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="caseTransfer"
                      className="form-label"
                    >
                      Case Transfer
                    </label>
                    <input
                      id="caseTransfer"
                      name="caseTransfer"
                      type="checkbox"
                      className="form-check-input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.caseTransfer}  
                      style={{ marginLeft: 10 }}
                    />
                  </div>

                  <div className="col-2 mt-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="caseFinish"
                      className="form-label"
                    >
                      Case Finish
                    </label>
                    <input
                      id="caseFinish"
                      name="caseFinish"
                      type="checkbox"
                      className="form-check-input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.caseFinish}
                     style={{ marginLeft: 10 }}
                    />
                  </div>

                  <div className="col-3 mb-3 ">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="courtCaseGenNo"
                      className="form-label"
                    >
                      Case Gen No
                    </label>
                    <input
                      id="courtCaseGenNo"
                      name="courtCaseGenNo"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courtCaseGenNo}
                    />
                    {formik.touched.courtCaseGenNo &&
                    formik.errors.courtCaseGenNo ? (
                      <div className="text-danger">
                        {formik.errors.courtCaseGenNo}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-3 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="courtCaseGaffNo"
                      className="form-label"
                    >
                      Case Gaff No
                    </label>
                    <input
                      id="courtCaseGaffNo"
                      name="courtCaseGaffNo"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courtCaseGaffNo}
                    />
                    {formik.touched.courtCaseGaffNo &&
                    formik.errors.courtCaseGaffNo ? (
                      <div className="text-danger">
                        {formik.errors.courtCaseGaffNo}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="proceedingNotes"
                      className="form-label"
                    >
                      Proceeding Notes
                    </label>
                    <textarea
                      id="proceedingNotes"
                      name="proceedingNotes"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.proceedingNotes}
                      rows={3}
                    />
                    {formik.touched.proceedingNotes &&
                    formik.errors.proceedingNotes ? (
                      <div className="text-danger">
                        {formik.errors.proceedingNotes}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="shortOrder"
                      className="form-label"
                    >
                      Short Order
                    </label>
                    <textarea
                      id="shortOrder"
                      name="shortOrder"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.shortOrder}
                      rows={3}
                    />
                    {formik.touched.shortOrder && formik.errors.shortOrder ? (
                      <div className="text-danger">
                        {formik.errors.shortOrder}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default CreateProceding;
