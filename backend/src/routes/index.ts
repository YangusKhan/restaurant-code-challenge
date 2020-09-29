import { Router, Request, Response } from "express";
import restaurantRouter from "./restaurant";

// Init routers
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("You've reached the API endpoint!");
});
router.use("/restaurants", restaurantRouter);

// Export the base router
export default router;
