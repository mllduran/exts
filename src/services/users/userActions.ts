import { ProvidersType } from "../../providers/Providers";

class UserActions {
  async getUsers(providers: ProvidersType): Promise<string> {
    const result = await providers.models.users.getUsers();
    return result;
  }
}

const userActions = new UserActions();

export default userActions;