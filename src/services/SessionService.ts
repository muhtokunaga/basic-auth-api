import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";

type UserRequest = {
  email: string;
  password: string;
};

export class SessionService {
  async login({ email, password }: UserRequest) {

    const user = await UserRepository().findOneBy({ email });

    if (!user) {
      return new Error("User does not exists!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("User or Password incorrect");
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    });

    return { token };
  }
}
