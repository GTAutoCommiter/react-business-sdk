import { HttpClient } from '../../../core/http/types';
import { Permission } from '../types';

export class PermissionService {
  constructor(private httpClient: HttpClient) {}

  async getUserPermissions(): Promise<Permission[]> {
    return this.httpClient.get<Permission[]>('/api/permissions/me');
  }
}
