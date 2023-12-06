import { Router } from "express";
import {
  createInteraction,
  deleteInteraction,
  getAllInteractions,
  getInteractionById,
  getInteractionsForCompany,
  getInteractionsForDateRange,
  getInteractionsForRepresentative,
  getInteractionsForStudent,
  updateInteraction,
} from "../controllers/interaction.controller";

const InteractionRouter = Router();

InteractionRouter.get("/:id", getInteractionById);

InteractionRouter.get("/", getAllInteractions);

InteractionRouter.get("/student/:id", getInteractionsForStudent);

InteractionRouter.get("/company/:id", getInteractionsForCompany);

InteractionRouter.get("/representative/:id", getInteractionsForRepresentative);

InteractionRouter.get("/date-range", getInteractionsForDateRange);

InteractionRouter.post("/", createInteraction);

InteractionRouter.put("/:id", updateInteraction);

InteractionRouter.delete("/:id", deleteInteraction);

export default InteractionRouter;
