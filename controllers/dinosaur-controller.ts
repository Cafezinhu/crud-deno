import { Response, Request } from 'https://deno.land/x/oak/mod.ts';
import { Dinosaur } from '../models/dinosaur.ts';
import Database from '../db/database.ts';

export class DinosaurController{

    static jsonToDinosaur(json: any): Dinosaur{
        let dinosaur: Dinosaur = new Dinosaur(json.name, json.height, json.width, json.walking_style, json.eating_habit, json.id);
        return dinosaur;
    }

    static jsonToArray(json: Array<any>): Array<Dinosaur>{
        let dinosaurs: Array<Dinosaur> = [];
        json.forEach(dinosaur => {
            dinosaurs.push(DinosaurController.jsonToDinosaur(dinosaur))
        });
        return dinosaurs;
    }


    static async getAll({response}: {response: Response}){
        let result = await Database.getDatabase().query(`SELECT * FROM dinosaurs`);
        let dinosaurs: Array<Dinosaur> = DinosaurController.jsonToArray(result);

        ok(response, dinosaurs);
    }

    static async get({params, response}: {params:{id: string}, response: Response}){
        let result = await Database.getDatabase().query(`
            SELECT * FROM dinosaurs WHERE id = ?`, [parseInt(params.id)]
        );

        if(result.toString() != ""){
            let dinosaur: Dinosaur = DinosaurController.jsonToArray(result)[0];
            ok(response, dinosaur);
        }else{
            notFound(response, "Dinosaur not found.");
        }
    }

    static async create({request, response}: {request: Request, response: Response}){
        let dinosaur: Dinosaur = await request.body().value;

        await Database.getDatabase().execute(
            `INSERT INTO dinosaurs(name, height, width, walking_style, eating_habit) VALUES(?, ?, ?, ?, ?)`, 
            [dinosaur.name, dinosaur.height, dinosaur.width, dinosaur.walkingStyle, dinosaur.eatingHabit]
        );
        ok(response, {message: `${dinosaur.name} created successfully.`});
    }

    static async update({params, request, response}: {params:{id: string}, request: Request, response: Response}){
        let dinosaur: Dinosaur = await request.body().value;
        
        let result = await Database.getDatabase().execute(`
            UPDATE dinosaurs SET name = ?, height = ?, width = ?, walking_style = ?, eating_habit = ? WHERE id = ?
            `, [dinosaur.name, dinosaur.height, dinosaur.width, dinosaur.walkingStyle, dinosaur.eatingHabit, parseInt(params.id)]
        );
        
        if(result.affectedRows != 0)
            ok(response, {message: `Dinosaur updated successfully.`});
        else
            notFound(response, "Dinosaur not found.");
    }
    
    static async delete({params, response}: {params:{id: string}, response: Response}){
        let result = await Database.getDatabase().execute(`
            DELETE FROM dinosaurs WHERE id = ?
        `, [parseInt(params.id)]);

        if(result.affectedRows != 0)
            ok(response, {message: `Dinosaur successfully deleted. Now it's extinct.`});
        else
            notFound(response, "Dinosaur not found.");
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