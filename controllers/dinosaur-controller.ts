import { Response, Request } from 'https://deno.land/x/oak/mod.ts';
import { getDinosaurs, IDinosaur } from '../models/dinosaur.ts';

const dinosaurs = getDinosaurs();

export class DinosaurController{

    private static _search(name: string): Array<IDinosaur> | undefined{
        return dinosaurs.filter(dinosaur => dinosaur.name.toLowerCase().includes(name.toLowerCase()));
    }

    static getAll({response}: {response: Response}): void{
        ok(response, dinosaurs);
    }

    static get({params, response}: {params:{name: string}, response: Response}): void{
        let dinosaurs: Array<IDinosaur> | undefined = this._search(params.name);
        if(dinosaurs){
            ok(response, dinosaurs);
        }else{
            notFound(response, "Dinosaur not found");
        }
    }
}

function ok(response: Response, body: any){
    response.status = 200;
    response.body = body;
}

function notFound(response: Response, message: string){
    response.status = 404;
    response.body = {message: message};
}