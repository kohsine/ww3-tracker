import { gql_docker_fetcher } from "../../../utils/fetcher"

export default async function handler(req, res) {

  console.log("we got to the handler");
  console.log("body is " + JSON.stringify(req.body.query));
  const data = await gql_docker_fetcher(req.body.query);
  console.log("data is " + JSON.stringify(data));
    // Get data from your database
  res.status(200).json(data);
 //res.status(200).json({users: "asdf", something: "two"});
 //res.status(200).json("ok");
}