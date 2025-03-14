import { Router } from "express";
import { AuthRoutes } from "../modules/auth/route/auth.route";

import { BookingRoutes } from "../modules/bookings/route/bookings.route";
import { classScheduleRoutes } from "../modules/classes-scheduling/route/classes.route";
import { UserRoutes } from "../modules/user/route/user.route";

const routes = Router();

// TODO  => All Router

type TRouteModules = { path: string; routes: Router };

const routesModule: TRouteModules[] = [
  {
    path: "/users",
    routes: UserRoutes,
  },

  {
    path: "/auth",
    routes: AuthRoutes,
  },

  {
    path: "/classes",
    routes: classScheduleRoutes,
  },
  {
    path: "/booking",
    routes: BookingRoutes,
  },
];

// TODO: Implement routes here
routesModule.forEach((item: TRouteModules) =>
  routes.use(item.path, item.routes),
);

export default routes;
