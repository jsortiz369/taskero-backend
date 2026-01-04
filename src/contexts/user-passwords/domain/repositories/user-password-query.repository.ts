export abstract class IUserPasswordQueryRepository {
  abstract findOneById(id: string): Promise<any>;
}
