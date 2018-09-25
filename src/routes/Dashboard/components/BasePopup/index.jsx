import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const BasePopup = props => {
    const { children, showPopup, animation } = props;

    return (
        <div
            className={classnames(
                animation,
                'base-popup',
                { show: showPopup }
            )}
        >
            {children}
        </div>
    );
};

BasePopup.defaultProps = {
    animation: ''
};

BasePopup.propTypes = {
    children: PropTypes.node.isRequired,
    showPopup: PropTypes.bool.isRequired,
    animation: PropTypes.string
};

export default BasePopup;