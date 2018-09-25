import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import breakpoint from "styled-components-breakpoint";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Link to={this.props.to ? this.props.to : "/"}>
          <Card>
            <Cover img={this.props.imgSrc}/>
            <CardContent>
              {this.props.children}
            </CardContent>
          </Card>
        </Link>
      </Container>
    );
  }
}

const Container = styled.div`
  min-width: 100%;
  flex: 0 0 auto;
  padding: 0 0.1rem 0.2rem 0;
`;

const Card = styled.div`
  box-shadow: 0 0.1rem 0.2rem 0 rgba(100,100,100,0.2);
  transition: 0.3s;
  height: 100%;
  width: 100%;
  border-radius: 0.3rem;
  overflow:hidden;
  
  color: ${props => props.theme.palette.textColor}
`;

const Cover = styled.div`
  padding-top: 48%;
  background-image: url("${props => props.img }");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;  
`

const CardContent = styled.div`
  padding: 0 0.6rem;
`
