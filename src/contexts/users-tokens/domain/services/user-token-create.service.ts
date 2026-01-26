import { IUuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { UserToken } from '../user-token';
import { UserId } from 'src/contexts/users/domain/vo';
import { UserTokenId } from '../vo';

export class UserTokenCreateService {
  constructor(private readonly _uuidRepository: IUuidRepository) {}

  async execute(idUser: string): Promise<void> {
    const userToken = new UserToken(
      new UserTokenId(this._uuidRepository.generateUuid()),
      new UserId(idUser),
      this._uuidRepository.generateUuid(),
      new Date(),
    );

    console.log(userToken);
  }
}
