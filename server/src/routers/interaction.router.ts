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
import {
  adminAuthMiddleware,
  representativeAuthMiddleware,
  studentAuthMiddleware,
} from "../auth/auth";

const InteractionRouter = Router();

InteractionRouter.get("/:id", getInteractionById);

InteractionRouter.get("/", adminAuthMiddleware, getAllInteractions);

InteractionRouter.get(
  "/student/:id",
  studentAuthMiddleware,
  getInteractionsForStudent
);

InteractionRouter.get(
  "/company/:id",
  representativeAuthMiddleware,
  getInteractionsForCompany
);

InteractionRouter.get(
  "/representative/:id",
  representativeAuthMiddleware,
  getInteractionsForRepresentative
);

InteractionRouter.get(
  "/date-range",
  adminAuthMiddleware,
  getInteractionsForDateRange
);

InteractionRouter.post("/", createInteraction);

InteractionRouter.put("/:id", updateInteraction);

InteractionRouter.delete("/:id", deleteInteraction);

export default InteractionRouter;
