import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

import {
  //   getLinks,
  updateLinkByID,
  getLinkByID,
  createLink,
  deleteLinkByID,
  getLinksByQuery,
} from "./models/functions.js";

app.use(express.static("public"));
app.use(express.json());

/*our front-end */
app.get("/", function (req, res) {
  res.json({ message: "its working" });
});

app.get("/links", async function (req, res) {
  console.log(req.query, req.params);
  const { name, topic, title } = req.query;
  if (topic) {
    const data = await getLinksByQuery(topic);
    return res.json({ success: true, payload: data });
  }
  if (name) {
    const linkName = await getLinkByID(name);
    return res.json({ success: true, payload: linkName });
  }
  if (title) {
    const data = await getLinksByQuery(null, title);
    return res.json({ success: true, payload: data });
  } else {
    return res.json({
      success: false,
      payload: null,
    });
  }
});

app.get("/links/:id", async function (req, res) {
  console.log(req.params.id);
  var linkByID = await getLinkByID(req.params.id);
  if (linkByID) {
    return res.json({
      success: true,
      payload: linkByID,
    });
  } else {
    return res.json({
      success: false,
    });
  }
});

// app.get("/links", async function (req, res) {
//   const allLinks = await getLinks();
//   res.json({
//     success: true,
//     payload: allLinks,
//   });
// });

app.post("/links", async function (req, res) {
  let newLinks = req.body;
  //newLinks = await createLink();
  const result = await createLink(newLinks);
  return res.json({
    success: true,
    //payload: newLinks,
    payload: result,
  });
});

app.put("/links/:id", async function (req, res) {
  let updatedLink = await updateLinkByID(req.params.id, req.body);
  return res.json({
    success: true,
    payload: updatedLink,
  });
});

app.delete("/links/:id", async function (req, res) {
  const deletedLink = await deleteLinkByID(req.params.id);
  return res.json({
    success: true,
    payload: deletedLink,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
