import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint"

import goRightIcon from "../assets/go-right-icon.svg";
import goLeftIcon from "../assets/go-left-icon.svg";

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showRight: true,
      showLeft: false
    };
  }

  setContRef = (element) => {
    this.contRef = element;
    this.handleScroll();
  };

  componentDidMount() {
    this.handleScroll();
  }

  goLeft = () => {
    let node = ReactDOM.findDOMNode(this.contRef);
    let width = node.offsetWidth;

    let calcScroll = node.scrollLeft - width;
    node.scrollLeft = (calcScroll < 0) ? 0 : calcScroll;
  }

  goRight = () => {
    let node = ReactDOM.findDOMNode(this.contRef);
    let width = node.offsetWidth;

    let scrollWidth = node.scrollWidth - node.clientWidth;
    let calcScroll = node.scrollLeft + width;

    node.scrollLeft = (calcScroll > scrollWidth) ? scrollWidth : calcScroll;
  }

  handleScroll = () => {
    if(this.contRef) {
      let node = ReactDOM.findDOMNode(this.contRef)
      let left = node.scrollLeft;
      let width = node.scrollWidth - node.clientWidth;

      let hasChildren = this.props.children;

      let state = {
        showLeft: (left != 0 && hasChildren),
        showRight: (left != width || width == 0) && hasChildren
      };
      this.setState(state);
    }
  };

  render() {
    return (
      <Wrapper>
        <Container ref={this.setContRef} onScroll={this.handleScroll}>
          {this.props.children}
        </Container>
        <ScrollOverlayLeft show={this.state.showLeft}>
          <span />
          <img src={goLeftIcon} onClick={this.goLeft}/>
        </ScrollOverlayLeft>
        <ScrollOverlayRight show={this.state.showRight}>
          <span />
          <img src={goRightIcon} onClick={this.goRight}/>
        </ScrollOverlayRight>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
`

const ScrollOverlay = styled.div`
  width: 5%;
  min-height: 100%;
  position: absolute;
  padding: 0;
  
  display: ${props => props.show ? "block" : "none"}
  
  img {
    width: 2rem;
    height: 3rem;
    top: 0;
    cursor: pointer;
    display: none;
    position: absolute;  
    top: 0;  
    bottom: 0;  
    right: 0;  
    margin: auto 0;
    padding-bottom: 1rem;
    
    ${breakpoint("sm")`
      display: inline-block;
    `}
  }
  
  ${breakpoint("sm")`
      width: 8%;
  `}
`

const ScrollOverlayRight = styled(ScrollOverlay)`
  top: 0;
  right: 0;
  background: linear-gradient(to right, transparent, #fff);
  text-align: right;
`;

const ScrollOverlayLeft = styled(ScrollOverlay)`
  top: 0;
  left: 0;
  background: linear-gradient(to left, transparent, #fff);
  text-align: left;

 
  img {
    left: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  position: relative;
    
  &::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
  }
`;
