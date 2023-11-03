// export { default as videoRoutes } from "./video.routes";

import { userRoutes } from "./user.routes";
import { videoRoutes } from "./video.routes";

// routes/index.js

// export const setupRoutes = (router) => {

//     console.log('ROUTER -->>', router)
//   // Agrega las rutas específicas para videos
//   videoRoutes(router);

//   // Agrega las rutas específicas para usuarios
//   userRoutes(router);
// };

export const setupRoutes = (router) => {
    router.add("/v1/api/:resource", (req, res, next) => handleDynamicRoute(req, res, next, router)); // Ruta genérica con parámetro "resource"
  };
  
  const handleDynamicRoute = (req, res, next, router) => {
    const resource = req.params.resource; // Obtiene el valor del parámetro "resource"
  
    // Verifica el valor de "resource" y asocia la ruta correspondiente
    if (resource === 'videos') {
      videoRoutes(router);
    } else if (resource === 'users') {
      userRoutes(router);
    } else {
      res.send(`Invalid resource: ${resource}`);
      return next();
    }
  
    router.applyRoutes(req, res, next);
  };