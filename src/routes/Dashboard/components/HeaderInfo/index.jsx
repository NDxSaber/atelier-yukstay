import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import userIcon from '../../../../assets/images/user.svg';
import pdfIcon from '../../../../assets/images/pdf.svg';
import { isServer } from '../../../../store';

class headerInfo extends Component {

	static propTypes = {
		name: PropTypes.string,
		onHandleViewing: PropTypes.func,
		data: PropTypes.object,
		partnerAgreement: PropTypes.object,
		totalView: PropTypes.number
	};

	handleContract () {
		const { partnerAgreement } = this.props;
		const { fields } = partnerAgreement;
		if (isServer) {
			window.location.href = fields.contract[0].url;
		}
	}

	render() {
		const { name, onHandleViewing, totalView } = this.props;
		
		return (
			<div className="header-info">
				<Container fluid>
					<Row>
						<Col sm="12" md="6">
							<p className="account-info">
								<img src={userIcon} alt="icon-user" className="icon-user" />
								Hi {name}, welcome back!
              </p>
						</Col>
						<Col sm="12" md="6">
							<div className="partnership-info">
								<p className="agreement" onClick={() => this.handleContract()}>
									<img src={pdfIcon} alt="icon-pdf" className="icon-pdf" />
									<span>Partnership Agreement</span>
								</p>
								<p className="viewing" onClick={() => onHandleViewing()}>Total active listing: {totalView}</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

}

export default headerInfo;