import React, { useState } from 'react';
const MetricsSettings = () => {
    const [isAnonimizeData, setIsAnonimizeData] = useState(false);
    const onChecking = (status) =>{
        setIsAnonimizeData(status);
    }
    
  return (
    <>
      <div className="heading">
        <h5>Metrics</h5>
      </div>
      <div className="form-container">
        
          <strong>Anonymize usage data collection</strong>
        <p>
          We collect data only for product improvements, see the{' '}
          <a
            rel="noreferrer"
            href="https://docs.chaosgenius.io/docs/introduction"
            target="_blank">
            docs
          </a>
          .
        </p>
        <div className="form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="removeoverlap"
            checked={isAnonimizeData}
            onChange={() => onChecking(!isAnonimizeData)}
          />
          <label for="">Anonymize my usage data.</label>
        </div>
      </div>
    </>
  );
};

export default MetricsSettings;
