import React, { Component } from "react";
import styled from "styled-components";
import logo from "../assets/logo_yukstay.svg";
import breakpoint from "styled-components-breakpoint";
import { Link } from "react-router-dom";
import { clearFix, transparentize } from "polished/lib/index";
import FontAwesome from "react-fontawesome";

const links = [
  {
    to: "/faq",
    text: "FAQ"
  }
];

const HeaderLink = ({ to, text }) => (
  <li>
    <Link to={to}>{text}</Link>
  </li>
);

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }
  }

  menuClick = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {
    return (
      <div>
        <Nav>
          <ol>
            <li><Link to="/"><img src={logo} alt="YukStay!"/></Link></li>
          </ol>

          <Menu show={this.state.showMenu}>
            <li onClick={this.menuClick}><FontAwesome name="times"/></li>
            {links.map((link, index) => {
              return <HeaderLink key={index} {...link} />;
            })}
          </Menu>

          <ol>
            <li><FontAwesome name="bars" onClick={this.menuClick}/></li>
          </ol>

        </Nav>
      </div>
    )
  }
}

const Icon = (...props) => `
  cursor: pointer;
  font-size: 1.65rem;
  color: ${props.theme.palette.primary} !important;
`

const Menu = styled.ol`
  background-color: ${transparentize(0.04, "#fdfdfd")};
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 1rem 0rem;
  width: 100%;
  min-width: 300px;
  z-index: 10000;
  font-size: 2rem;
  display: ${props => props.show ? 'block' : 'none'};
  text-align: center;

  li {
    cursor: pointer;
    display: block !important;
    padding: 0.5rem 2rem;
    font-family: 'Source Sans Pro';
    
    a {
      width: 100%;
      display: block;
    }
    
    &:hover {
      background-color: ${props => props.theme.palette.primary}
      
      a {
        color: white;
      }
    }
  }
  
  li:first-child {
    font-size: 1.65rem;
    padding-top: 0;
    padding-bottom: 0;
    text-align: left;
    
    ${breakpoint("lg")`
      font-size: 1.2rem;
    `}
    
    :hover {
      background-color: transparent;
    }
  }
  
  ${breakpoint("sm")`
    width: 35%;
    text-align: left;
    font-size: 1.2rem;
  `}
  
  ${breakpoint("md")`
    padding: 2rem 0;
    width: 35%;
  `}
`;

const Nav = styled.nav`
  ${clearFix()}

  ol > li {
    display: inline;
    line-height: 3rem;
    vertical-align: middle;
  }
 
  ol:first-child {
    float: left;
    
    img {
      height: 3rem;
      paddingBottom: 0;
      marginBottom: 0;
    }
  }
  
  ol:last-child {
    text-align: right;
    
    li:last-child {
      cursor: pointer;
      font-size: 1.65rem;
      color: ${props => props.theme.palette.primary} !important;
      
      ${breakpoint("lg")`
        font-size: 1.2rem;
      `}
    }
  }
`;