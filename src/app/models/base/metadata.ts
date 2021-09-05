import { User } from '../user';

export interface MetadataEntity {
  readonly createdAt?: Date;
  readonly createdBy?: User;
  readonly editedAt?: Date;
  readonly editedBy?: User;
  readonly deletedAt?: Date;
  readonly deletedBy?: User;
}
