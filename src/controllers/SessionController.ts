import { Request, Response } from "express";
import { SessionService } from "../services/SessionService";

export class SessionController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const sessionService = new SessionService();
    const result = await sessionService.login({ email, password });

    if (result instanceof Error) {
		return response.status(403).json(result.message);
    }
    return response.status(200).json(result);
  }
}