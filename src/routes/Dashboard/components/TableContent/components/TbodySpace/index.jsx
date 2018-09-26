import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TbodySpace extends Component {

	static propTypes = {
		colspan: PropTypes.number.isRequired
	};

	render() {
		return (
			<tbody className="space">
				<tr>
					<td colSpan={this.props.colspan}></td>
				</tr>
			</tbody>
		);
	}
}

export default TbodySpace;