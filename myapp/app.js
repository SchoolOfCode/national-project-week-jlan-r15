import express from "express";
const app = express();
const PORT = 3000;

import {
  getLinks,
  updateLinkByID,
  getLinkByID,
  createLink,
  deleteLinkByID,
} from "./models/functions.js";

app.use(express.static("public"));
app.use(express.json());

/*our front-end */
app.get("/", function (req, res) {
  res.sendFile(html);
});

app.get("/link/:id", async function (req, res) {
  console.log(req.params.id);
  var linkByID = await getLinkByID(req.params.id);
  if (linkByID) {
    res.json({
      success: true,
      payload: linkByID,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

app.get("/links", async function (req, res) {
  const allLinks = await getLinks();
  res.json({
    success: true,
    payload: allLinks,
  });
});

app.post("/links", async function (req, res) {
  let newLinks = req.body;
  newLinks = await createLink();
  res.json({
    success: true,
    payload: newLinks,
  });
});

app.put("/link/:id", async function (req, res) {
  let updatedLink = await updateLinkByID(req.params.id, req.body);
  res.json({
    success: true,
    payload: updatedLink,
  });
});

app.delete("/links/:id", async function (req, res) {
  const deletedLink = await deleteLinkByID(req.params.id);
  res.json({
    success: true,
    payload: deletedLink,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
