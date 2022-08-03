import { Request, Response } from "express";
import { UserService } from "../services/UserService";



export class UserController {
	async add(request: Request, response: Response) {
		const { email, password, name } = request.body;

		if (!email || !password || !name) {
			return response.status(400).json({ message: "Invalid Body" })
		}
		const userService = new UserService();
		const result = await userService.add({ email, password, name });

		if (result instanceof Error) {
			return response.status(400).json({ message: result.message });
		}

		return response.status(201).json(result);
	}

	async update(request: Request, response: Response) {
		const { id } = request.params;
		const { email, password, name } = request.body;
		const userService = new UserService();
		const result = await userService.update(id, { email, password, name });

		if (result instanceof Error) {
			return response.status(400).json({ message: result.message });
		}

		return response.status(201).json(result);
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;
		const userService = new UserService();
		const result = await userService.delete(id);

		if (result instanceof Error) {
			return response.status(400).json({ message: result.message });
		}

		return response.status(204).json({ message: 'User Deleted' });
	}

	async listById(request: Request, response: Response) {
		const { id } = request.params;
		const userService = new UserService();
		const result = await userService.listById(id);

		return response.status(200).json(result);

	}

	async listAll(request: Request, response: Response) {
		const userService = new UserService();
		const result = await userService.listAll();
		return response.status(200).json(result);
	}


}