import React, { useRef, useState, useEffect, useCallback } from 'react';
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
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [keyword, setKeyword] = useState('');   
   
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
                                         
                                    </tr>
                                </thead>
                                <tbody>
                               
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
            <CreateBench open={createRef} close={refClose}  />
            <EditBench   open={editRef} close={editClose} />
            <Footer />
        </div>
    );
};

export default Bench;
