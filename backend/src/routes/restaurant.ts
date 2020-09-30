import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs-extra";

const router = Router();
const dataPath = path.join(
  path.resolve(__dirname, "../"),
  "data/restaurantData.json"
);

router.get("/", (req: Request, res: Response) => {
  const data = fs.readJSONSync(dataPath);
  res.json(data);
});

export default router;
