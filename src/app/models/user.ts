export class User {
  public id?: number;
  public name?: string;
  public password?: string;
  public email?: string;
  public created_at?: string;
  public pay_date?: string;
  public photo_url?: string;
  public photo_name?: string;
  public confirmCode?: string;
  constructor(id = 0) {
    this.id = id;
  }
}
