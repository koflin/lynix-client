import { MetadataEntity } from './base/metadata';

export interface Company extends MetadataEntity {
  id: string;
  name: string;
  logo?: string;
}
