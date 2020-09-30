import "./LoadEnv"; // Must be the first import
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import apiRouter from "./build/backend/routes";
import logger from "./build/backend/shared/Logger";
import "express-async-errors";

const app = express();
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const frontendDir = path.join(path.resolve("./"), "build", "frontend");
app.use(express.static(frontendDir));
app.use("/api", apiRouter);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(400).json({
    error: err.message,
  });
});

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info("Express server started on port: " + port);
});
