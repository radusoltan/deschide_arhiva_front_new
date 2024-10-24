import {Client} from "@elastic/elasticsearch"

export const client = new Client({
  node: process.env.ELASTIC_HOST,
  auth: {
    apiKey: process.env.ELASTIC_KEY
  },
  tls: {
    rejectUnauthorized: false
  }
})