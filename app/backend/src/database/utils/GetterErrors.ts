export default class GetterErrors extends Error {
  private _status: number;
  constructor(message: string, status: number) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}
