export default class ApiError extends Error {
    status;
    errors;
  
    constructor(status: number, message: string, errors: any[] = []) {
      super(message);
  
      this.status = status;
      this.errors = errors;
    }
  
    static UnathorizedError() {
      return new ApiError(401, "User unauthorized");
    }
  
    static BadRequest(message: string, errors: any[] = []) {
      return new ApiError(400, message, errors)
    }
  
    static ServerError(message: string, errors: any[] = []) {
      return new ApiError(500, message, errors)
    }
}