// // routes/userRoutes.js
// export const userRoutes = (router) => {
//     router.get("/users", (req, res, next) => {
//       // Lógica para obtener todos los usuarios
//       res.send("List of users");
//       return next();
//     });
  
//     router.get("/users/:id", (req, res, next) => {
//       // Lógica para obtener un usuario específico por su ID
//       const userId = req.params.id;
//       res.send(`User with ID ${userId}`);
//       return next();
//     });
  
//     // Agrega más rutas relacionadas con usuarios aquí
//   };

export const userRoutes = (router) => {
    router.get("/", (req, res, next) => {
      // Lógica para obtener todos los usuarios
      res.send("List of users");
      return next();
    });
  
    router.get("/:id", (req, res, next) => {
      // Lógica para obtener un usuario específico por su ID
      const userId = req.params.id;
      res.send(`User with ID ${userId}`);
      return next();
    });