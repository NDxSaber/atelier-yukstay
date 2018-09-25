// This for reuse class | style component
import styled from "styled-components";
import { clearFix } from "polished";
import breakpoint from "styled-components-breakpoint";


export const Button = styled.button`
  min-width: 120px;
  min-height: 48px;
  border-radius: 24px;
  background-color : #ffffff;
  cursor: pointer;
  transition : all ease .4s;
  &.rounded{
	  border: solid 1px rgba(237, 237, 237, 0.3);
  }
  &.shadow{
	  box-shadow: 0 3px 6px 0 rgba(119, 119, 119, 0.1);
  }
  &:focus{
  	outline: 0
  }
  &:hover,
  &.active{
  	background-color : #1278ce;
  	color: #ffffff
  }`;

export const Container = styled.div`
  ${clearFix()}
  padding: 3rem 1.5rem 0 1.5rem;
  background-color: #ffffff;
  ${breakpoint("md")`
    padding: 4rem 5rem 0 5rem;
  `}
`;


export const Wrapper = styled.div`
  ${clearFix()}
    margin: 0 2rem 0 2rem;
  ${breakpoint("md")`
    margin: 0 5rem 0 5rem;
  `}
`;
