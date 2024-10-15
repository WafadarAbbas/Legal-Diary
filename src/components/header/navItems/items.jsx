import React from 'react';
import { FaHome, FaInfoCircle, FaBox, FaLink, FaList } from 'react-icons/fa'; // Import relevant icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Items() {
  return (
    <div >
      <div className="row g-4">
        <div className="col">
          <div className="d-flex align-items-center ms-3 ">
            <FaHome size={20} className="text-primary me-2" />
            <span className="text-nowrap" style={{fontWeight:600,fontSize:'13px'}}>Home Page</span>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center">
            <FaInfoCircle size={20} className="text-success me-2" />
            <span  style={{fontWeight:600,fontSize:'13px'}}>About</span>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center">
            <FaBox size={20} className="text-warning me-2" />
            <span  style={{fontWeight:600,fontSize:'13px'}}>Package</span>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center mr-5">
            <FaLink size={20} className="text-danger me-2" />
            <span className="text-nowrap" style={{fontWeight:600,fontSize:'13px'}}>Generate Tenant Link</span>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center">
            <FaList size={20} className="text-info me-2" />
            <span  style={{fontWeight:600,fontSize:'13px'}}>Subscriptions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
