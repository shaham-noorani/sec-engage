import { Request, Response } from "express";
import { Interaction } from "src/models/interaction.model";

export const getInteractionById = async (req: Request, res: Response) => {
  try {
    const interaction = await Interaction.findById(req.params.id);

    res.status(200).json(interaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInteractionsForStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const interactions = await Interaction.find({ student: req.params.id });

    res.status(200).json(interactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInteractionsForCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const interactions = await Interaction.find({ company: req.params.id });

    res.status(200).json(interactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInteractionsForRepresentative = async (
  req: Request,
  res: Response
) => {
  try {
    const interactions = await Interaction.find({
      representative: req.params.id,
    });

    res.status(200).json(interactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInteractionsForDateRange = async (
  req: Request,
  res: Response
) => {
  const { start, end } = req.query;
  try {
    const interactions = await Interaction.find({
      date: { $gte: start, $lte: end },
    });

    res.status(200).json(interactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllInteractions = async (req: Request, res: Response) => {
  try {
    const interactions = await Interaction.find();

    res.status(200).json(interactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createInteraction = async (req: Request, res: Response) => {
  const newInteraction = new Interaction(req.body);

  try {
    await newInteraction.save();
    res.status(201).json(newInteraction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateInteraction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const interaction = req.body;

  await Interaction.findByIdAndUpdate(id, interaction, {
    new: true,
  });

  res.json({ message: "Interaction updated successfully." });
};

export const deleteInteraction = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Interaction.findByIdAndDelete(id);

  res.json({ message: "Interaction deleted successfully." });
};
