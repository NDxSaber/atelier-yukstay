import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Container, Row, Col } from 'reactstrap';

import TbodyWrapper from "./components/TbodyWrapper";
import TbodySpace from "./components/TbodySpace";

class TableContent extends Component {

	static propTypes = {
		dataContent: PropTypes.arrayOf(PropTypes.object)
	};

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		const { dataContent } = this.props;

		const headTable = [
			'Listing Name',
			'Occupied or not',
			'Rental Agreement',
			'Length of Stay',
			'Total Viewing',
			'Payment Period',
			'Price you get'
		];

		return (
			<div className="table-content">
				<Container fluid>
					<Row>
						<Col sm="12">
							<Table responsive>
								<thead className="head-top">
									<tr>
										{
											headTable.map((row, key) => (
												<th key={key}>{row}</th>
											))
										}
									</tr>
								</thead>
								<TbodySpace colspan={headTable.length} />

								{
									dataContent.length > 0
										? dataContent.map((list, key) => (
											<TbodyWrapper
												colspan={headTable.length}
												key={key}
												result={list.fields}
											/>
										))
										: null
								}
							</Table>
						</Col>
					</Row>
				</Container>
			</div>

		);
	}
}

export default TableContent;