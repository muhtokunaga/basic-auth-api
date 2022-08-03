import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export function UserRepository() {
	return AppDataSource.getRepository(User);
}