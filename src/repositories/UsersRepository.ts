import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import Users from '../models/Users';
import { CreateUserDTO, ResultUserDTO } from '../dtos/users';

@EntityRepository(Users)
export default class UsersRepository extends Repository<Users> {
    async createUser(user: CreateUserDTO): Promise<ResultUserDTO | boolean> {
        try {
            const result = this.create(user);

            await this.save(result);

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async listUsers(): Promise<ResultUserDTO[] | boolean> {
        // TO-DO: ADD PARAMS TO USE QUERY PARAMS TO SELECT SPECIFIC USERS
        try {
            const result = await this.find();

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findUserById(id: string): Promise<ResultUserDTO | null | boolean> {
        try {
            const result = await this.findOne(id);

            if (!result) {
                return null;
            }

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findUserByEmail(email: string): Promise<ResultUserDTO | null> {
        try {
            const result = await this.findOne({
                where: { email },
                select: [
                    'id',
                    'email',
                    'password',
                    'name',
                    'surname',
                    'photo_address',
                    'phone',
                    'role',
                    'active',
                    'createdAt',
                ],
            });

            if (!result) {
                return null;
            }

            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateUserById(
        id: string,
        user: CreateUserDTO,
    ): Promise<ResultUserDTO | null | boolean> {
        try {
            await this.update(id, user);

            const updatedUser = await this.findOne(id);

            if (!updatedUser) {
                return null;
            }

            return updatedUser;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteUserById(id: string) {
        try {
            const result = await this.delete(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
