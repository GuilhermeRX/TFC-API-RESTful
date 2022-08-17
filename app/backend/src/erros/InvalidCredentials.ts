export default class InvalidCredentials extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}
