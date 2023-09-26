import { JobController } from "./controllers/job.controller";
import { JobService } from "./services/job.service";

class ServerGlobal {
    private static _instance: ServerGlobal;

    private _jobService: JobService
    private _jobController: JobController

    private constructor() {
        this._jobService = new JobService()
        this._jobController = new JobController(this._jobService);
    }

    public static getInstance(): ServerGlobal {
        if (!this._instance) {
          this._instance = new ServerGlobal();
        }
        return this._instance;
      }

    public get jobService(): JobService {
        return this._jobService
    }

    public get jobController(): JobController {
        return this._jobController
    }
}

export default ServerGlobal