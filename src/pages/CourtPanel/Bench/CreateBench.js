import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ApiCall from "../../../Apicall/ApiCall";

const CreateBench = (props) => {
  const [branches, setBranches] = useState([]);
  const [courts, setCourts] = useState([]);
  const [presidingOfficers, setPresidingOfficers] = useState([]);
  const [officerList, setOfficerList] = useState([]);

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

  const fetchCourts = async () => {
    try {
      const response = await ApiCall({
        url: "https://localhost:44311/api/services/app/Court/GetAllCourtsItems",
        method: "GET",
      });
      if (response?.data?.result?.items) {
        setCourts(response.data.result.items);
      }
    } catch (error) {
      console.error("Failed to fetch court data:", error);
    }
  };

  const fetchPresidingOfficers = async () => {
    try {
      const response = await ApiCall({
        url: "https://localhost:44311/api/services/app/PresidingOfficer/GetAllPresidingOfficerItems",
        method: "GET",
      });
      if (response?.data?.result?.items) {
        setPresidingOfficers(response.data.result.items);
      }
    } catch (error) {
      console.error("Failed to fetch presiding officers:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchCourts();
    fetchPresidingOfficers();
  }, []);

  const formik = useFormik({
    initialValues: {
      branchId: "",
      benchCode: "",
      courtId: "",
      benchOfficerNo: 0,
      benchStartDate: "2024-10-19",
      benchEndDate: "2024-10-19",
      benchStatus: true,
      presidingOfficerId: 0,
    },
    onSubmit: async (values) => {
      const finalValues = {
        ...values,
        officerList: officerList.map((officer) => ({
          presidingOfficerId: officer.presidingOfficerId,
          presidingOfficerName: officer.presidingOfficerName,
          branchId: officer.branchId,
          branchName: officer.branchName,
          benchMainId: 0,
        })),
      };

      try {
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/Bench/Create",
          method: "POST",
          data: finalValues,
        });
        console.log("Response:", response);
        if (typeof props.onclick === "function") {
          props.onclick();
        }
        props.close.current.click();
        formik.resetForm();
      } catch (error) {
        console.error("Error creating Bench:", error);
      }
    },
  });

  const handleAddOfficer = () => {
    if (formik.values.branchId && formik.values.presidingOfficerId) {
      const officerExists = officerList.some(
        (officer) =>
          officer.presidingOfficerId === formik.values.presidingOfficerId
      );

      if (officerExists) {
        alert("This officer has already been added.");
        return;
      }

      const selectedBranch = branches.find(
        (branch) => branch.value === formik.values.branchId.toString()
      );
      const selectedOfficer = presidingOfficers.find(
        (officer) =>
          officer.value === formik.values.presidingOfficerId.toString()
      );

      const officer = {
        branchId: formik.values.branchId,
        branchName: selectedBranch
          ? selectedBranch.displayText
          : "Unknown Branch",
        presidingOfficerId: formik.values.presidingOfficerId,
        presidingOfficerName: selectedOfficer
          ? selectedOfficer.displayText
          : "Unknown Officer",
      };

      setOfficerList((prevList) => [...prevList, officer]);
    } else {
      alert("Please select both Branch and Presiding Officer.");
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateBenchModal"
        ref={props.open}
      >
        Launch Bench modal
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
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-6 mb-3">
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

                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="courtId"
                      className="form-label"
                    >
                      Select Court
                    </label>
                    <Select
                      id="courtId"
                      name="courtId"
                      options={courts}
                      getOptionLabel={(option) => option.displayText}
                      getOptionValue={(option) => option.value}
                      value={courts.find(
                        (court) => court.value === formik.values.courtId
                      )}
                      onChange={(option) => {
                        formik.setFieldValue("courtId", Number(option.value));
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Select a court"
                    />
                    {formik.errors.courtId && formik.touched.courtId ? (
                      <div className="text-danger">{formik.errors.courtId}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="benchCode"
                      className="form-label"
                    >
                      Bench Code
                    </label>
                    <input
                      id="benchCode"
                      name="benchCode"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.benchCode}
                    />
                    {formik.touched.benchCode && formik.errors.benchCode ? (
                      <div className="text-danger">
                        {formik.errors.benchCode}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="benchOfficerNo"
                      className="form-label"
                    >
                      Bench Officer No
                    </label>
                    <input
                      id="benchOfficerNo"
                      name="benchOfficerNo"
                      type="number"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.benchOfficerNo}
                    />
                    {formik.touched.benchOfficerNo &&
                    formik.errors.benchOfficerNo ? (
                      <div className="text-danger">
                        {formik.errors.benchOfficerNo}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="benchStartDate"
                      className="form-label"
                    >
                      Bench Start Date
                    </label>
                    <input
                      id="benchStartDate"
                      name="benchStartDate"
                      type="date"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.benchStartDate}
                    />
                    {formik.touched.benchStartDate &&
                    formik.errors.benchStartDate ? (
                      <div className="text-danger">
                        {formik.errors.benchStartDate}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="benchEndDate"
                      className="form-label"
                    >
                      Bench End Date
                    </label>
                    <input
                      id="benchEndDate"
                      name="benchEndDate"
                      type="date"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.benchEndDate}
                    />
                    {formik.touched.benchEndDate &&
                    formik.errors.benchEndDate ? (
                      <div className="text-danger">
                        {formik.errors.benchEndDate}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="benchStatus"
                      className="form-label"
                    >
                      Bench Status
                    </label>
                    <div className="form-check">
                      <input
                        id="benchStatus"
                        name="benchStatus"
                        type="checkbox"
                        className="form-check-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.benchStatus}
                      />
                      <label className="form-check-label" htmlFor="benchStatus">
                        Active
                      </label>
                    </div>
                    {formik.touched.benchStatus && formik.errors.benchStatus ? (
                      <div className="text-danger">
                        {formik.errors.benchStatus}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 mb-3">
                    <label
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      htmlFor="presidingOfficerId"
                      className="form-label"
                    >
                      Select Presiding Officer
                    </label>
                    <Select
                      id="presidingOfficerId"
                      name="presidingOfficerId"
                      options={presidingOfficers}
                      getOptionLabel={(option) => option.displayText}
                      getOptionValue={(option) => option.value}
                      value={presidingOfficers.find(
                        (officer) =>
                          officer.value === formik.values.presidingOfficerId
                      )}
                      onChange={(option) => {
                        formik.setFieldValue(
                          "presidingOfficerId",
                          Number(option.value)
                        );
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Select a presiding officer"
                    />
                    {formik.errors.presidingOfficerId &&
                    formik.touched.presidingOfficerId ? (
                      <div className="text-danger">
                        {formik.errors.presidingOfficerId}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleAddOfficer}
                    >
                      <i className="bi bi-plus"></i> Add
                    </button>
                  </div>
                </div>

                {officerList.length > 0 && (
                  <div className="mb-3">
                    <h5>Officer List</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Branch Name</th>
                          <th>Presiding Officer Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {officerList.map((officer, index) => (
                          <tr key={index}>
                            <td>{officer.branchName}</td>
                            <td>{officer.presidingOfficerName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

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

export default CreateBench;
