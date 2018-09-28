import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col, Button, ButtonGroup, TabContent, TabPane, Table } from 'reactstrap';

import iconClose from '../../../../assets/images/iconClose.svg';


class ListView extends Component {

	static propTypes = {
		onHandleViewing: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1'
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {

		const { onHandleViewing } = this.props;

		return (
			<div className="viewing-wrapper" >
				<span className="close" onClick={() => onHandleViewing()}>
					<img src={iconClose} alt="icon Close" />
				</span>
				<div className="viewing-body">
					<Row>
						<Col sm="3">
							<h3 class="mt-2 text-left">Viewing Dashboard</h3>
						</Col>
						<Col sm="6">
							<div className="nav-tabs text-center">
								<ButtonGroup>
									<Button
										color="primary"
										className={classnames({ active: this.state.activeTab === '1', })}
										onClick={() => { this.toggle('1'); }}
									>
										List View
                  </Button>
									<Button
										color="primary"
										className={classnames({ active: this.state.activeTab === '2' })}
										onClick={() => { this.toggle('2'); }}
									>
										Graphic Donut
                  </Button>
								</ButtonGroup>
							</div>
						</Col>
					</Row>
					<TabContent className="tabs-content" activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<Row>
								<Col sm="12">
									<Table responsive className="table-list">
										<thead>
											<tr>
												<th className="w-25">Viewers</th>
												<th className="w-75">Reason</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td colSpan="2">No Have List Viewers</td>
											</tr>
										</tbody>
									</Table>
								</Col>
							</Row>
						</TabPane>
						<TabPane tabId="2">
							<Row>
								<Col sm="12">
									<div className="graphic">
											<h4>
												No Have Viewer Data Graphic
											</h4>
									</div>
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</div>
			</div>
		);
	}
}

export default ListView;