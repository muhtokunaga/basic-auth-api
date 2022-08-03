import { hash } from "bcryptjs";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

type UserRequest = {
	email: string;
	password: string;
	name: string;
};

export class UserService {
	async add({ email, password, name }: UserRequest): Promise<Error | User> {
		const existUser = await UserRepository().findOneBy({ email });

		if (existUser) {
			return new Error("User already exists");
		}

		const passwordHash = await hash(password, 8);

		const user = UserRepository().create({ email, password: passwordHash, name });

		await UserRepository().save(user);

		return user;
	}

	async update(id: string, { email, password, name }: UserRequest): Promise<Error | User>{
		const user = await UserRepository().findOneBy({id});
		if (!user) {
			return new Error("User does not exists");
		}

		const existUser = await UserRepository().findAndCountBy({email});
		if (existUser[1]> 0) {
			return new Error("Email already exists");
		}

		// user.id = id ? id : user.id;
		user.email = email ? email : user.email;
		user.password = password ? await hash(password, 8) : user.password;
		user.name = name ? name : user.name;

		await UserRepository().save(user);

		return user;
	}

	async delete(id: string){
		if(!await UserRepository().findOneBy({id})){
			return new Error("User does not exists.");
		}

		return await UserRepository().delete(id);
	}

	async listById(id: string){
		if(!await UserRepository().findOneBy({id})){
			return new Error("User does not exists.");
		}

		return await UserRepository().findOneBy({id});

	}

	async listAll(){
		return await UserRepository().find();
	}
}