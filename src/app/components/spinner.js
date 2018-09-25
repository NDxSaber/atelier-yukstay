import React from 'react';
import { FoldingCube } from 'better-react-spinkit'
import theme from '../../styles/theme';
import styled from "styled-components";

const SpinnerCont = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
  
  span {
    margin-top: 20%;
  }
`

export default (props) => (
  <SpinnerCont {...props}>
    <FoldingCube size={70} color={theme.palette.accent1.fgBold} />
  </SpinnerCont>
);