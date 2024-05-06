const apiDomaine = process.env.NEXT_PUBLIC_API_DOMAINE || null;

async function fetchProperties() {
  try {
    if (!apiDomaine) {
      return;
    }
    let uri = `${apiDomaine}/properties`;
    const response = await fetch(
      uri
      //{ cache: "no-cache" }
    );
    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error("Failed to load data");
    }
    return responseBody;
  } catch (error) {
    console.error(error);
  }
  return {};
}

// Fetch sing property

async function fetchSingleProperty(id) {
  //console.log("WELCOMMMMMME!");
  try {
    if (!apiDomaine) {
      return null;
    }
    let uri = `${apiDomaine}/property/${id}`;
    // let uri = "http://localhost:3000/api/property/662bb70e10ef09c8e7afa300";
    console.log("UUUUUUUUUUUUUUURI", uri);
    const response = await fetch(uri);
    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error("Failed to load data");
      return;
    }
    // console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
  }
  return null;
}
export { fetchProperties, fetchSingleProperty };
