import { Response, Request } from 'https://deno.land/x/oak/mod.ts';
import { getDinosaurs, IDinosaur } from '../models/dinosaur.ts';

var dinosaurs = getDinosaurs();

export class DinosaurController{

    private static _search(name: string, exact: boolean = false): Array<IDinosaur>{
        if(exact)
            return dinosaurs.filter(dinosaur => dinosaur.name.toLowerCase() === name.toLowerCase());
        return dinosaurs.filter(dinosaur => dinosaur.name.toLowerCase().includes(name.toLowerCase()));
    }


    static getAll({response}: {response: Response}){
        ok(response, dinosaurs);
    }

    static get({params, response}: {params:{name: string}, response: Response}){
        let dinosaurs: Array<IDinosaur> = this._search(params.name);
        if(dinosaurs.length > 0){
            ok(response, dinosaurs);
        }else{
            notFound(response, "Dinosaur not found");
        }
    }

    static async create({request, response}: {request: Request, response: Response}){
        let dinosaur: IDinosaur = await request.body().value;
        dinosaurs.push(dinosaur);
        ok(response, {message: `${dinosaur.name} creates successfully.`});
    }

    static async update({params, request, response}: {params:{name: string}, request: Request, response: Response}){
        let dinosaur: IDinosaur | undefined = this._search(params.name, true)[0];

        if(dinosaur){
            for(let index in dinosaurs){
                if(dinosaurs[index].name.toLowerCase() === params.name.toLowerCase()){
                    let newDinosaur: IDinosaur = await request.body().value;
                    dinosaurs[index] = newDinosaur;
                    break;
                }
            }

            ok(response, {message: `Dinosaur updated successfully.`});
        }else{
            notFound(response, "Dinosaur nor found");
        }
    }
    
    static delete({params, response}: {params:{name: string}, response: Response}){
        let dinosaur: IDinosaur | undefined = this._search(params.name, true)[0];

        if(dinosaur){
            dinosaurs = dinosaurs.filter(dino => dino.name != params.name);

            ok(response, {message: `${params.name} successfully deleted. Now it's extinct.`});
        }else{
            notFound(response, "Dinosaur not found.");
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