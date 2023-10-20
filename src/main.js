// Este es el punto de entrada de tu aplicacion
// file main.js
import home from "./home.js";
import login from "./login.js";
import error from "./error.js";
//import { myFunction } from './lib/index.js';

//myFunction();
const routes = [
  { path: "/", component: home },
  { path: "/login", component: login },
  { path: "/error", component: error },
];
const defaultRoute = "/";
const root = document.getElementById("root");

function navigateTo(hash) {
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
    root.appendChild(route.component());
  }
}
function navigateTo(route) {
    
  console.log(`Navigating to ${route}`);
}
