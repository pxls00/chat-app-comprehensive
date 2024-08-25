import ApiError from "../utils/api-errors";

export default function (err: any, req: any, res: any, next: (payload?: any) => void) {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }

  return res.status(500).json({message: "Internal server error"})
}