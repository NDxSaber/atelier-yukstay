import { injectGlobal } from 'styled-components';

injectGlobal`
  @-ms-viewport {
    width: device-width;
  }

  body {
    -ms-overflow-style: scrollbar;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background-color: _palette(invert, bg);
  }
  
  button {
    cursor: pointer;
  }
  .font-bold{
    font-weight : 600
  }
  .inline-block{
    display: inline-block;
  }
  .float-left{
    float:left
  }
  .float-right{
    float: right
  }

  @keyframes loading {
      from {left: -200px; width: 30%;}
      50% {width: 30%;}
      70% {width: 70%;}
      80% { left: 50%;}
      95% {left: 120%;}
      to {left: 100%;}
`;
