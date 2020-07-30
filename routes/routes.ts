import { Router } from 'https://deno.land/x/oak/mod.ts';
import { DinosaurController } from '../controllers/dinosaur-controller.ts';


const router = new Router();

router.get("/api/v1/dinosaurs", DinosaurController.getAll)
    .get("/api/v1/dinosaurs/:name", DinosaurController.get.bind(DinosaurController))
    .post("/api/v1/dinosaurs", DinosaurController.create)
    .put("/api/v1/dinosaurs/:name", DinosaurController.update.bind(DinosaurController))
    .delete("/api/v1/dinosaurs/:name", DinosaurController.delete.bind(DinosaurController));

export default router;