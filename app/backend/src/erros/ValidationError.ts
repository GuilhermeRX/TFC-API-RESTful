export default class ValidationError extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}
