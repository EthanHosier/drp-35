export type DRPError = {
  message: string;
};

export type DRPResponse =
  | {
      error: null;
      data: any;
    }
  | {
      error: DRPError;
      data: null;
    };
