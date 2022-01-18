import links from "../data/data.js";

// getLinkByID should return the particular links we are looking for
// createLink should add a link to the collection and return the new link
// updateLinkByID should replace the link at a certain ID with an updated version and return the new link
// deleteLinkByID should remove the specific links from the video collection, and return the deleted link
// GET ALL Links
// getLinks should return an array of all links
export async function getLinks() {
  return links;
}

export async function getLinksByQuery(query, title) {
  console.log("functionQuery", query);
  const foundLink = links.find(function (link) {
    if (query) {
      return link.topic.toLowerCase() === query.toLowerCase();
    }
    if (title) {
      return link.title.toLowerCase() === title.toLowerCase();
    }
  });
  return foundLink;
}

// GET A Link BY ID
export async function getLinkByID(id) {
  console.log("id:" + id);
  var linkById = links.find((link) => {
    console.log(link);
    return link.id == id;
  });
  console.log("Link found: ");
  console.log(linkById);
  if (linkById) {
    return linkById;
  }
}

// CREATE A Link
export async function createLink(link) {
  links.push(link);
  return links[links.length - 1];
}

// UPDATE A Link BY ID
export async function updateLinkByID(id, updates) {
  //take in the id, take in an updated link
  //find the link with the id matching what we were given.
  //replace that link with the updates
  //return new link
  const foundIndex = links.findIndex(function (link) {
    return links.id === id;
  });
  links[foundIndex] = updates;
  return links[foundIndex];
}

// DELETE A link BY ID
export async function deleteLinkByID(id) {
  //take an item with that id
  //find that item from the array
  const foundIndex = links.findIndex(function (link) {
    return link.id === id;
  });
  const item = links[foundIndex];
  //remove it from array
  //return that removed item
  links.splice(foundIndex, 1);
  return item;
}
