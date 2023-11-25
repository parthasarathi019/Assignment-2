import { Model } from "mongoose";

export type IAddress = {
  street: string;
  city: string;
  country: string;
};
export type IFullName = {
  firstName: string;
  lastName: string;
};

export type IOrder = {
  productName: string;
  price: number;
  quantity: number;
}

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrder[];
};

export interface  IsUserIdExistsModel extends Model<IUser>{
  isUserExists(id: string) : Promise<IUser | null>;
}

