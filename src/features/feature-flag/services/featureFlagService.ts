import { HttpClient } from '../../../core/http/types';
import { FeatureFlag } from '../types';

export class FeatureFlagService {
  constructor(private httpClient: HttpClient) {}

  async getFeatureFlags(): Promise<FeatureFlag[]> {
    return this.httpClient.get<FeatureFlag[]>('/api/feature-flags');
  }
}
