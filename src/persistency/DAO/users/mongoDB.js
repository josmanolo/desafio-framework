import MongoDBContainer from '../../containers/mongoDBContainer.js';
import userModel from '../../../models/mongoose/users.model.js';
import { loggerError } from '../../../config/log4.js';

let instanceMongoDB = null;
class UsersDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = userModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new UsersDAOMongoDB();
    }
    return instanceMongoDB;
  };

  createUser = async (userData) => {
    try {
      const newUser = await this.collectionName.create(userData);
      return newUser;
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await this.collectionName.findOne(email);
      return user;
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.collectionName.findById(id);
      return user;
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  }
}

export default UsersDAOMongoDB;
