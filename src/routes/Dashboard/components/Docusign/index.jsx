import React from 'react';

import IconContract from '../../../../assets/images/icon_contract.svg';

const Docusign = props => {

    const {
        onHandleCancelled,
        onHandleProceed
    } = props;

    return (
        <div className="docusign-wrapper">
            <div className="docusign-body">
                <img src={IconContract} alt="docusign" className="icon-docusign" />
                <h2>
                    You need to sign partnership agreement to see this content
                </h2>
                <p>
                    We want to create a great and transparant culture for both of us. While we do our job, we need you too to agree with our terms and condition.
                </p>

                <div className="action">
                    <button className="btn btn-primary" onClick={() => onHandleProceed()}>Proceed to Hellosign</button>
                    <button className="btn btn-primary-outline" onClick={() => onHandleCancelled()}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Docusign;