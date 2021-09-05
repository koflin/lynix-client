import { CompanyBase } from './base/companyBase';

export interface Media extends CompanyBase {
  id: string;

  uploadedBy: string;
  uploadedAt: Date;

  url: string;
}
