import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Tab from "./tab";

export default class extends Component {
  static proptypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      tabActive: this.props.children[0].props.label
    };
  }

  onClickTab = tab => {
    this.setState({ tabActive: tab });
  };

  render() {
    const {
      props: { children },
      state: { tabActive }
    } = this;

    return (
      <Tabs>
        <TabList>
          {children.map(child => {
            const { label } = child.props;

            return (
              <Tab
                tabActive={tabActive}
                key={label}
                label={label}
                onClick={this.onClickTab}
              />
            );
          })}
        </TabList>
        <TabContent>
          {children.map(child => {
            if (child.props.label !== tabActive) return undefined;
            return child.props.children;
          })}
        </TabContent>
      </Tabs>
    );
  }
}

const Tabs = styled.div``;

const TabList = styled.ol`
  border-bottom: 1px solid #efefef;
  padding-left: 0;
`;

const TabContent = styled.div``;
