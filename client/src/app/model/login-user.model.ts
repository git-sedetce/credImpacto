export class LoginUser {
  constructor(
    public email?: string,
    public password?: string,
    public confirm_password?: string,
    public user_pin?: string
  ) {}
}
