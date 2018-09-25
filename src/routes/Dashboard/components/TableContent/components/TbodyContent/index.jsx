import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import CurrencyFormat from 'react-currency-format';

import pdfIcon from '../../../../../../assets/images/pdf.svg';
import checkedIcon from '../../../../../../assets/images/checked.svg';

const TbodyContent = props => {

	const { dataContent, collapse } = props;

	const convertDate = (start, end) => {
		return (
			<span>
				{moment(start).format('DD MMMM YYYY')} - <br/>
				{moment(end).format('DD MMMM YYYY')}
			</span>
		);
	};

	const getDiffDate = (start, end) => {
		const diff = moment(end).diff(moment(start), 'months', true);

		return (
			<span>
				Every {Math.ceil(diff)} months
			</span>
		);
	};

	return (
		<tbody className={classnames('tb-content', { hide: !collapse })}>
			{
				dataContent.length > 0
					? dataContent.map((list, key) => (
						<tr key={key}>
							<td>{`Room No : ${list.fields.roomNo}`}</td>
							<td className="icon">
								{
									!list.fields.occupied ? ' - ' : (
										<img src={checkedIcon} alt="icon-check" className="checked" />
									)
								}
							</td>
							<td className="icon">
								{
									!list.fields.tenantContracts ? ' - ' : (
										<img src={pdfIcon} alt="icon-pdf" className="pdf" />
									)
								}
							</td>
							<td>
								{
									!list.fields.tenantContracts ? ' - ' : (
										convertDate(
											list.fields.tenantContracts[0].fields.startDate, 
											list.fields.tenantContracts[0].fields.endtDate
										)
									)
								}
							</td>
							<td className="icon"> - </td>
							<td>
								{
									!list.fields.tenantContracts ? ' - ' : (
										getDiffDate(
											list.fields.tenantContracts[0].fields.startDate,
											list.fields.tenantContracts[0].fields.endtDate
										)
									)
								}
							</td>
							<td>
								<CurrencyFormat 
									value={list.fields.costPerMonth} 
									displayType={'text'} 
									thousandSeparator={true} 
									prefix={'Rp '} 
								/>
							</td>
						</tr>
					))
					: null
			}
		</tbody>
	);
}

TbodyContent.defaultProps = {
	dataContent: [],
	dataSignContract: []
};

TbodyContent.propTypes = {
	collapse: PropTypes.bool,
	dataContent: PropTypes.arrayOf(PropTypes.object),
	dataSignContract: PropTypes.arrayOf(PropTypes.object)
};

export default TbodyContent;