import { Router } from "express";
import { analyze, home, pensum } from "../controllers/analyze.controller";

const analyzeRouter = Router();

analyzeRouter.get('/', home);
analyzeRouter.post('/analyze', analyze);
analyzeRouter.get('/pensum/:id', pensum);

export default analyzeRouter;