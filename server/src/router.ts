import { Router } from "express";
import StudentRouter from "./routers/student.router";
import CompanyRouter from "./routers/company.router";
import RepresentativeRouter from "./routers/representative.router";
import InteractionRouter from "./routers/interaction.router";
import {
  representativeAuthMiddleware,
  studentAuthMiddleware,
} from "./auth/auth";

const router = Router();

router.use("/student", studentAuthMiddleware, StudentRouter);
router.use("/company", representativeAuthMiddleware, CompanyRouter);
router.use(
  "/representative",
  representativeAuthMiddleware,
  RepresentativeRouter
);
router.use("/interaction", InteractionRouter);

export default router;
