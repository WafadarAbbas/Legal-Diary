import React, { useRef, useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter } from '../../../Compo/TestPanel';
import CreatePresiding from './CreatePresiding';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';  
import 'bootstrap-icons/font/bootstrap-icons.css';  
import EditPresiding from './EditPresiding';
import ApiCall from '../../../Apicall/ApiCall';
import Footer from '../../../Compo/Footer';
import { useTestPanel } from '../../../Compo/TestPanelContext';

const PresidingOfficer = () => {
    const navigate = useNavigate();
    const createRef = useRef(null);
    const refClose = useRef(null);
    const editRef = useRef(null);  
    const editClose = useRef(null); 
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [selectedPresidingId, setSelectedPresidingId] = useState(null);
    const [presidingOfficers, setPresidingOfficers] = useState([]); 
    const debouncedKeyword = useRef(_.debounce((value) => setKeyword(value), 300)).current;   

    const fetchPresidingOfficers = async () => {
        try {
            const response = await ApiCall({
                url: `https://localhost:44311/api/services/app/PresidingOfficer/GetAll?SkipCount=${skipCount}&MaxResultCount=${MaxResultCount}&Keyword=${keyword}`,
                method: 'GET',
            });
    
            if (response?.data?.result) {
                setPresidingOfficers(response.data.result.items);
                setTotalCount(response.data.result.totalCount);
            } else {
                Swal.fire('Error', 'Failed to fetch presiding officers', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch presiding officers', 'error');
        }
    };
    

    useEffect(() => {
        fetchPresidingOfficers();
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

    const handleEdit = (officerId) => {
        setSelectedPresidingId(officerId);  
        editRef.current.click(); 
    };
    const currentCount = Math.min(skipCount + MaxResultCount, totalCount);
    const remainingCount = totalCount - currentCount;

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
                    url: `https://localhost:44311/api/services/app/PresidingOfficer/Delete?Id=${id}`,
                    method: 'DELETE',
                });
                Swal.fire('Deleted!', 'The presiding officer has been deleted.', 'success');
                fetchPresidingOfficers();  
            } catch (error) {
                Swal.fire('Error', 'Failed to delete presiding officer', 'error');
            }
        }
    };

   const fetchofficer =()=>{
    fetchPresidingOfficers();
   }
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h1 className="mb-0">Presiding Officer</h1>
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
                                placeholder="Search Officer..."
                                onChange={(e) => debouncedKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="line-separator mb-3" />

                <TestPanel>
                    <TestPanelHeader>Presiding Officers</TestPanelHeader>
                    <TestPanelBody>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Notes</th>
                                        <th>Designation</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {presidingOfficers.length > 0 ? (
                                        presidingOfficers.map((officer) => (
                                            <tr key={officer.id}>
                                                <td>{officer.id}</td>
                                                <td>{officer.presidingOfficerName}</td>
                                                <td>{officer.presidingOfficerNameNotes}</td>
                                                <td>{officer.designationDesignationName}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-warning me-2"
                                                        onClick={() => handleEdit(officer.id)} 
                                                        title="Edit"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(officer.id)} 
                                                        title="Delete"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">No presiding officers found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
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
                                Showing [{Math.min(skipCount + 1, totalCount)}-{currentCount} of {totalCount}] Presiding Officers
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
            <CreatePresiding open={createRef} close={refClose} onclick={fetchofficer} />
            <EditPresiding open={editRef} close={editClose} officerId={selectedPresidingId} onclick={fetchofficer}/> 
        </div>
    );
};

export default PresidingOfficer;
