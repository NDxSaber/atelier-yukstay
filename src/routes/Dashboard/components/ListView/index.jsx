import React from 'react';
import { Row, Col } from 'reactstrap';

import iconClose from '../../../../assets/images/iconClose.svg';

const ListView = props => {

    const {
        onHandleViewing
    } = props;

    return (
        <div className="viewing-wrapper">
            <span className="close" onClick={() => onHandleViewing()}>
                <img src={iconClose} alt="icon Close" />
            </span>
            <div className="viewing-body">
                <Row>
                    <Col sm="6">
                        <h3>Viewing Dashboard</h3>
                    </Col>
                    <Col sm="6">
                        <h3 className="text-center">tabs</h3>
                    </Col>
                </Row>
                
            </div>
        </div>
    );
};

export default ListView;