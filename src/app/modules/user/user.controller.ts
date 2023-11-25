/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import { UserZodSchema } from './user.validator';
import { IOrder, IUser } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodValidateData = UserZodSchema.parse(userData);
    const result = await userServices.createUser(zodValidateData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const getallUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getallUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const getSingleData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getSingleData(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Single User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User Id not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const result = await userServices.updateUserInfo(id, userData);
    if (result) {
      userData.password = '';
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: userData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User Id not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const deleteUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.deleteUserInfo(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User Id not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    const result = await userServices.addOrder(id, orderData);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order added successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User Id not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getOrders(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: {
          orders: result,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User Id not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getTotalPrice(id);
    
    if (result) {
      const totalOrderPrice: number = result.reduce((total: number, user: IUser) => {
        const orderTotal : any = user.orders?.reduce((priceTotal: number,order: IOrder) => {
          return priceTotal + order.price * order.quantity;
        },0)
        return total + orderTotal;
      },0) ;
      console.log(totalOrderPrice)  
      res.status(200).json({
        success: true,
        message: 'Total Price fetched successfully!',
        data: {
          totalPrice: totalOrderPrice,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User Id not found!',
        },
      });
    }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Worng!!',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

export const userControllers = {
  createUser,
  getallUsers,
  getSingleData,
  updateUserInfo,
  deleteUserInfo,
  addOrder,
  getOrders,
  getTotalPrice
};
