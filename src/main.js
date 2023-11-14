import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { home } from './views/home.js';
import { login } from './views/login.js';
import { error } from './views/error.js';
import { register } from './views/register.js';
import { wall } from './views/wall.js';

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/wall', component: wall },
  { path: '/error', component: error },
];

const defaultRoute = '/';
const root = document.getElementById('root');

async function navigateTo(hash) {
  try {
    const route = routes.find((routeFound) => routeFound.path === hash);

    if (route && route.component) {
      window.history.pushState({}, route.path, window.location.origin + route.path);
      if (root.firstChild) {
        root.removeChild(root.firstChild);
      }

      if (route.path === '/wall') {
        // Obtener el estado de autenticación
        const auth = getAuth();

        // Manejar cambios en el estado de autenticación
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // Llamar a la función wall para obtener el componente
            try {
              const divWall = await wall(navigateTo);
              root.appendChild(divWall);
            } catch (catchError) {
              console.error('Error al cargar wall:', catchError);
            }
          } else {
            navigateTo('/error');
          }
        });
      } else {
        root.appendChild(route.component(navigateTo));
      }
    } else {
      navigateTo('/error');
    }
  } catch (catchError) {
    console.error('Error en navigateTo:', catchError);
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

// Para cargar la ruta inicial al cargar la página
navigateTo(window.location.pathname || defaultRoute);
