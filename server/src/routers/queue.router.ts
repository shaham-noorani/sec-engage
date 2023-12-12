import { Router } from "express";

import { representativeAuthMiddleware } from "../auth/auth";

import {
  getStudentInQueue,
  getCompanyQueues,
  createQueue,
  joinQueue,
  removeFromQueue,
  createInteraction,
  notifyNext,
} from "../controllers/queue.controller";

const QueueRouter = Router();

QueueRouter.get("/student/:studentid", getStudentInQueue);

QueueRouter.get("/company/:companyid", getCompanyQueues);

QueueRouter.post(
  "/company/:companyid",
  representativeAuthMiddleware,
  createQueue
);

QueueRouter.post("/join/:queueid", joinQueue);

QueueRouter.delete("/remove/:studentid", removeFromQueue);

QueueRouter.post(
  "/create-interaction/company/:companyid/representative/:representativeid/student/:studentid",
  representativeAuthMiddleware,
  createInteraction
);

QueueRouter.post(
  "/notify-next/:queueid",
  representativeAuthMiddleware,
  notifyNext
);

export default QueueRouter;
