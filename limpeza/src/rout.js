import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
const Rout = () => (
    <BrowserRouter>
        <Switch>
          <Route  exact path="/" component={Home}/>
        </Switch>
    </ BrowserRouter>
  );
  export default Rout;