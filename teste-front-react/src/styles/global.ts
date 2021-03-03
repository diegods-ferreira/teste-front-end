import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #ebebeb;
    color: #2a2a2a;
    -webkit-font-smoothing: antialiased;
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }
`;
