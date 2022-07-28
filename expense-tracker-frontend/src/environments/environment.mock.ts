import { Configuration } from "build/expense-tracker-frontend-api";

export const environment = {
  production: false,
  apiConfiguration: new Configuration({
    basePath: "http://127.0.0.1:4010"
  })
};
