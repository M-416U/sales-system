async function testEndpoint(method, url, data = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayResponse(url, result);
  } catch (error) {
    displayResponse(url, { error: error.message });
  }
}

function displayResponse(url, data) {
  const endpointId = url.replace("/api/", "").replace(/\//g, "-");
  const responseElement = document.getElementById(`response-${endpointId}`);
  if (responseElement) {
    responseElement.textContent = JSON.stringify(data, null, 2);
    responseElement.parentElement.style.display = "block";
  }
}
