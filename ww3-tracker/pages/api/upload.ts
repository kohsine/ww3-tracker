import uploadFile from "../../utils/s3";
import formidable from "formidable";
import fs from "fs";

// Process a POST request
const post = async (req: any, res: any) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (_err, fields, files) {
      if (files.file == null) throw new Error("file is undefined");
      if (Array.isArray(files.file)) throw new Error("file is array");
      if (fields.filename == null || Array.isArray(fields.filename))
        throw new Error("bad filename");
      console.log("fields", fields);
      await saveFile(files.file, fields.filename);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "max-age=180000");
      res.end(JSON.stringify("all good"));
    });
  } catch (err) {
    res.json(err);
    res.status(405).end();
  }
};

const saveFile = async (
  file: formidable.File,
  filename: string
): Promise<void> => {
  const data = fs.readFileSync(file.filepath);
  await uploadFile(filename, file.mimetype ?? "unknown mimetype", data);
  fs.unlinkSync(file.filepath);
};

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default (req: any, res: any) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
