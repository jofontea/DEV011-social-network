// file main.js finished
import { home } from "./Views/home.js";
import { login } from "./Views/login.js";
import { error } from "./Views/error.js";
import { register } from "./Views/register.js";
import { wall } from "./Views/wall.js";

const routes = [
  { path: "/", component: home },
  { path: "/login", component: login },
  { path: "/register", component: register },
  { path: "/wall", component: wall },
  { path: "/error", component: error },
];

const defaultRoute = "/";
const root = document.getElementById("root");

export function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo("/error");
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
