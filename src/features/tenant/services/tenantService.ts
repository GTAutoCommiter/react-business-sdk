import { HttpClient } from '../../../core/http/types';
import { Tenant } from '../types';

export class TenantService {
  constructor(private httpClient: HttpClient) {}

  async getCurrentTenant(): Promise<Tenant> {
    return this.httpClient.get<Tenant>('/api/tenant/current');
  }

  async getTenants(): Promise<Tenant[]> {
    return this.httpClient.get<Tenant[]>('/api/tenant/list');
  }
}
