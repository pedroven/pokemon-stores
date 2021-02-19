import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --background: #121212;
    --d-gray: #282828;
    --d-orange: #fc6d14;
    --hover-orange: #fc8f4b;
    --o-red: #f94f00;
    --o-blue: #2D5680;
    --b-blue: #4489c9;
    --o-green: #215A02;
    --b-green: #6a9e4a;
    --header-green: #2a6d03;
    --hover-green: #4e842d;
    --header-blue: #306499;
    --hover-blue: #517aa3;
    --l-gray: #333333;
  }

  * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
  }
  body {
      font-family: sans-serif;
      font-size: 14px;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased !important;
      background-color: var(--background);
      .error {
        box-shadow: 0 -1px 4px var(--error), 0 2px 4px var(--error);
      }
      .errorText {
        color: var(--error);
        margin-top: 4px;
      }
  }
`;
