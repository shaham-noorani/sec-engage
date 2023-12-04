import { Router } from "express";
import StudentRouter from "./routers/student.router";
import CompanyRouter from "./routers/company.router";
import RepresentativeRouter from "./routers/representative.router";
import InteractionRouter from "./routers/interaction.router";

const router = Router();

router.use("/student", StudentRouter);
router.use("/company", CompanyRouter);
router.use("/representative", RepresentativeRouter);
router.use("/interaction", InteractionRouter);

export default router;
