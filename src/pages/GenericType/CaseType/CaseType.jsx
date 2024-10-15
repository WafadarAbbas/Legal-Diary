import React, { useRef, useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useTestPanel } from '../../../Compo/TestPanelContext';
import { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter } from '../../../Compo/TestPanel';
import Footer from '../../../Compo/Footer';
import CreateCaseType from './CreateCaseType';  
import ApiCall from '../../../Apicall/ApiCall';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';  
import 'bootstrap-icons/font/bootstrap-icons.css';  
import EditCaseType from './EditCaseType';  

const CaseType = () => {
    const navigate = useNavigate();
    const createRef = useRef(null);
    const refClose = useRef(null);
    const editRef = useRef(null);  
    const editClose = useRef(null); 
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [caseTypes, setCaseTypes] = useState([]);   
    const [totalCount, setTotalCount] = useState(0);
    const [keyword, setKeyword] = useState('');   
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedCaseTypeId, setSelectedCaseTypeId] = useState(null);
    const debouncedKeyword = useRef(_.debounce((value) => setKeyword(value), 300)).current;  

    const fetchCaseTypes = async () => {
        setLoading(true); // Set loading to true before the API call
        try {
            const response = await ApiCall({
                url: `https://localhost:44311/api/services/app/CaseType/GetAll?skipCount=${skipCount}&MaxResultCount=${MaxResultCount}&Keyword=${keyword}`,
                method: 'GET',
            });

            if (response?.data?.result) {
                setCaseTypes(response.data.result.items);
                setTotalCount(response.data.result.totalCount);
            } else {
                Swal.fire('Error', 'Failed to fetch case types', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch case types', 'error');
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    useEffect(() => {
        fetchCaseTypes();
    }, [skipCount,MaxResultCount, keyword]); // Fetch when skipCount or keyword changes

    const handlePrevious = () => {
        if (skipCount > 0) {
            setSkipCount(skipCount - MaxResultCount);
        }
    };

    const handleNext = () => {
        if (skipCount + MaxResultCount < totalCount) {
            setSkipCount(skipCount + MaxResultCount);
        }
    };

    const handleEdit = (caseTypeId) => {
        setSelectedCaseTypeId(caseTypeId);
        editRef.current.click();
    };

    const deleteCaseType = async (caseTypeId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await ApiCall({
                    url: `https://localhost:44311/api/services/app/CaseType/Delete?Id=${caseTypeId}`,
                    method: 'DELETE',
                });
                Swal.fire('Deleted!', 'The case type has been deleted.', 'success');
                fetchCaseTypes(); // Refresh the case types list
            } catch (error) {
                Swal.fire('Error', 'Failed to delete the case type', 'error');
            }
        }
    };

    const fetch = () => {
 fetchCaseTypes();
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h1 className="mb-0">Case Types</h1>
            </div>

            <div className="bg-white p-3 rounded-3 border">
                <div className="row mb-3">
                    <div className="col-md-8">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                createRef.current.click();
                            }}
                        >
                            <i></i>
                            Create new
                        </button>
                    </div>
                    <div className="col-md-4 d-flex">
                        <div className="input-group">
                            <span className="input-group-text bg-primary text-white">
                                <i className="bi bi-funnel"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search case types..."
                                onChange={(e) => debouncedKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="line-separator mb-3" />

                <TestPanel>
                    <TestPanelHeader>Case Types</TestPanelHeader>
                    <TestPanelBody>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Case Type Name</th>
                                            <th>Description</th>
                                            <th>Last Modified</th>
                                            <th style={{display:'flex',justifyContent:'center'}}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {caseTypes.map(caseType => (
                                            <tr key={caseType.id}>
                                                <td>{caseType.id}</td>
                                                <td>{caseType.caseTypeName}</td>
                                                <td>{caseType.caseTypeDesciption}</td>
                                                <td>{new Date(caseType.lastModificationTime).toLocaleString()}</td>
                                                <td style={{display:'flex',justifyContent:'center'}}>
                                                <button
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() => handleEdit(caseType.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger ms-2"
                                                        onClick={() => deleteCaseType(caseType.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </TestPanelBody>
                    <TestPanelFooter>
                        <div className="d-flex justify-content-between align-items-center p-3">
                            <button
                                className="btn"
                                style={{ border: '1px solid #c9c9c9' }}
                                onClick={handlePrevious}
                                disabled={skipCount === 0}
                            >
                                <i className="bi bi-arrow-left"></i> Previous
                            </button>
                            <button
                                className="btn"
                                style={{ border: '1px solid #c9c9c9' }}
                                onClick={handleNext}
                                disabled={skipCount + MaxResultCount >= totalCount}
                            >
                                <i className="bi bi-arrow-right"></i> Next
                            </button>
                        </div>
                    </TestPanelFooter>
                </TestPanel>
            </div>
            <CreateCaseType open={createRef} close={refClose} onclick={ fetch} />  
            <EditCaseType open={editRef} close={editClose} caseTypeId={selectedCaseTypeId} onclick={ fetch} />  
            <Footer />
        </div>
    );
};

export default CaseType;
