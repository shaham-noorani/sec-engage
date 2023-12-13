import { Request, Response } from "express";

import { Queue } from "../models/queue.model";
import { Interaction } from "../models/interaction.model";

export const getStudentInQueue = async (req: Request, res: Response) => {
  const { studentid } = req.params;

  const queue = await Queue.findOne({
    "studentsInLine.studentId": studentid,
  });

  if (!queue) {
    return res.status(200).json(null);
  }

  const { companyName, majors, studentsInLine } = queue;

  const studentInLine = studentsInLine.find(
    student => student.studentId.toString() === studentid
  );

  const { ticketCode, joinedAt } = studentInLine;

  const timeWaited = Date.now() - joinedAt.getTime();

  const sortedStudentsInLine = studentsInLine.sort(
    (a, b) => a.joinedAt.getTime() - b.joinedAt.getTime()
  );
  const positionInLine = sortedStudentsInLine.findIndex(
    student => student.studentId.toString() === studentid
  );

  return res.status(200).json({
    companyName,
    majors,
    ticketCode,
    timeWaited,
    positionInLine,
  });
};

export const getCompanyQueues = async (req: Request, res: Response) => {
  const { companyid } = req.params;

  const queues = await Queue.find({ companyId: companyid });

  return res.status(200).json(queues);
};

export const createQueue = async (req: Request, res: Response) => {
  const { companyid } = req.params;
  const { companyName, majors } = req.body;

  const newQueue = new Queue({
    companyId: companyid,
    companyName,
    majors,
  });

  await newQueue.save();

  return res.status(200).json({
    queueId: newQueue._id,
  });
};

export const joinQueue = async (req: Request, res: Response) => {
  const { queueid } = req.params;
  const { studentId, phoneNumber, name } = req.body;

  const queue = await Queue.findById(queueid);

  if (!queue) {
    return res.status(404).json({
      message: "Queue not found",
    });
  }

  const { companyName, majors } = queue;

  const ticketCode = "ABC";

  const studentInLine = {
    studentId,
    phoneNumber,
    name,
    ticketCode,
  };

  queue.studentsInLine.push(studentInLine);

  await queue.save();

  return res.status(200).json({
    companyName,
    majors,
    ticketCode,
  });
};

export const removeFromQueue = async (req: Request, res: Response) => {
  const { studentid } = req.params;

  const queue = await Queue.findOne({
    "studentsInLine.studentId": studentid,
  });

  if (!queue) {
    return res.status(404).json({
      message: "Student not found in any queue",
    });
  }

  queue.studentsInLine = queue.studentsInLine.filter(
    student => student.studentId.toString() !== studentid
  );

  await queue.save();

  return res.status(200).json({
    message: "Successfully removed student from queue",
  });
};

export const createInteraction = async (req: Request, res: Response) => {
  const { companyid, representativeid, studentid } = req.params;

  const queue = await Queue.findOne({
    "studentsInLine.studentId": studentid,
  });

  // remove student from line
  queue.studentsInLine = queue.studentsInLine.filter(
    student => student.studentId.toString() !== studentid
  );
  await queue.save();

  // create interaction
  const newInteraction = new Interaction({
    studentId: studentid,
    companyId: companyid,
    representativeId: representativeid,
    date: Date.now(),
  });
  await newInteraction.save();

  return res.status(200).json({
    interactionId: newInteraction._id,
  });
};

export const notifyNext = async (req: Request, res: Response) => {
  const { queueid } = req.params;
  const { numberToNotify } = req.query as { numberToNotify: string };

  const queue = await Queue.findById(queueid);

  if (!queue) {
    return res.status(404).json({
      message: "Queue not found",
    });
  }

  const { studentsInLine } = queue;

  const sortedStudentsInLine = studentsInLine.sort(
    (a, b) => a.joinedAt.getTime() - b.joinedAt.getTime()
  );

  const studentsToNotify = sortedStudentsInLine.slice(
    0,
    parseInt(numberToNotify)
  );

  // send text to studentsToNotify
  studentsToNotify.forEach(student => {
    console.log(
      `Sending: 'It's your turn! Your code is ${student.ticketCode}.' to ${student.phoneNumber}`
    );
  });

  // update notifiedAt for students in queue
  queue.studentsInLine = queue.studentsInLine.map(student => {
    if (
      studentsToNotify.find(
        s => s.studentId.toString() === student.studentId.toString()
      )
    ) {
      return {
        ...student,
        notifiedAt: new Date(),
      };
    }
    return student;
  });

  await queue.save();
};
