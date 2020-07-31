import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

var client: Client;

const dbname = 'dinosaursdb';
const tablename = 'dinosaurs';
class Database{
    static async start(){
        const username = config().DBUSERNAME;
        const password = config().DBPASSWORD;

        client = await new Client().connect({
            hostname: "127.0.0.1",
            username: username,
            password: password,
        });

        await client.execute(`CREATE DATABASE IF NOT EXISTS ${dbname}`);
        await client.execute(`USE ${dbname}`);

        await client.execute(`CREATE TABLE IF NOT EXISTS ${tablename} (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            height float(10) NOT NULL,
            width float(10) NOT NULL,
            walking_style varchar(20) NOT NULL,
            eating_habit varchar(20) NOT NULL,
            PRIMARY KEY (id)
        )`);
    }

    static getDatabase(): Client{
        return client;
    }
}

export default Database;