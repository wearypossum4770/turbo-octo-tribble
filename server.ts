import { createRequestHandler } from "@remix-run/express"
import build from './build/index.js'
const port = process.env.PORT || 3000;
console.log(build)
export default {
port,
async fetch(resp){

return new Response("hello world")
}

}

