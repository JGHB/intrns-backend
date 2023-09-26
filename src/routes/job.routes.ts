import express from "express";
import { JobController } from "../controllers/job.controller";

export const jobRouter = express.Router()

jobRouter
    .route('/')
    .get(JobController.getAll)
    .post(JobController.createJob)

jobRouter
    .route('/:jobId')
    .get(JobController.getJobById)
    .delete(JobController.deleteJob)
    .put(JobController.updateJob)
