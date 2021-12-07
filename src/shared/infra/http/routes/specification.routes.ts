import { Router } from "express";

import { CreateSpecificationsController } from "../../../../modules/car/useCases/CreateSpecifications/CreateSpecificationsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpecificationsControler = new CreateSpecificationsController();

specificationRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationsControler.handle
);

export { specificationRoutes };
