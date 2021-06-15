import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

const publicRoutes = [
  {
    path: "/",
    component: HomePage,
  },
];
const privateRoutes = [
  {
    path: "/user",
    component: MenuPage,
  },
];

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  let RenderPage = null;

  if (!isAuthenticated) {
    RenderPage = publicRoutes.map((element, index) => (
      <Route
        key={index}
        exact
        path={element.path}
        component={element.component}
      />
    ));
  }

  if (isAuthenticated) {
    RenderPage = privateRoutes.map((element, index) => (
      <Route
        key={index}
        exact
        path={element.path}
        component={element.component}
      />
    ));
  }

  return (
    <BrowserRouter>
      <Switch>
        {RenderPage}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
