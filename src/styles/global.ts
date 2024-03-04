import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 :root {
  --bg-gray-box: #1f3540;
  --color-black: #000000;
  --color-white: #ffffff;
  --bg-gray-default: #1a2b33;
  --bg-gray-light: #a9bec9;
  --color-player-x: #31c4be;
  --color-player-o: #f2b236;
  --color-player-o-shawdon: #ce8a11;
  --color-player-x-shawdon: #118c87;
  --color-default-shawdon: #102228;
  --color-gray-light-shawdon: #68838e;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
}

body {
  background: var(--bg-gray-default);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

  body, input, button {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
