import { Request, Response } from "express";
import { Company } from "../models/company.model";

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

export const createCompany = async (req: Request, res: Response) => {
  const newCompany = new Company(req.body);

  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
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
