import React, { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTestPanel } from '../../../Compo/TestPanelContext';
import { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter } from '../../../Compo/TestPanel';
import CreateCourt from './CreateCourt';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import 'bootstrap-icons/font/bootstrap-icons.css';
import EditCourt from './EditCourt';
import Footer from '../../../Compo/Footer';
import ApiCall from '../../../Apicall/ApiCall';

const Court = () => {
    const navigate = useNavigate();
    const createRef = useRef(null);
    const refClose = useRef(null);
    const editRef = useRef(null);
    const editClose = useRef(null);
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [courts, setCourts] = useState([]);
    const [keyword, setKeyword] = useState('');

    const debouncedKeyword = useRef(_.debounce((value) => setKeyword(value), 300)).current;

    const fetchCourts = async () => {
        try {
            const response = await ApiCall({
                url: `https://localhost:44311/api/services/app/Court/GetAll`,
                method: 'GET',
                params: {
                    SkipCount: skipCount,
                    MaxResultCount: MaxResultCount,
                    Keyword: keyword,
                }
            });
            if (response?.data?.result) {
                setCourts(response.data.result.items);
                setTotalCount(response.data.result.totalCount);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch court data', 'error');
        }
    };

    useEffect(() => {
        fetchCourts();
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
        fetchCourts();
    };

    const handleDelete = async (courtId) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            try {
                await ApiCall({
                    url: `https://localhost:44311/api/services/app/Court/Delete?Id=${courtId}`,
                    method: 'DELETE',
                });
                Swal.fire('Deleted!', 'The court has been deleted.', 'success');
                fetchCourts(); // Refresh the court list
            } catch (error) {
                Swal.fire('Error', 'Failed to delete the court.', 'error');
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h1 className="mb-0">Court</h1>
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
                            <i className="bi bi-plus"></i> Create new
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
                                placeholder="Search Court..."
                                onChange={(e) => debouncedKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="line-separator mb-3" />

                <TestPanel>
                    <TestPanelHeader>Court</TestPanelHeader>
                    <TestPanelBody>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Court Code</th>
                                        <th>Court Description</th>
                                        <th>Court Number</th>
                                        <th>Province</th>
                                        <th>City</th>
                                        <th>Tehsil</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courts.length > 0 ? (
                                        courts.map((court, index) => (
                                            <tr key={index}>
                                                <td>{court.id}</td>
                                                <td>{court.courtCode}</td>
                                                <td>{court.courtDescription}</td>
                                                <td>{court.courtNumber}</td>
                                                <td>{court.provinceProvinceName}</td>
                                                <td>{court.cityCityName}</td>
                                                <td>{court.tehsilTehsilName}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(court.id)} // Call the handleDelete function
                                                    >
                                                        <i className="bi bi-trash"></i> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No courts found</td>
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
            <CreateCourt open={createRef} close={refClose} onclick={fetch} />
            <EditCourt open={editRef} close={editClose} />
            <Footer />
        </div>
    );
};

export default Court;
