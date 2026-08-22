export class Agente {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public telefone?: string,
    public email?: string,
    public password?: string,
    public confirm_password?: string,
    public profile_id?: number,
    public cep?: string,
    public cidade?: number,
    public bairro?: string,
    public rua?: string,
    public numero?: string,
    public complemento?: string,
    public user_active?: boolean
  ){}
}
