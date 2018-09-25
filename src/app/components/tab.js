import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export default class extends Component {
  static proptypes = {
    tabActive: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { tabActive, label }
    } = this;

    let selectedTab = false;

    if (tabActive === label) {
      selectedTab == true;
    }

    return <ListItem onClick={onClick}>{label}</ListItem>;
  }
}

const ListItem = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0 2rem 0 0;
  &:hover{
    color: ${props => props.theme.palette.primary}
    cursor: pointer;
  }
`;
