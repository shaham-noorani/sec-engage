import { Router } from "express";
import {
  createInteraction,
  deleteInteraction,
  getAllInteractions,
  getInteractionById,
  updateInteraction,
} from "src/controllers/interaction.controller";

const InteractionRouter = Router();

InteractionRouter.get("/:id", getInteractionById);

InteractionRouter.get("/", getAllInteractions);

InteractionRouter.post("/", createInteraction);

InteractionRouter.put("/:id", updateInteraction);

InteractionRouter.delete("/:id", deleteInteraction);

export default InteractionRouter;
