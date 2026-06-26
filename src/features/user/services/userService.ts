import { HttpClient } from '../../../core/http/types';
import { UserProfile } from '../types';

export class UserService {
  constructor(private httpClient: HttpClient) {}

  async getCurrentUser(): Promise<UserProfile> {
    return this.httpClient.get<UserProfile>('/api/user/me');
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.httpClient.get<UserProfile>(`/api/user/${userId}/profile`);
  }
}
