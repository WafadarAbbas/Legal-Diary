import React, { useRef, useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter } from '../../../Compo/TestPanel';
import CreateDesignation from './CreateDesignation';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';  
import 'bootstrap-icons/font/bootstrap-icons.css';  
import EditDesignation from './EditDesignation';
import ApiCall from '../../../Apicall/ApiCall';
import Footer from '../../../Compo/Footer';
import { useTestPanel } from '../../../Compo/TestPanelContext';
 
const Designation = () => {
    const navigate = useNavigate();
    const createRef = useRef(null);
    const refClose = useRef(null);
    const editRef = useRef(null);  
    const editClose = useRef(null); 
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [keyword, setKeyword] = useState('');   
    const debouncedKeyword = useRef(_.debounce((value) => setKeyword(value), 300)).current; 
    const [designations, setDesignations] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [selectedDesignationId, setSelectedDesignationId] = useState(null); // State for selected designation ID
 
    const fetchDesignations = async () => {
        setLoading(true);  
        try {
            const response = await ApiCall({
                url: `https://localhost:44311/api/services/app/Designation/GetAll?skipCount=${skipCount}&MaxResultCount=${MaxResultCount}&Keyword=${keyword}`,
                method: 'GET',
            });

            if (response?.data?.result) {
                setDesignations(response.data.result.items);
                setTotalCount(response.data.result.totalCount);
            } else {
                Swal.fire('Error', 'Failed to fetch designations', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch designations', 'error');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchDesignations(); 
    }, [skipCount, MaxResultCount, keyword]);

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

    const handleClick = () => {
        refClose.current.click();
    };

    const fetch = () => {
        fetchDesignations();
    };

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
    
        if (confirmDelete.isConfirmed) {
            try {
                await ApiCall({
                    url: `https://localhost:44311/api/services/app/Designation/Delete?Id=${id}`,
                    method: 'DELETE',
                });
                Swal.fire('Deleted!', 'Your designation has been deleted.', 'success');
                fetchDesignations(); // Refresh the list after deletion
            } catch (error) {
                Swal.fire('Error', 'Failed to delete designation', 'error');
            }
        }
    };

     
    const handleEdit = (designationId) => {
        setSelectedDesignationId(designationId);  
        editRef.current.click(); 
    };
 
 const currentCount = Math.min(skipCount + MaxResultCount, totalCount);
 const remainingCount = totalCount - currentCount;
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h1 className="mb-0">Designation</h1>
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
                                placeholder="Search Designation..."
                                onChange={(e) => debouncedKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="line-separator mb-3" />

                <TestPanel>
                    <TestPanelHeader>Designation</TestPanelHeader>
                    <TestPanelBody>
                        {loading ? (
                            <div>Loading...</div>  
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Designation Name</th>
                                            <th>Notes</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {designations.length > 0 ? (
                                            designations.map((designation) => (
                                                <tr key={designation.id}>
                                                    <td>{designation.id}</td>
                                                    <td>{designation.designationName}</td>
                                                    <td>{designation.designationNotes}</td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-warning me-2"
                                                            onClick={() => handleEdit(designation.id)} // Open edit modal
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>  
                                                        </button>
                                                        <button 
                                                            className="btn btn-danger"
                                                            onClick={() => handleDelete(designation.id)}
                                                            title="Delete"
                                                        >
                                                            <i className="bi bi-trash"></i>  
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">No designations found</td>
                                            </tr>
                                        )}
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
                            <div>
                                {Math.min(skipCount + 1, totalCount)} - {currentCount} / {totalCount} Designations
                            </div>
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
            <CreateDesignation open={createRef} close={refClose} onclick={fetch} />
            <EditDesignation open={editRef} close={editClose} designationId={selectedDesignationId} onclick={fetch} /> {/* Pass selected designation ID to edit modal */}
            <Footer />
        </div>
    );
};

export default Designation;
