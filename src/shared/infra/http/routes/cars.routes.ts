import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/car/useCases/CreateCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/car/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/car/useCases/ListAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "../../../../modules/car/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoute.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoute.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoute.get("/available", listAvailableCarsController.handle);

carsRoute.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"), // Este images está lá no controller. Precisa ser exatamente igual
  uploadCarImagesController.handle
);

export { carsRoute };
