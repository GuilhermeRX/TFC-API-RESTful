export default class NotFoundError extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}
