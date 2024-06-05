export type DRPError = {
  message: string;
};

export type DRPResponse<T> =
  | {
      error: null;
      data: T;
    }
  | {
      error: DRPError;
      data: null;
    };
