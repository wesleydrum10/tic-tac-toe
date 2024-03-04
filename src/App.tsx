import "./App.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/global";
import { Router } from "./router";
import { RulesProvider } from "./context/useRules";

function App() {
  return (
    <BrowserRouter>
      <RulesProvider>
        <GlobalStyles />
        <Router />
      </RulesProvider>
    </BrowserRouter>
  );
}

export default App;
