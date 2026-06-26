export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface UserProfile extends User {
  department?: string;
  title?: string;
  phone?: string;
  [key: string]: any;
}
