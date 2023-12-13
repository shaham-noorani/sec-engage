import { Router } from "express";

import {
  representativeAuthMiddleware,
  studentAuthMiddleware,
} from "./auth/auth";

import StudentRouter from "./routers/student.router";
import CompanyRouter from "./routers/company.router";
import RepresentativeRouter from "./routers/representative.router";
import InteractionRouter from "./routers/interaction.router";
import QueueRouter from "./routers/queue.router";

const router = Router();

router.use("/student", studentAuthMiddleware, StudentRouter);
router.use("/company", representativeAuthMiddleware, CompanyRouter);
router.use(
  "/representative",
  representativeAuthMiddleware,
  RepresentativeRouter
);
router.use("/queue", QueueRouter);
router.use("/interaction", InteractionRouter);

export default router;
