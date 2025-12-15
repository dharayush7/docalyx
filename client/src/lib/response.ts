import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientRustPanicError,
} from "@prisma/client/runtime/client";

const response = {
  success: <T>(data: T, msg?: string) => {
    return {
      success: true,
      data: data,
      msg: msg || "Success fully proceeded",
    };
  },
  error: (err: unknown) => {
    let msg = "An error occurred";
    if (err instanceof PrismaClientInitializationError) {
      msg = "Database connection error. Please try again later.";
    } else if (err instanceof PrismaClientKnownRequestError) {
      msg = `Database request error`;
    } else if (err instanceof PrismaClientUnknownRequestError) {
      msg = "Unknown database error occurred.";
    } else if (err instanceof PrismaClientValidationError) {
      msg = "Database validation error occurred.";
    } else if (err instanceof PrismaClientRustPanicError) {
      msg = "Database rust panic error occurred.";
    } else if (err instanceof Error) {
      msg = err.message;
    }
    return {
      success: false,
      msg: msg,
      data: null,
    };
  },
};

export default response;
