import { Router } from "express";
import {
  createRepresentative,
  deleteRepresentative,
  getAllRepresentatives,
  getRepresentativeById,
  updateRepresentative,
} from "src/controllers/representative.controller";

const RepresentativeRouter = Router();

RepresentativeRouter.get("/:id", getRepresentativeById);

RepresentativeRouter.get("/", getAllRepresentatives);

RepresentativeRouter.post("/", createRepresentative);

RepresentativeRouter.put("/:id", updateRepresentative);

RepresentativeRouter.delete("/:id", deleteRepresentative);

export default RepresentativeRouter;
