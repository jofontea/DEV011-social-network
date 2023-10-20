// Este es el punto de entrada de tu aplicacion
// file main.js
//import { home } from "./home.js";
import { login } from "./login.js";
//import { error } from "./error.js";
//import { myFunction } from './lib/index.js';

//myFunction();
const routes = [
    { path: "/login", component: login },
 // { path: "/", component: home },
 // { path: "/error", component: error },
];
const defaultRoute = "/";
const root = document.getElementById("root");
const loginSection = login();
root.appendChild(loginSection);

// function navigateTo(hash) {
//   const route = routes.find((routeFound) => routeFound.path === hash);

//   if (route && route.component) {
//     window.history.pushState(
//       {},
//       route.path,
//       window.location.origin + route.path
//     );
//     if (root.firstChild) {
//       root.removeChild(root.firstChild);
//     }
//     root.appendChild(route.component());
//   }
// }
/*function navigateTo(route) {
    
  console.log(`Navigating to ${route}`);
}*/
