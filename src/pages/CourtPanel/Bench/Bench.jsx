import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useTestPanel } from '../../../Compo/TestPanelContext';
import { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter } from '../../../Compo/TestPanel';
import CreateBench from './CreateBench';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import 'bootstrap-icons/font/bootstrap-icons.css';
import EditBench from './EditBench';
import Footer from '../../../Compo/Footer';
import ApiCall from '../../../Apicall/ApiCall';


const Bench = () => {
    const navigate = useNavigate();
    const createRef = useRef(null);
    const refClose = useRef(null);
    const editRef = useRef(null);
    const editClose = useRef(null);
    const [benches, setBenches] = useState([]);
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [selectedBenchId, setSelectedBenchId] = useState(null);
    const debouncedKeyword = useRef(_.debounce((value) => setKeyword(value), 300)).current;


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

    const handleEditClick = (id) => {
        setSelectedBenchId(id);
        editRef.current.click();
    };

   
        const fetchBenches = async () => {
            try {
                const response = await ApiCall({
                    url: "https://localhost:44311/api/services/app/Bench/GetAllbenchMainData",
                    method: "GET",
                });

                if (response?.data?.result?.items) {
                    setBenches(response.data.result.items);
                    setTotalCount(response.data.result.totalCount); 
                }
            } catch (error) {
                console.error("Failed to fetch bench data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch bench data.',
                });
            }
        };

        useEffect(() => {
               fetchBenches();
    }, []);

    const fetch = () => {
        fetchBenches();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h1 className="mb-0">Bench</h1>
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
                                placeholder="Search Bench..."
                                onChange={(e) => debouncedKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="line-separator mb-3" />

                <TestPanel>
                    <TestPanelHeader>Bench</TestPanelHeader>
                    <TestPanelBody>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Bench Code</th>
                                        <th>Bench Judges No</th>
                                        <th>Branch Name</th>
                                        <th>Court Code</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {benches.map((bench) => (
                                        <tr key={bench.id}>
                                            <td>{bench.id}</td>
                                            <td>{bench.benchCode}</td>
                                            <td>{bench.benchOfficerNo}</td>
                                            <td>{bench.branchBranchName}</td>
                                            <td>{bench.courtCourtCode}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => handleEditClick(bench.id)} 
                                                >
                                                    <i className="bi bi-pencil"></i> Edit
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
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
            <CreateBench open={createRef} close={refClose} onclick={fetch} />
            <EditBench open={editRef} close={editClose} id={selectedBenchId}  onclick={fetch} />
            <Footer />
        </div>
    );
};

export default Bench;
