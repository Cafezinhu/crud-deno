import { Response, Request } from 'https://deno.land/x/oak/mod.ts';
import { getDinosaurs } from '../models/dinosaur.ts';

const dinosaurs = getDinosaurs();

export class DinosaurController{
    static getAll({response}: {response: Response}): void{
        ok(response, dinosaurs);
    }
}

function ok(response: Response, body: any){
    response.status = 200;
    response.body = body;
}