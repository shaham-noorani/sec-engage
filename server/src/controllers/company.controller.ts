import { Request, Response } from "express";
import { Company } from "../models/company.model";
import { Representative } from "../models/representative.model";

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id).populate(
      "representatives"
    );

    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCompanies = async (req: Request, res: Response) => {
  const data = req.body as { company: any; representative: any }[];

  let companies = [];
  data.forEach(async row => {
    const companyFromBody = {
      ...row.company,
    };

    const representativeFromBody = {
      ...row.representative,
    };

    const representative = new Representative(representativeFromBody);
    await representative.save();

    const company = new Company({
      ...companyFromBody,
      mainRepresentative: representative._id,
      representatives: [representative._id],
    });

    await company.save();

    representative.company = company._id;
    await representative.save();

    companies.push(company);
  });

  res.status(201).json(companies);
};

export const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = req.body;

  await Company.findByIdAndUpdate(id, company, {
    new: true,
  });

  res.json({ message: "Company updated successfully." });
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Company.findByIdAndDelete(id);

  res.json({ message: "Company deleted successfully." });
};
