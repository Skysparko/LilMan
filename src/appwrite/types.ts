export interface loginUserAccount {
  email: string;
  password: string;
}

export interface registerUserAccount {
  name: string;
  email: string;
  password: string;
}

export interface taskType {
  name: string;
  userID: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  status: 'created' | 'progress' | 'completed' | 'failed';
}

export interface UserDataType {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: object;
  registration: string;
  status: boolean;
}
