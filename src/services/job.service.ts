import { NextFunction } from "express";
import { Job } from "../models/Job";

let exampleJobs: Job[] = [
    {id: "0", title: "Job 1", description: "THIS IS AN EXAMPLE JOB"},
    {id: "1", title: "Job 2", description: "THIS IS AN EXAMPLE JOB"},
    {id: "2", title: "Job 3", description: "THIS IS AN EXAMPLE JOB"},
]

function generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// EVENTUALLY NEEDS TO TURN INTO PUBLIC STATIC ASYNC AND RETURN PROMISE
export class JobService {
    getAll(): Job[] {
        try {
            return exampleJobs
        }
        catch (err) {
            throw new Error('Unknown error getting all Jobs')
        } 
    }

    getJobById(id: string): Job {
        const job = exampleJobs.find(job => job.id === id);
        if(!job) throw new Error('Job not found.');
        return job;
    }

    deleteJob(id: string): void {
        const index = exampleJobs.findIndex(job => job.id === id)
        if(index === -1) throw new Error ('Job not found')
        exampleJobs.splice(index, 1)
    }

    updateJob(id: string, updatedJob: Job): Job {
        const index = exampleJobs.findIndex(job => job.id === id)
        if(index === -1) throw new Error ('Job not found')
        exampleJobs[index] = updatedJob
        return exampleJobs[index]
    }

    create(): Job {
        try {
            const newId = generateID()
            const newJob = {id: newId, title: "New Job", description: "ThIS IS A TEST"}
            exampleJobs.push(newJob)
            return newJob
        } catch (err) {
            throw new Error('Error making new Job')
        }
    }
}