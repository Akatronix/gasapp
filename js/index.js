let inputValue = document.getElementById("text");
let sendButton = document.getElementById("button");
let container = document.querySelector(".messages");

// Function to make an HTTPS POST request
async function makePostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log("POST Response:", responseData);
  } catch (error) {
    console.error("Error making POST request:", error);
  }
}

// Function to make an HTTPS GET request
async function makeGetRequest(url) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    console.log("GET Response:", responseData);
    let htmlToAppend = `
            <div class="bot">
                <div class="col">
                    <p class="text">Gas value: ${responseData.gas} </p>
                    <p class="text"> switch state: ${responseData.toggle}</p>
                </div>
            </div>
        `;
    container.insertAdjacentHTML("beforeend", htmlToAppend);
    container.scrollTop = container.scrollHeight;
  } catch (error) {
    console.error("Error making GET request:", error);
  }
}

// URL for POST and GET requests
const postUrl = "https://backend-server-ruby.vercel.app/control";
const getUrl = "https://backend-server-ruby.vercel.app/message";

// Data to send in the POST request
const ONData = {
  control: "ON",
};
const OFFData = {
  control: "OFF",
};

// Function to run POST and GET requests every second
function runRequests() {
  makeGetRequest(getUrl);
}

// Run requests every 1 second
//setInterval(runRequests, 1000 * 12);
setInterval(runRequests, 1000);

sendButton.onclick = sendControl;

function sendControl() {
  let dataSend = inputValue.value;

  let htmlToAppend = `
            <div class="you">
            <div>
              <div class="col">
                <p class="text">${dataSend}</p>
              </div>
            </div>
        `;
  container.insertAdjacentHTML("beforeend", htmlToAppend);
  container.scrollTop = container.scrollHeight;

  let valueData = dataSend.toUpperCase();
  console.log(valueData);

  if (valueData === "ON") {
    makePostRequest(postUrl, ONData);
  } else if (valueData === "OFF") {
    makePostRequest(postUrl, OFFData);
  }
  inputValue.value = "";
}
