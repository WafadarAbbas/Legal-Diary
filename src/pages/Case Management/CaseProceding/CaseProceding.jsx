import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter } from '../../../Compo/TestPanel';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';  
import 'bootstrap-icons/font/bootstrap-icons.css';  
import Footer from '../../../Compo/Footer';
import { useTestPanel } from '../../../Compo/TestPanelContext';
import CreateProceding from './CreateProceding';
import EditProceding from './EditProceding';
 
const CaseProceding = () => {
    const navigate = useNavigate();
    const createRef = useRef(null);
    const refClose = useRef(null);
    const editRef = useRef(null);  
    const editClose = useRef(null); 
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [keyword, setKeyword] = useState('');   
    const [selectedProcedingId, setSelectedProcedingId] = useState(null); 

    const debouncedKeyword = useRef(_.debounce((value) => setKeyword(value), 300)).current;   
    
 
    const [caseData, setCaseData] = useState([
        { id: 1, caseNo: '1001', caseTitle: 'State vs John Doe', previousDate: '2024-01-01', nextDate: '2024-02-01', benchCode: 'BC-001' },
        { id: 2, caseNo: '1002', caseTitle: 'State vs Jane Doe', previousDate: '2024-01-05', nextDate: '2024-02-05', benchCode: 'BC-002' },
        { id: 3, caseNo: '1003', caseTitle: 'State vs Richard Roe', previousDate: '2024-01-10', nextDate: '2024-02-10', benchCode: 'BC-003' },
    ]);
 
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

    const handleEditClick = (id) => {
        setSelectedProcedingId(id)
        editRef.current.click();   
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h1 className="mb-0">Case Proceeding</h1>
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
                                placeholder="Search Proceeding..."
                                onChange={(e) => debouncedKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="line-separator mb-3" />

                <TestPanel>
                    <TestPanelHeader>Case Proceeding</TestPanelHeader>
                    <TestPanelBody>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Case No</th>
                                        <th>Case Title</th>
                                        <th>Previous Date</th>
                                        <th>Next Date</th>
                                        <th>Bench Code</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {caseData.map((caseItem) => (
                                        <tr key={caseItem.id}>
                                            <td>{caseItem.id}</td>
                                            <td>{caseItem.caseNo}</td>
                                            <td>{caseItem.caseTitle}</td>
                                            <td>{caseItem.previousDate}</td>
                                            <td>{caseItem.nextDate}</td>
                                            <td>{caseItem.benchCode}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => handleEditClick(caseItem.id)}
                                                >
                                                    Edit
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
            
            <CreateProceding open={createRef} close={refClose} />
            <EditProceding open={editRef} close={editClose} ProcedingId={selectedProcedingId} />
            <Footer />
        </div>
    );
};

export default CaseProceding;

