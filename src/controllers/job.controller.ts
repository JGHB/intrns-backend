import { NotFoundError } from "../errors/NotFoundError";
import { Job } from "../models/Job";
import { JobService } from "../services/job.service";
import { NextFunction, Request, Response } from "express";

export class JobController {

    private static jobService: JobService;

    constructor(jobService: JobService) {
        JobController.jobService = jobService;
    }

    // WILL NEED TO BE ASYNC EVENTUALLY
    public static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const jobs = await JobController.jobService.getAll();
            return res.status(200).send(jobs)
        } catch (err) {
            return next(err)
        }
    }

    public static async getJobById(req: Request, res: Response, next: NextFunction) {
        try {
            const jobId = req.params.jobId
            const job = await JobController.jobService.getJobById(jobId);
            return res.send(job)
        } catch (err) {
            if (err instanceof NotFoundError) {
                return res.status(404).send({ error: err.message });
            }
            return next(err);
        }
    }

    public static async createJob(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const newUser = await JobController.jobService.create();
            return res.status(201).send(newUser);
        } catch (err) {
            return next(err);
        }
    }

    public static async updateJob(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const jobId = req.params.jobId as string
            const jobRequest = req.body as Job
            console.log(req.body)
            const updatedJob = await JobController.jobService.updateJob(jobId, jobRequest)
            return res.status(200).send(updatedJob)
        } catch (err) {
            if (err instanceof NotFoundError) {
                return res.status(404).send({ error: err.message });
            }
            return next(err);
        }
    }

    public static async deleteJob(
        req: Request,
        res: Response,
        next: NextFunction,
    ) { 
        try {
            const jobId = req.params.jobId as string
            JobController.jobService.deleteJob(jobId)
            return res.sendStatus(204)
        } catch (err) {
            if (err instanceof NotFoundError) {
                return res.status(404).send({ error: err.message });
            }
            return next(err)
        }
    }
}