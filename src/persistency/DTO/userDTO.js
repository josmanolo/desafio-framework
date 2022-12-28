class UserDTO {
  constructor({ id, email, password }) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  #toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
    };
  };

  static toDTO = (users) => {
    if (Array.isArray(users)) {
      return users.map((user) => new UserDTO(user).#toJSON()); 
    } else return new UserDTO(users);
  };
}

export default UserDTO;