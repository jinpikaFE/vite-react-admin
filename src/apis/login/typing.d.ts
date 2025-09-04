declare namespace Login {
  type LoginEntity = Pick<User.UserEntity, 'username' | 'password'> & {
    code: string
    uuid: string
  }

  type LoginResponse = {
    token: string
    code: string
    expire: string
  }
}
