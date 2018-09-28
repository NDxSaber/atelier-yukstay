import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TbodyCollapse from "../TbodyCollapse";
import TbodyContent from "../TbodyContent";
import TbodySpace from "../TbodySpace";

class TbodyWrapper extends Component {

	static propTypes = {
		colspan: PropTypes.number.isRequired,
		result: PropTypes.object
  };
  
  constructor(props) {
    super(props);

    this.state = {
      collapse: true
    };
  }

  handleCollapse () {
    
  }

	render() {

		const { colspan, result } = this.props;
    const name = `Tower ${result.tower} Floor ${result.floor} - Unit ${result.unitNo}, ${result.unitType}`;

    console.log(name, this.state.collapse);
    

		return (
			<React.Fragment>
				<TbodyCollapse
          onHandleCollapse={this.handleCollapse}
          collapse={this.state.collapse}
					colspan={colspan}
					name={name}
				/>
				<TbodyContent
          collapse={this.state.collapse}
          dataContent={result.listings || {}}
				/>
				<TbodySpace colspan={colspan} />
			</React.Fragment>
		);
	}
}

export default TbodyWrapper;