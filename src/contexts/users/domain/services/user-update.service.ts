export class UserUpdateService {
  constructor() {}

  async execute(User: any): Promise<string> {
    console.log('update user service');
    return await Promise.resolve('User update service executed');
  }
}
