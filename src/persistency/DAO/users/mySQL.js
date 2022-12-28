import SQLContainer from '../../containers/SQLContainer.js';
import MySQLConnection from '../../../config/databases/configMySQL.js';
import { loggerError } from '../../../config/log4.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import getUserById from '../../../utils/knex/getUserById.js';
import getUserByEmail from '../../../utils/knex/getUserByEmail.js';
import UserDTO from '../../DTO/userDTO.js';

const mysql = MySQLConnection.getMySQLConnectionInstance();

let instanceMySQL = null;
class UsersDAOMySQL extends SQLContainer {
  constructor() {
    super(mysql.configData(), 'users');
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new UsersDAOMySQL();
    }
    return instanceMySQL;
  };

  createUser = async (userData) => {
    try {
      const newUserId = await insertNewElement(this.config, this.tableName, userData);
      const newUser = await this.getUserById(newUserId[0]);
      return newUser;
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await getUserByEmail(this.config, email);
      if (!user) {
        return null;
      }
      return UserDTO.toDTO(user);
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };
  
  getUserById = async (id) => {
    try {
      const user = await getUserById(this.config, id);
      if (!user) {
        return null;
      }
      return UserDTO.toDTO(user);
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  }
}

export default UsersDAOMySQL;


