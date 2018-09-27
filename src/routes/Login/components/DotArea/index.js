import React from 'react';
import PropTypes from 'prop-types';

const DotArea = (props) => {
	const { currentShow } = props;

	return (
		<div className="dot-area">
			<div className={`dot ${!currentShow ? 'current' : ''}`} />
			<div className={`dot ${currentShow ? 'current' : ''}`} />
		</div>
	);
};

DotArea.defaultProps = {
  currentshow: false
};

DotArea.propTypes = {
  currentshow: PropTypes.bool
};

export default DotArea;
