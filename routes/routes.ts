import { Router } from 'https://deno.land/x/oak/mod.ts';
import { DinosaurController } from '../controllers/dinosaur-controller.ts';


const router = new Router();

router.get("/api/v1/dinosaurs", DinosaurController.getAll);

export default router;