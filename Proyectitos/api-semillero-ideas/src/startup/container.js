const { createContainer, asClass, asValue, asFunction } = require("awilix");

const config = require("../config");
const server = require(".");

// services
const { HomeService, CommentService, IdeaService, UserService, AuthService } = require("../services");

// controllers
const { HomeController, CommentController, IdeaController, UserController, AuthController } = require("../controllers");

// routes
const { HomeRoutes, CommentRoutes, IdeaRoutes, UserRoutes, AuthRoutes } = require("../routes/index.routes");

// models
const { User, Comment, Idea } = require("../models");

// repositories
const { CommentRepository, IdeaRepository, UserRepository } = require("../repositories");

// container y adicional
const IndexRoutes = require("../routes");
const container = createContainer();

container
  .register({
    server: asClass(server).singleton(),
    router: asFunction(IndexRoutes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    UserService: asClass(UserService).singleton(),
    AuthService: asClass(AuthService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
  });

module.exports = container;
