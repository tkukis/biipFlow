import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";


const itsTest = process.env.NODE_ENV === "test"
const entities = []
let connPromise
export default function () {
    if (connPromise) {
        return connPromise
    }
    connPromise = new Promise((resolve, reject) => {

        const conn = createConnection({
            type: "postgres",
            host: "localhost",
            port: itsTest ? 5416 : 5412,
            username: "admin",
            password: "a010o8h84pk67510o8h",
            database: "postgres",
            synchronize: true,
            logging: false,
            entities
        }).then(async _ => {
            if (itsTest) {
                console.log("it is test environment, all data will be removed")
                for (let entityI = 0; entityI < entities.length; entityI++) {
                    const entity = entities[entityI];
                    await getRepository(entity).delete({})
                }
            }
          
            console.log("DB ready!")

            resolve(conn)
        }).catch(error => {
            console.log(error)
        });
    })
    return connPromise

}
