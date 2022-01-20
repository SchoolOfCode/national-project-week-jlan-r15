import query from "./index.js";

const sqlString = `CREATE TABLE IF NOT EXISTS resources (id SERIAL PRIMARY KEY, title TEXT, topic TEXT, url TEXT )`;

async function createResourcesTable() {
 const res = await query(sqlString);
 console.log('Created table', res);
}
createResourcesTable();