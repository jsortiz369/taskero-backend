import { UserPassword } from '../user-password';

export abstract class IUserPasswordCommandRepository {
  abstract create(data: UserPassword): Promise<UserPassword>;
}
