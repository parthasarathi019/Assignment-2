import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IUser, IsUserIdExistsModel, IOrder } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<IFullName>({
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
});

const addressSchema = new Schema<IAddress>({
  street: { type: 'string', required: true },
  city: { type: 'string', required: true },
  country: { type: 'string', required: true },
});

const orderSchema = new Schema<IOrder>({
  productName: { type:'string', required: true },
  price: { type: 'number', required: true },
  quantity: { type: 'number', required: true },
})

const userSchema = new Schema<IUser,IsUserIdExistsModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: [orderSchema]
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function(id: string){
 const userExists = await UserModel.findOne({userId:id})
 return !!userExists; 
}

export const UserModel = model<IUser,IsUserIdExistsModel>('User', userSchema);
