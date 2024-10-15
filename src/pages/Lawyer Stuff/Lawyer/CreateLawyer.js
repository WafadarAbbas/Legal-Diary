import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import ApiCall from '../../../Apicall/ApiCall';
import Select from 'react-select';  
import Swal from 'sweetalert2';


const CreateLawyer = (props) => {
  const [branches, setBranches] = useState([]);
  const [specialties, setSpecialties] = useState([]); 
  const [provinces, setProvinces] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [cities, setCities] = useState([]);
  const [tehsils, setTehsils] = useState([]);

 
    const fetchBranches = async () => {
      try {
        const response = await ApiCall({
          url: 'https://localhost:44311/api/services/app/Branch/GetBranchComboboxItems',
          method: 'GET',
        });
        if (response?.data?.result?.items) {
          setBranches(response.data.result.items);
        }
      } catch (error) {
        console.error('Failed to fetch branch data:', error);
      }
    };
    const fetchSpecialties = async () => {
      try {
        const response = await ApiCall({
          url: 'https://localhost:44311/api/services/app/Lawyer/GetLawyerSpeacialityListItems',
          method: 'GET',
        });
        if (response?.data?.result?.items) {
          setSpecialties(response.data.result.items);
        }
      } catch (error) {
        console.error('Failed to fetch specialty data:', error);
      }
    };

    useEffect(() => {
      const fetchProvinces = async () => {
        try {
          const response = await ApiCall({
            url: `https://localhost:44311/api/services/app/Province/GetProvinceItems`,
            method: 'GET',
          });
  
          if (response?.data?.result?.items) {
            setProvinces(response.data.result.items);
          } else {
            throw new Error('No provinces found');
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to fetch provinces', 'error');
        }
      };
  
      fetchProvinces();
    }, []);
  
    const fetchDivisions = async (provinceId) => {
      try {
        const response = await ApiCall({
          url: `https://localhost:44311/api/services/app/Division/GetDivisionComboboxItemsById?Id=${provinceId}`,
          method: 'GET',
        });
  
        if (response?.data?.result?.items) {
          setDivisions(response.data.result.items);
        } else {
          throw new Error('No divisions found for the selected province');
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch divisions', 'error');
      }
    };
  
    const fetchCities = async (divisionId) => {
      try {
        const response = await ApiCall({
          url: `https://localhost:44311/api/services/app/City/GetCityComboboxItemsById?Id=${divisionId}`,
          method: 'GET',
        });
  
        if (response?.data?.result?.items) {
          setCities(response.data.result.items);
        } else {
          throw new Error('No cities found for the selected division');
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch cities', 'error');
      }
    };
  
    const fetchTehsils = async (cityId) => {
      try {
        const response = await ApiCall({
          url: `https://localhost:44311/api/services/app/Tehsil/GetTehsilComboboxItemsById?Id=${cityId}`,
          method: 'GET',
        });
  
        if (response?.data?.result?.items) {
          setTehsils(response.data.result.items);
        } else {
          throw new Error('No tehsils found for the selected city');
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch tehsils', 'error');
      }
    };
  
    useEffect(() => {
      fetchBranches();
    fetchSpecialties();
  }, []);
  
  const formik = useFormik({
    initialValues: {
      lawyerLiscene: '',
      lawyerAdress: '',
      lawyerNotes: '',
      lawyerPracticingBar: '',
      lawyerLicRegDate: '',
      lawyerLicExpDate: '',
      lawyerFirmRegDate: '',
      lawyerResigDate: '',
      lawyerPhotoPath: null,
      lawyerStatus: false,
      branchId: '',
      lawyerSpeacialityId: '',
      lawyerName: '',
      lawyerMobile: '',
      provinceId: '',
      divisionId: '',
      cityId: '',
      tehsilId: '',
    },
    validationSchema: Yup.object({
      // lawyerLiscene: Yup.string().required('License No is required'),
      // lawyerAdress: Yup.string().required('Address is required'),
      // lawyerNotes: Yup.string(),
      // lawyerPracticingBar: Yup.string().required('Practicing Bar is required'),
      // lawyerName: Yup.string().required('Lawyer Name is required'),
      // lawyerMobile: Yup.string().required('Lawyer Mobile is required'),
      // provinceId: Yup.string().required('Province is required'),
      // divisionId: Yup.string().required('Division is required'),
      // cityId: Yup.string().required('City is required'),
      // tehsilId: Yup.string().required('Tehsil is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
    
    },
  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateLawyerModal"
        ref={props.open}
      >
        Launch CreateLawyer modal
      </button>

      <div
        className="modal fade"
        id="CreateLawyerModal"
        tabIndex="-1"
        aria-labelledby="CreateLawyerModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateLawyerModalLabel">
                Create Lawyer
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
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="branchId" className="form-label">Select Branch</label>
                    <Select
                      id="branchId"
                      name="branchId"
                      options={branches}
                      getOptionLabel={(option) => option.displayText}
                      getOptionValue={(option) => option.value}
                      value={branches.find(branch => branch.value === formik.values.branchId)}
                      onChange={(option) => {
                        formik.setFieldValue('branchId', option.value);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Select a branch"
                    />
                    {formik.errors.branchId && formik.touched.branchId ? (
                      <div className="text-danger">{formik.errors.branchId}</div>
                    ) : null}
                  </div>


                  <div className="col-md-3">
    <label htmlFor="lawyerSpeacialityId" className="form-label">Select Specialty</label>
    <Select
      id="lawyerSpeacialityId"
      name="lawyerSpeacialityId"
      options={specialties.map(specialty => ({
        value: specialty.value,
        label: specialty.displayText,
      }))}
      onChange={option => formik.setFieldValue('lawyerSpeacialityId', option.value)}
      onBlur={formik.handleBlur}
    />
    {formik.errors.lawyerSpeacialityId && formik.touched.lawyerSpeacialityId ? (
      <div className="text-danger">{formik.errors.lawyerSpeacialityId}</div>
    ) : null}
  </div>
  <div className="col-md-3 mb-3">
    <label htmlFor="lawyerName" className="form-label">Lawyer Name</label>
    <input
      id="lawyerName"
      name="lawyerName"
      type="text"
      className="form-control"
      value={formik.values.lawyerName}
      onChange={formik.handleChange}
    />
    {formik.errors.lawyerName && formik.touched.lawyerName ? (
      <div className="text-danger">{formik.errors.lawyerName}</div>
    ) : null}
  </div>

  <div className="col-md-3 mb-3">
    <label htmlFor="lawyerMobile" className="form-label">Lawyer Mobile</label>
    <input
      id="lawyerMobile"
      name="lawyerMobile"
      type="text"
      className="form-control"
      value={formik.values.lawyerMobile}
      onChange={formik.handleChange}
    />
    {formik.errors.lawyerMobile && formik.touched.lawyerMobile ? (
      <div className="text-danger">{formik.errors.lawyerMobile}</div>
    ) : null}
  </div>

                </div>


                <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="provinceId" className="form-label">Province</label>
            <Select
              id="provinceId"
              name="provinceId"
              options={provinces.map(province => ({
                value: province.value,
                label: province.displayText,
              }))}
              onChange={(option) => {
                formik.setFieldValue('provinceId', option.value);
                fetchDivisions(option.value); 
              }}
              onBlur={formik.handleBlur}
            />
            {formik.errors.provinceId && formik.touched.provinceId ? (
              <div className="text-danger">{formik.errors.provinceId}</div>
            ) : null}
          </div>

          <div className="col-md-3">
            <label htmlFor="divisionId" className="form-label">Division</label>
            <Select
              id="divisionId"
              name="divisionId"
              options={divisions.map(division => ({
                value: division.value,
                label: division.displayText,
              }))}
              onChange={(option) => {
                formik.setFieldValue('divisionId', option.value);
                fetchCities(option.value); 
              }}
              onBlur={formik.handleBlur}
            />
            {formik.errors.divisionId && formik.touched.divisionId ? (
              <div className="text-danger">{formik.errors.divisionId}</div>
            ) : null}
          </div>

          <div className="col-md-3">
            <label htmlFor="cityId" className="form-label">City</label>
            <Select
              id="cityId"
              name="cityId"
              options={cities.map(city => ({
                value: city.value,
                label: city.displayText,
              }))}
              onChange={(option) => {
                formik.setFieldValue('cityId', option.value);
                fetchTehsils(option.value); 
              }}
              onBlur={formik.handleBlur}
            />
            {formik.errors.cityId && formik.touched.cityId ? (
              <div className="text-danger">{formik.errors.cityId}</div>
            ) : null}
          </div>

          <div className="col-md-3">
            <label htmlFor="tehsilId" className="form-label">Tehsil</label>
            <Select
              id="tehsilId"
              name="tehsilId"
              options={tehsils.map(tehsil => ({
                value: tehsil.value,
                label: tehsil.displayText,
              }))}
              onChange={(option) => formik.setFieldValue('tehsilId', option.value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.tehsilId && formik.touched.tehsilId ? (
              <div className="text-danger">{formik.errors.tehsilId}</div>
            ) : null}
          </div>
        </div>

                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerLiscene" className="form-label">License No</label>
                    <input
                      id="lawyerLiscene"
                      name="lawyerLiscene"
                      type="text"
                      className="form-control"
                      value={formik.values.lawyerLiscene}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lawyerLiscene && formik.touched.lawyerLiscene ? (
                      <div className="text-danger">{formik.errors.lawyerLiscene}</div>
                    ) : null}
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerAdress" className="form-label">Address</label>
                    <input
                      id="lawyerAdress"
                      name="lawyerAdress"
                      type="text"
                      className="form-control"
                      value={formik.values.lawyerAdress}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lawyerAdress && formik.touched.lawyerAdress ? (
                      <div className="text-danger">{formik.errors.lawyerAdress}</div>
                    ) : null}
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerNotes" className="form-label">Notes</label>
                    <textarea
                      id="lawyerNotes"
                      name="lawyerNotes"
                      className="form-control"
                      rows="1"
                      style={{ overflow: 'hidden' }}
                      value={formik.values.lawyerNotes}
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerPracticingBar" className="form-label">Practicing Bar</label>
                    <textarea
                      id="lawyerPracticingBar"
                      name="lawyerPracticingBar"
                      className="form-control"
                      rows="1"
                      style={{ overflow: 'hidden' }}
                      value={formik.values.lawyerPracticingBar}
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                    />
                    {formik.errors.lawyerPracticingBar && formik.touched.lawyerPracticingBar ? (
                      <div className="text-danger">{formik.errors.lawyerPracticingBar}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerLicRegDate" className="form-label">Lic Reg Date</label>
                    <input
                      id="lawyerLicRegDate"
                      name="lawyerLicRegDate"
                      type="date"
                      className="form-control"
                      value={formik.values.lawyerLicRegDate}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerLicExpDate" className="form-label">Lic Exp Date</label>
                    <input
                      id="lawyerLicExpDate"
                      name="lawyerLicExpDate"
                      type="date"
                      className="form-control"
                      value={formik.values.lawyerLicExpDate}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerFirmRegDate" className="form-label">Firm Reg Date</label>
                    <input
                      id="lawyerFirmRegDate"
                      name="lawyerFirmRegDate"
                      type="date"
                      className="form-control"
                      value={formik.values.lawyerFirmRegDate}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="lawyerResigDate" className="form-label">Resignation Date</label>
                    <input
                      id="lawyerResigDate"
                      name="lawyerResigDate"
                      type="date"
                      className="form-control"
                      value={formik.values.lawyerResigDate}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                <div className="col-md-6 mb-3">
          <label htmlFor="lawyerPhotoPath" className="form-label">Choose Picture</label>
          <input
            id="lawyerPhotoPath"
            name="lawyerPhotoPath"
            type="file"
            className="form-control"
            onChange={(event) => {
              formik.setFieldValue("lawyerPhotoPath", event.currentTarget.files[0]); // Set file object
            }}
          />
        </div>



                  <div className="col-md-6 mb-3 d-flex align-items-center">
                    <div className="form-check">
                      <input
                        id="lawyerStatus"
                        name="lawyerStatus"
                        type="checkbox"
                        className="form-check-input"
                        checked={formik.values.lawyerStatus}
                        onChange={(e) => formik.setFieldValue('lawyerStatus', e.target.checked)}
                      />
                      <label htmlFor="lawyerStatus" className="form-check-label">Active</label>
                    </div>
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
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

export default CreateLawyer;
