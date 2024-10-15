import React, { useEffect, useState } from 'react';
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import Select from 'react-select';

const CreateCourt = (props) => {
  const [provinces, setProvinces] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [cities, setCities] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [forums, setForums] = useState([]);  
  const [forumCategories, setForumCategories] = useState([]);  
  const [branches, setBranches] = useState([]);
  const fetchBranches = async () => {
    try {
      const response = await ApiCall({
        url: `https://localhost:44311/api/services/app/Branch/GetBranchComboboxItems`,
        method: 'GET',
      });

      if (response?.data?.result?.items) {
        setBranches(response.data.result.items);
      } else {
        throw new Error('No branches found');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch branches', 'error');
    }
  };

 
  useEffect(() => {
    fetchBranches();
  }, []);

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

  // Fetch Forums
  const fetchForums = async () => {
    try {
      const response = await ApiCall({
        url: `https://localhost:44311/api/services/app/Forum/GetForumComboboxItems`,
        method: 'GET',
      });

      if (response?.data?.result?.items) {
        setForums(response.data.result.items);
      } else {
        throw new Error('No forums found');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch forums', 'error');
    }
  };

  // Fetch Forum Categories based on selected Forum
  const fetchForumCategories = async (forumId) => {
    try {
      const response = await ApiCall({
        url: `https://localhost:44311/api/services/app/ForumCategory/GetForumCatComboBoxItemsById?Id=${forumId}`,
        method: 'GET',
      });

      if (response?.data?.result?.items) {
        setForumCategories(response.data.result.items);
      } else {
        throw new Error('No forum categories found for the selected forum');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch forum categories', 'error');
    }
  };

  const formik = useFormik({
    initialValues: {
      provinceId: '',
      divisionId: '',
      cityId: '',
      tehsilId: '',
      forumId: '',
      forumCatId: '',  
      courtCode: '',
      branchId: '',
      courtDescription: '',  
      courtNumber: '', 
      courtReader: '',
      courtReaderNumber: '',
      courtReaderEmail: '',
      courtAhlmed: '',  
      courtAhlmedNumber: '', 
      courtAhlmedEmail: '', 
    },
    onSubmit: async (values) => {
      try {
        const response = await ApiCall({
          url: 'https://localhost:44311/api/services/app/Court/Create',
          method: 'POST',
          data: values,
        });
  
        // Check if the response indicates success
        if (response?.data?.success) {
          Swal.fire('Success', 'Court created successfully!', 'success');
        
          formik.resetForm();
          if (typeof props.onclick === "function") {
            props.onclick(); 
          }
          props.close.current.click();  
        } else {
     
          const errors = response.data.errors || {};
          const errorMessages = Object.values(errors).flat(); // Flatten the error messages
          Swal.fire('Error', errorMessages.join('\n'), 'error');
        }
      } catch (error) {
        // Handle network or other unexpected errors
        Swal.fire('Error', 'Failed to create court. Please try again later.', 'error');
      }
    },
  });

  useEffect(() => {
    fetchForums(); 
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateCourtModal"
        ref={props.open}
      >
        Launch CreateCourt modal
      </button>

      <div
        className="modal fade"
        id="CreateCourtModal"
        tabIndex="-1"
        aria-labelledby="CreateCourtModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateCourtModalLabel">
                Create Court
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
                <div className="d-flex flex-wrap mb-4">
                  {/* Province Dropdown */}
                  <div className="flex-fill me-2">
                    <label htmlFor="provinceId" className="form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      Select Province
                    </label>

<Select
  id="provinceId"
  name="provinceId"
  options={provinces}
  getOptionLabel={(option) => option.displayText}
  getOptionValue={(option) => option.value}
  onChange={(selected) => {
    const selectedProvinceId = selected ? selected.value : '';
    formik.setFieldValue('provinceId', selectedProvinceId);
    formik.setFieldValue('divisionId', '');
    formik.setFieldValue('cityId', '');
    formik.setFieldValue('tehsilId', '');
    setTehsils([]);
    setCities([]);
    if (selectedProvinceId) {
      fetchDivisions(selectedProvinceId);
    } else {
      setDivisions([]);
    }
  }}
  value={provinces.find(province => province.value === formik.values.provinceId)}
/>
                  </div>

                  {/* Division Dropdown */}
                  <div className="flex-fill me-2">
                    <label htmlFor="divisionId" className="form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      Select Division
                    </label>
                    <Select
  id="divisionId"
  name="divisionId"
  options={divisions}
  getOptionLabel={(option) => option.displayText}
  getOptionValue={(option) => option.value}
  onChange={(selected) => {
    const selectedDivisionId = selected ? selected.value : '';
    formik.setFieldValue('divisionId', selectedDivisionId);
    formik.setFieldValue('cityId', '');
    formik.setFieldValue('tehsilId', '');
    if (selectedDivisionId) {
      fetchCities(selectedDivisionId);
    } else {
      setCities([]);
    }
  }}
  value={divisions.find(division => division.value === formik.values.divisionId)}
/>

                  </div>

                  {/* City Dropdown */}
                  <div className="flex-fill me-2">
                    <label htmlFor="cityId" className="form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      Select City
                    </label>
                    <Select
  id="cityId"
  name="cityId"
  options={cities}
  getOptionLabel={(option) => option.displayText}
  getOptionValue={(option) => option.value}
  onChange={(selected) => {
    const selectedCityId = selected ? selected.value : '';
    formik.setFieldValue('cityId', selectedCityId);
    if (selectedCityId) {
      fetchTehsils(selectedCityId);
    } else {
      setTehsils([]);
    }
  }}
  value={cities.find(city => city.value === formik.values.cityId)}
/>
                  </div>

                  {/* Tehsil Dropdown */}
                  <div className="flex-fill me-2">
                    <label htmlFor="tehsilId" className="form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      Select Tehsil
                    </label>
                    <Select
  id="tehsilId"
  name="tehsilId"
  options={tehsils}
  getOptionLabel={(option) => option.displayText}
  getOptionValue={(option) => option.value}
  onChange={(selected) => formik.setFieldValue('tehsilId', selected ? selected.value : '')}
  value={tehsils.find(tehsil => tehsil.value === formik.values.tehsilId)}
/>
                  </div>
                  </div>
<hr/>
                  <div className="mb-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
  {/* Forum Dropdown */}
  <div>
    <label htmlFor="forumId" className="form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Select Forum
    </label>
    <Select
  id="forumId"
  name="forumId"
  options={forums}
  getOptionLabel={(option) => option.displayText}
  getOptionValue={(option) => option.value}
  onChange={(selected) => {
    const selectedForumId = selected ? selected.value : '';
    formik.setFieldValue('forumId', selectedForumId);
    formik.setFieldValue('forumCatId', '');
    if (selectedForumId) {
      fetchForumCategories(selectedForumId); // Fetch forum categories
    } else {
      setForumCategories([]);
    }
  }}
  value={forums.find(forum => forum.value === formik.values.forumId)}
/>
  </div>

  {/* Forum Category Dropdown */}
  <div>
    <label htmlFor="forumCatId" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Select Forum Category
    </label>
    <Select
  id="forumCatId"
  name="forumCatId"
  options={forumCategories}
  getOptionLabel={(option) => option.displayText}
  getOptionValue={(option) => option.value}
  onChange={(selected) => formik.setFieldValue('forumCatId', selected ? selected.value : '')}
  value={forumCategories.find(category => category.value === formik.values.forumCatId)}
/>
  </div>

  {/* Court Code Field */}
  <div>
    <label htmlFor="courtCode" className="form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Code
    </label>
    <input
      type="text"
      className="form-control"
      id="courtCode"
      name="courtCode"
      onChange={formik.handleChange}
      value={formik.values.courtCode}
    />
  </div>
</div>
<hr/>

<div className="mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
 
  <div>
    <label htmlFor="branchId" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Select Branch
    </label>
    <Select
  id="branchId"
  name="branchId"
  options={branches}
  getOptionLabel={(option) => option.displayText}
  getOptionValue={(option) => option.value}
  onChange={(selected) => formik.setFieldValue('branchId', selected ? selected.value : '')}
  value={branches.find(branch => branch.value === formik.values.branchId)}
/>
  </div>

  {/* Court Description Field */}
  <div>
    <label htmlFor="courtDescription" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Description
    </label>
    <input
      type="text"
      className="form-control"
      id="courtDescription"
      name="courtDescription"
      onChange={formik.handleChange}
      value={formik.values.courtDescription}
    />
  </div>

  {/* Court Number Field */}
  <div>
    <label htmlFor="courtNumber" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Number
    </label>
    <input
      type="text"
      className="form-control"
      id="courtNumber"
      name="courtNumber"
      onChange={formik.handleChange}
      value={formik.values.courtNumber}
    />
  </div>
</div>
<hr/>
<div className="mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
  {/* Court Reader Field */}
  <div>
    <label htmlFor="courtReader" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Reader
    </label>
    <input
      type="text"
      className="form-control"
      id="courtReader"
      name="courtReader"
      onChange={formik.handleChange}
      value={formik.values.courtReader}
    />
  </div>

  {/* Court Reader Number Field */}
  <div>
    <label htmlFor="courtReaderNumber" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Reader Number
    </label>
    <input
      type="text"
      className="form-control"
      id="courtReaderNumber"
      name="courtReaderNumber"
      onChange={formik.handleChange}
      value={formik.values.courtReaderNumber}
    />
  </div>

  {/* Court Reader Email Field */}
  <div>
    <label htmlFor="courtReaderEmail" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Reader Email
    </label>
    <input
      type="email"
      className="form-control"
      id="courtReaderEmail"
      name="courtReaderEmail"
      onChange={formik.handleChange}
      value={formik.values.courtReaderEmail}
    />
  </div>
</div>
<hr/>
<div className="mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
  {/* Court Ahlmed Field */}
  <div>
    <label htmlFor="courtAhlmed" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Ahlmed
    </label>
    <input
      type="text"
      className="form-control"
      id="courtAhlmed"
      name="courtAhlmed"
      onChange={formik.handleChange}
      value={formik.values.courtAhlmed}
    />
  </div>

  {/* Court Ahlmed Number Field */}
  <div>
    <label htmlFor="courtAhlmedNumber" className="form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Ahlmed Number
    </label>
    <input
      type="text"
      className="form-control"
      id="courtAhlmedNumber"
      name="courtAhlmedNumber"
      onChange={formik.handleChange}
      value={formik.values.courtAhlmedNumber}
    />
  </div>

  {/* Court Ahlmed Email Field */}
  <div>
    <label htmlFor="courtAhlmedEmail" className="form-label"  style={{ fontWeight: 'bold', fontSize: '14px' }}>
      Court Ahlmed Email
    </label>
    <input
      type="email"
      className="form-control"
      id="courtAhlmedEmail"
      name="courtAhlmedEmail"
      onChange={formik.handleChange}
      value={formik.values.courtAhlmedEmail}
    />
  </div>
</div>





                <div className="modal-footer d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
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

export default CreateCourt;
