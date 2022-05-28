import { Configuration } from "build/expense-tracker-frontend-api";

export const environment = {
  production: false,
  apiConfiguration: new Configuration({
    basePath: "http://192.168.1.85:8080"
  })
};
