import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller";

const CompanyRouter = Router();

CompanyRouter.get("/:id", getCompanyById);

CompanyRouter.get("/", getAllCompanies);

CompanyRouter.post("/", createCompany);

CompanyRouter.put("/:id", updateCompany);

CompanyRouter.delete("/:id", deleteCompany);

export default CompanyRouter;
