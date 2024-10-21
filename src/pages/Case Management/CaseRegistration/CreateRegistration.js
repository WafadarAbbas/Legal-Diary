import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ApiCall from "../../../Apicall/ApiCall";

const CreateRegistration = (props) => {
  const [branches, setBranches] = useState([]);
  const [caseTypes, setCaseTypes] = useState([]);
  const [firstLitigantTypes, setFirstLitigantTypes] = useState([]);
  const [secondLitigantTypes, setSecondLitigantTypes] = useState([]);

  useEffect(() => {
    const fetchFirstLitigantTypes = async () => {
      try {
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/LitigantType/GetLitigantTypePlantiffComboBoxItems",
          method: "GET",
        });
        const firstLitigantData = response.data.result.items.map((item) => ({
          value: Number(item.value),
          label: item.displayText,
        }));
        setFirstLitigantTypes(firstLitigantData);
      } catch (error) {
        console.error("Error fetching first litigant types:", error);
      }
    };

    fetchFirstLitigantTypes();
  }, []);

  useEffect(() => {
    const fetchSecondLitigantTypes = async () => {
      try {
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/LitigantType/GetLitigantTypeDefandantComboBoxItems",
          method: "GET",
        });
        const secondLitigantData = response.data.result.items.map((item) => ({
          value: Number(item.value),
          label: item.displayText,
        }));
        setSecondLitigantTypes(secondLitigantData);
      } catch (error) {
        console.error("Error fetching second litigant types:", error);
      }
    };

    fetchSecondLitigantTypes();
  }, []);

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

  const fetchCaseTypes = async () => {
    try {
      const response = await ApiCall({
        url: "https://localhost:44311/api/services/app/CaseType/GetAllCaseTypeComboboxItem",
        method: "GET",
      });
      if (response?.data?.result?.items) {
        setCaseTypes(response.data.result.items);
      }
    } catch (error) {
      console.error("Failed to fetch case types:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchCaseTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      branchId: null,
      branchBranchName: "",
      bStartDate: "",
      bEndDate: "",
      lStartDate: "",
      lEndDate: "",
      caseTypeId: null,
      caseTypeCaseTypeName: "",
      caseRegDate: "",
      caseStartDate: "",
      caseEndDate: "",
      firstPartyName: "",
      firstLawyerName: "",
      firNo: "",
      secondPartyName: "",
      secondLawyerName: "",
      offence: "",
      firstLitigantTypeId: null,
      litigantType1LitigantTypeName: "",
      secfirstLitigantTypeId: null,
      litigantType2LitigantTypeName: "",
      caseStatus: false,
      caseShift: false,
      caseFinish: false,
      firDate: "",
      policeStation: "",
      courtCaseGenNo: "",
      courtCaseGaffNo: "",
      caseNotes: "",
      casePleadings: "",
      caseBenchStatus: false,
      bNotes: "",
      caseLawyerStatus: false,
      lNotes: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateRegistrationModal"
        ref={props.open}
      >
        Launch CreateRegistration modal
      </button>

      <div
        className="modal fade"
        id="CreateRegistrationModal"
        tabIndex="-1"
        aria-labelledby="CreateRegistrationModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateRegistrationModalLabel">
                Create Registration
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
                <ul className="nav nav-pills" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="case-registration-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#case-registration"
                      type="button"
                      role="tab"
                      aria-controls="case-registration"
                      aria-selected="true"
                      style={{ fontSize: 14 }}
                    >
                      Case Registration
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="case-bench-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#case-bench"
                      type="button"
                      role="tab"
                      aria-controls="case-bench"
                      aria-selected="false"
                      style={{ fontSize: 14 }}
                    >
                      Case Bench
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="case-lawyer-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#case-lawyer"
                      type="button"
                      role="tab"
                      aria-controls="case-lawyer"
                      aria-selected="false"
                      style={{ fontSize: 14 }}
                    >
                      Case Lawyer
                    </button>
                  </li>
                </ul>

                {/* Tab panes */}
                <div className="tab-content mt-3" id="myTabContent">
                  <div
                    className="tab-pane fade show active border p-3"
                    id="case-registration"
                    role="tabpanel"
                    aria-labelledby="case-registration-tab"
                  >
                    <div className="row ">
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
                            formik.setFieldValue(
                              "branchId",
                              Number(option.value)
                            );
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
                        <div className="d-flex justify-content-between">
                          <label
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                            htmlFor="caseTypeId"
                            className="form-label"
                          >
                            Select Case Type
                          </label>
                        </div>
                        <Select
                          id="caseTypeId"
                          name="caseTypeId"
                          options={caseTypes}
                          getOptionLabel={(option) => option.displayText}
                          getOptionValue={(option) => option.value}
                          value={caseTypes.find(
                            (type) => type.value === formik.values.caseTypeId
                          )}
                          onChange={(option) => {
                            formik.setFieldValue(
                              "caseTypeId",
                              Number(option.value)
                            );
                            formik.setFieldValue(
                              "caseTypeCaseTypeName",
                              option.displayText
                            );
                          }}
                          onBlur={formik.handleBlur}
                          placeholder="Select a case type"
                        />
                        {formik.errors.caseTypeId &&
                        formik.touched.caseTypeId ? (
                          <div className="text-danger">
                            {formik.errors.caseTypeId}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-4 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="caseRegDate"
                          className="form-label"
                        >
                          Case Registration Date
                        </label>
                        <input
                          id="caseRegDate"
                          name="caseRegDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.caseRegDate}
                        />
                        {formik.touched.caseRegDate &&
                        formik.errors.caseRegDate ? (
                          <div className="text-danger">
                            {formik.errors.caseRegDate}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-4 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="caseStartDate"
                          className="form-label"
                        >
                          Case Start Date
                        </label>
                        <input
                          id="caseStartDate"
                          name="caseStartDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.caseStartDate}
                        />
                        {formik.touched.caseStartDate &&
                        formik.errors.caseStartDate ? (
                          <div className="text-danger">
                            {formik.errors.caseStartDate}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-4 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="caseEndDate"
                          className="form-label"
                        >
                          Case End Date
                        </label>
                        <input
                          id="caseEndDate"
                          name="caseEndDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.caseEndDate}
                        />
                        {formik.touched.caseEndDate &&
                        formik.errors.caseEndDate ? (
                          <div className="text-danger">
                            {formik.errors.caseEndDate}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-3 mb-3">
                        <label
                          htmlFor="firstLitigantTypeId"
                          className="form-label"
                        >
                          Select First Litigant Type
                        </label>
                        <Select
                          id="firstLitigantTypeId"
                          name="firstLitigantTypeId"
                          options={firstLitigantTypes}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          value={firstLitigantTypes.find(
                            (type) =>
                              type.value === formik.values.firstLitigantTypeId
                          )}
                          onChange={(option) => {
                            formik.setFieldValue(
                              "firstLitigantTypeId",
                              option.value
                            );
                            formik.setFieldValue(
                              "litigantType1LitigantTypeName",
                              option.label
                            );
                          }}
                          onBlur={formik.handleBlur}
                          placeholder="Select a first litigant type"
                        />
                        {formik.touched.firstLitigantTypeId &&
                        formik.errors.firstLitigantTypeId ? (
                          <div className="text-danger">
                            {formik.errors.firstLitigantTypeId}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="firstPartyName"
                          className="form-label"
                        >
                          First Party Name
                        </label>
                        <input
                          id="firstPartyName"
                          name="firstPartyName"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstPartyName}
                        />
                        {formik.touched.firstPartyName &&
                        formik.errors.firstPartyName ? (
                          <div className="text-danger">
                            {formik.errors.firstPartyName}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="firstLawyerName"
                          className="form-label"
                        >
                          First Lawyer Name
                        </label>
                        <input
                          id="firstLawyerName"
                          name="firstLawyerName"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstLawyerName}
                        />
                        {formik.touched.firstLawyerName &&
                        formik.errors.firstLawyerName ? (
                          <div className="text-danger">
                            {formik.errors.firstLawyerName}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="firNo"
                          className="form-label"
                        >
                          FIR No
                        </label>
                        <input
                          id="firNo"
                          name="firNo"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firNo}
                        />
                        {formik.touched.firNo && formik.errors.firNo ? (
                          <div className="text-danger">
                            {formik.errors.firNo}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-3 mb-3">
                        <label
                          htmlFor="secLitigantTypeId"
                          className="form-label"
                        >
                          Select Second Litigant Type
                        </label>
                        <Select
                          id="secLitigantTypeId"
                          name="secLitigantTypeId"
                          options={secondLitigantTypes}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          value={secondLitigantTypes.find(
                            (type) =>
                              type.value === formik.values.secLitigantTypeId
                          )}
                          onChange={(option) => {
                            formik.setFieldValue(
                              "secLitigantTypeId",
                              option.value
                            );
                            formik.setFieldValue(
                              "litigantType2LitigantTypeName",
                              option.label
                            );
                          }}
                          onBlur={formik.handleBlur}
                          placeholder="Select a second litigant type"
                        />
                        {formik.touched.secLitigantTypeId &&
                        formik.errors.secLitigantTypeId ? (
                          <div className="text-danger">
                            {formik.errors.secLitigantTypeId}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="secondPartyName"
                          className="form-label"
                        >
                          Second Party Name
                        </label>
                        <input
                          id="secondPartyName"
                          name="secondPartyName"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.secondPartyName}
                        />
                        {formik.touched.secondPartyName &&
                        formik.errors.secondPartyName ? (
                          <div className="text-danger">
                            {formik.errors.secondPartyName}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="secondLawyerName"
                          className="form-label"
                        >
                          Second Lawyer Name
                        </label>
                        <input
                          id="secondLawyerName"
                          name="secondLawyerName"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.secondLawyerName}
                        />
                        {formik.touched.secondLawyerName &&
                        formik.errors.secondLawyerName ? (
                          <div className="text-danger">
                            {formik.errors.secondLawyerName}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="offence"
                          className="form-label"
                        >
                          Offence
                        </label>
                        <input
                          id="offence"
                          name="offence"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.offence}
                        />
                        {formik.touched.offence && formik.errors.offence ? (
                          <div className="text-danger">
                            {formik.errors.offence}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-1 mb-3">
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
                        />
                      </div>

                      <div className="col-1 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="caseShift"
                          className="form-label"
                        >
                          Case Shift
                        </label>
                        <input
                          id="caseShift"
                          name="caseShift"
                          type="checkbox"
                          className="form-check-input"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.caseShift}
                        />
                      </div>

                      <div className="col-1 mb-3">
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
                        />
                      </div>

                      <div className="col-2 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="firDate"
                          className="form-label"
                        >
                          FIR Date
                        </label>
                        <input
                          id="firDate"
                          name="firDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firDate}
                        />
                        {formik.touched.firDate && formik.errors.firDate ? (
                          <div className="text-danger">
                            {formik.errors.firDate}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-2 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="policeStation"
                          className="form-label"
                        >
                          Police Station
                        </label>
                        <input
                          id="policeStation"
                          name="policeStation"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.policeStation}
                        />
                        {formik.touched.policeStation &&
                        formik.errors.policeStation ? (
                          <div className="text-danger">
                            {formik.errors.policeStation}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-2 mb-3">
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

                      <div className="col-2 mb-3">
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
                          htmlFor="caseNotes"
                          className="form-label"
                        >
                          Case Notes
                        </label>
                        <textarea
                          id="caseNotes"
                          name="caseNotes"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.caseNotes}
                          rows={2}
                        />
                        {formik.touched.caseNotes && formik.errors.caseNotes ? (
                          <div className="text-danger">
                            {formik.errors.caseNotes}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-6 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="casePleadings"
                          className="form-label"
                        >
                          Case Pleadings
                        </label>
                        <textarea
                          id="casePleadings"
                          name="casePleadings"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.casePleadings}
                          rows={2}
                        />
                        {formik.touched.casePleadings &&
                        formik.errors.casePleadings ? (
                          <div className="text-danger">
                            {formik.errors.casePleadings}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade border p-3"
                    id="case-bench"
                    role="tabpanel"
                    aria-labelledby="case-bench-tab"
                  >
                    <div className="row mb-3">
                      <div className="col-4 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="bStartDate"
                          className="form-label"
                        >
                          Bench Start Date
                        </label>
                        <input
                          id="bStartDate"
                          name="bStartDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.bStartDate}
                        />
                        {formik.touched.bStartDate &&
                        formik.errors.bStartDate ? (
                          <div className="text-danger">
                            {formik.errors.bStartDate}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-4 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="bEndDate"
                          className="form-label"
                        >
                          Bench End Date
                        </label>
                        <input
                          id="bEndDate"
                          name="bEndDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.bEndDate}
                        />
                        {formik.touched.bEndDate && formik.errors.bEndDate ? (
                          <div className="text-danger">
                            {formik.errors.bEndDate}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-3">
                        <div className="form-check">
                          <input
                            id="caseBenchStatus"
                            name="caseBenchStatus"
                            type="checkbox"
                            className="form-check-input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.caseBenchStatus}
                          />
                          <label
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                            htmlFor="caseBenchStatus"
                            className="form-check-label"
                          >
                            Case Bench Status
                          </label>
                        </div>
                      </div>

                      <div className="col-9">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="bNotes"
                          className="form-label"
                        >
                          Bench Notes
                        </label>
                        <textarea
                          id="bNotes"
                          name="bNotes"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.bNotes}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade border p-3"
                    id="case-lawyer"
                    role="tabpanel"
                    aria-labelledby="case-lawyer-tab"
                  >
                    <div className="row mb-3">
                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="lStartDate"
                          className="form-label"
                        >
                          Lawyer Start Date
                        </label>
                        <input
                          id="lStartDate"
                          name="lStartDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lStartDate}
                        />
                        {formik.touched.lStartDate &&
                        formik.errors.lStartDate ? (
                          <div className="text-danger">
                            {formik.errors.lStartDate}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-3 mb-3">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="lEndDate"
                          className="form-label"
                        >
                          Lawyer End Date
                        </label>
                        <input
                          id="lEndDate"
                          name="lEndDate"
                          type="date"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lEndDate}
                        />
                        {formik.touched.lEndDate && formik.errors.lEndDate ? (
                          <div className="text-danger">
                            {formik.errors.lEndDate}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-3">
                        <div className="form-check">
                          <input
                            id="caseLawyerStatus"
                            name="caseLawyerStatus"
                            type="checkbox"
                            className="form-check-input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.caseLawyerStatus}
                          />
                          <label
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                            htmlFor="caseLawyerStatus"
                            className="form-check-label"
                          >
                            Case Lawyer Status
                          </label>
                        </div>
                      </div>

                      <div className="col-9">
                        <label
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          htmlFor="lNotes"
                          className="form-label"
                        >
                          Lawyer Notes
                        </label>
                        <textarea
                          id="lNotes"
                          name="lNotes"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lNotes}
                          rows={3}
                        />
                      </div>
                    </div>
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

export default CreateRegistration;
