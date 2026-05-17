module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { start, end, profile = "foot-walking" } = request.body || {};

  if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 2 || end.length !== 2) {
    return response.status(400).json({ error: "Expected start and end as [lng, lat]." });
  }

  const orsApiKey = process.env.ORS_API_KEY || "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjkyNDA1ODQzODA4NzQ1MDU4NGJkY2M0NWY0MGU5NDkzIiwiaCI6Im11cm11cjY0In0=";

  try {
    const routeResponse = await fetch(`https://api.openrouteservice.org/v2/directions/${profile}/geojson`, {
      method: "POST",
      headers: {
        "Authorization": orsApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ coordinates: [start, end] })
    });

    const payload = await routeResponse.json();
    return response.status(routeResponse.status).json(payload);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch route" });
  }
}
