import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

const tbodyCollapse = props => {
    const { name, colspan, onHandleCollapse, collapse } = props;

    return (
        <tbody className="tb-collapse" onClick={() => onHandleCollapse()}>
            <tr>
                <td colSpan={colspan}>
                    <span className="label">{name}</span>
                    <span className={classnames('icon', { up: !collapse })} />
                </td>
            </tr>
        </tbody>
    );
}

tbodyCollapse.defaultProps = {
    name: '',
    colspan: 0
};

tbodyCollapse.propTypes = {
    collapse: PropTypes.bool,
    name: PropTypes.string,
    onHandleCollapse: PropTypes.func,
    colspan: PropTypes.number.isRequired
};

export default tbodyCollapse;