import { Request, Response } from "express";
import { Representative } from "../models/representative.model";
import { Company } from "../models/company.model";

export const getRepresentativeById = async (req: Request, res: Response) => {
  try {
    const representative = await Representative.findById(req.params.id);

    res.status(200).json(representative);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllRepresentatives = async (req: Request, res: Response) => {
  try {
    const representatives = await Representative.find();

    res.status(200).json(representatives);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRepresentative = async (req: Request, res: Response) => {
  const newRepresentative = new Representative(req.body);

  try {
    await newRepresentative.save();

    // add rep to company
    const company = await Company.findById(newRepresentative.company);
    company.representatives.push(newRepresentative._id);
    await company.save();

    res.status(201).json(newRepresentative);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRepresentative = async (req: Request, res: Response) => {
  const { id } = req.params;
  const representative = req.body;

  const updatedRepresentative = await Representative.findByIdAndUpdate(
    id,
    representative,
    {
      new: true,
    }
  );

  res.json(updatedRepresentative);
};

export const deleteRepresentative = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Representative.findByIdAndDelete(id);

  res.json({ message: "Representative deleted successfully." });
};
