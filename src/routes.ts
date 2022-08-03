import { Router } from "express";
import { SessionController } from "./controllers/SessionController";
import { UserController } from "./controllers/UserController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";

const routes = Router();

//User
//Public Routes
routes.post("/api/V1/user/add", new UserController().add);
//Private Routes
routes.put("/api/V1/user/update/:id", ensuredAuthenticated(), new UserController().update);
routes.delete("/api/V1/user/delete/:id", ensuredAuthenticated(), new UserController().delete);
routes.get("/api/V1/users/:id", ensuredAuthenticated(), new UserController().listById);
routes.get("/api/V1/users", ensuredAuthenticated(), new UserController().listAll);


//Login
//Public Routes
routes.post("/api/V1/login", new SessionController().login);


export {routes}