import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

const publicRoutes = [
  {
    path: "/",
    component: Homepage,
  },
];
const privateRoutes = [
  {
    path: "/user",
    component: MenuPage,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/user"} component={MenuPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
