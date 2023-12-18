/**
 * Entry point for the Gmail add-on when composing or reading an email.
 */
function onGmailMessageOpen(e) {
  // Check the type of Gmail event
  if (e && e.gmail && e.gmail.messageId) {
    // Extract the URLs from the email content
    var urls = extractUrlsFromEmailContent(e);

    // Detect phishing for the extracted URLs
    var results = detectPhishing(urls);

    // Create a card to display the extracted URLs and phishing results
    var card = createUrlsCard(urls, results);

    // Return the card to be displayed in the Gmail add-on
    return card;
  } else {
    // If the event is not supported, return a default card
    return createDefaultCard("Unsupported event type.");
  }
}

/**
 * Entry point for the Gmail add-on when the user opens the sidebar.
 */
function startApp(e) {
  // Check the type of Gmail event
  if (e && e.gmail && e.gmail.messageId) {
    // Extract the URLs from the email content
    var urls = extractUrlsFromEmailContent(e);

    // Detect phishing for the extracted URLs
    var results = detectPhishing(urls);

    // Create a card to display the extracted URLs and phishing results
    var card = createUrlsCard(urls, results);

    // Return the card to be displayed in the Gmail add-on
    return card;
  } else {
    // If the event is not supported, return a default card
    return createDefaultCard("Unsupported event type.");
  }
}

/**
 * Extracts the URLs from the email content.
 * @param {Object} e - The event object representing the open email.
 * @returns {string[]} - An array of URLs extracted from the email content.
 */
function extractUrlsFromEmailContent(e) {
  // Retrieve the current message in the Gmail interface
  var messageId = e.gmail.messageId;
  var message = GmailApp.getMessageById(messageId);

  // Extract URLs from the plain text content of the email
  var emailContent = message.getPlainBody();
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  var matches = emailContent.match(urlRegex) || [];
  return matches;
}

/**
 * Detects phishing for the given URLs.
 * @param {string[]} urls - An array of URLs to check for phishing.
 * @returns {string[]} - An array of phishing results corresponding to the input URLs.
 */
function detectPhishing(urls) {
  // Send each URL to the endpoint and get the results
  return sendUrlsToEndpoint(urls);
}

/**
 * Sends each URL to the prediction endpoint and returns the results.
 * @param {string[]} urls - An array of URLs to send to the prediction endpoint.
 * @returns {string[]} - An array of phishing results corresponding to the input URLs.
 */
function sendUrlsToEndpoint(urls) {
  return urls.map(sendUrlToEndpoint);
}

/**
 * Sends a single URL to the prediction endpoint and returns the result.
 * @param {string} url - The URL to send to the prediction endpoint.
 * @returns {string} - The phishing result for the input URL.
 */
function sendUrlToEndpoint(url) {
  var endpoint = "https://securephish.onrender.com/Predict";
  var response = UrlFetchApp.fetch(endpoint, {
    method: "post",
    payload: JSON.stringify({ url: url }),
    contentType: "application/json",
  });

  // Parse the response JSON or handle the result accordingly
  var result = JSON.parse(response.getContentText());

  // Extract the desired information from the response
  var detectionResults = result.detection;
  if (detectionResults && detectionResults.length > 1) {
    var firstDetectionResult = detectionResults[2]; // Assuming you want the second element after "sampleeee"

    // Use firstDetectionResult as needed
    return firstDetectionResult === 1 ? 'Phishing' : 'Safe';
  } else {
    // Handle the case where the response format is unexpected
    console.error('Unexpected response format:', result);
    return 'Error';
  }
}

/**
 * Creates a card to display the extracted URLs and phishing results.
 * @param {string[]} urls - An array of URLs to be displayed in the card.
 * @param {string[]} results - An array of phishing results corresponding to the input URLs.
 * @returns {Card} - The card to be displayed in the Gmail add-on.
 */
function createUrlsCard(urls, results) {
  // Create a card displaying the extracted URLs and phishing results
  var card = CardService.newCardBuilder();
  card.setName("UrlsCard").setHeader(CardService.newCardHeader().setTitle("Phishing Detection Results"));

  var sectionUrls = CardService.newCardSection();
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    var result = results[i];

    sectionUrls.addWidget(CardService.newTextParagraph().setText(`URL: ${url}\nResult: ${result}`));
  }

  return card.addSection(sectionUrls).build();
}

/**
 * Creates a default card with the specified message.
 * @param {string} message - The message to display in the default card.
 * @returns {Card} - The default card to be displayed.
 */
function createDefaultCard(message) {
  // Create a default card with the specified message
  var card = CardService.newCardBuilder();
  card.setName("DefaultCard").setHeader(CardService.newCardHeader().setTitle(message || "Default Card"));

  var sectionDefault = CardService.newCardSection();
  sectionDefault.addWidget(CardService.newTextParagraph().setText(message || "No content available."));

  return card.addSection(sectionDefault).build();
}
