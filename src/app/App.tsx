import { Despesas } from "./Despesas";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/despesas/:anoMes">
          <Despesas />;
        </Route>
        <Redirect to={{ pathname: "/despesas/2021-03" }} />
      </Switch>
    </Router>
  );
}

export default App;
