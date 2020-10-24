export interface Role {
  id: string;
  name: string;
  premissions: ('view' | 'execute' | 'edit')[];
}
