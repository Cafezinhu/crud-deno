import { Router } from 'https://deno.land/x/oak/mod.ts';
import { DinosaurController } from '../controllers/dinosaur-controller.ts';


const router = new Router();

router.get("/api/v1/dinosaurs", DinosaurController.getAll)
    .get("/api/v1/dinosaurs/:name", DinosaurController.get)
    .post("/api/v1/dinosaurs", DinosaurController.create)
    .put("/api/v1/dinosaurs/:name", DinosaurController.update)
    .delete("/api/v1/dinosaurs/:name", DinosaurController.delete);

export default router;