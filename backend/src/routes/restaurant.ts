import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("You've reached the restaurants endpoint!");
});

export default router;
