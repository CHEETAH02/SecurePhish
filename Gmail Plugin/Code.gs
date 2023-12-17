function startApp(e) {
  // Retrieve the current message in the Gmail interface
  var messageId = e.gmail.messageId;
  var message = GmailApp.getMessageById(messageId);

  // Extract URLs from the email body
  var urls = extractUrlsFromText(message.getPlainBody());

  if (urls.length > 0) {
    // Send each URL to the endpoint and get the results
    var results = sendUrlsToEndpoint(urls);

    // Create a card displaying the results
    var card = createResultCard(urls, results);

    // Return the card to be displayed in the Gmail add-on
    return card;
  } else {
    // If no URLs are found, display a default card
    var defaultCard = createDefaultCard();
    return defaultCard;
  }
}

function extractUrlsFromText(text) {
  // Implement simple logic to extract URLs from the text
  // This regex is a basic example; you may need to adjust it based on your use case
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  var matches = text.match(urlRegex) || [];
  return matches;
}

function sendUrlsToEndpoint(urls) {
  // Send each URL to the endpoint and get the results
  var results = [];

  for (var i = 0; i < urls.length; i++) {
    var result = sendUrlToEndpoint(urls[i]);
    results.push(result);
  }

  return results;
}

function sendUrlToEndpoint(url) {
  // Send the URL to the endpoint and get the result
  // Use UrlFetchApp to make an HTTP request
  var endpoint = "https://securephish.onrender.com/Predict";
  var response = UrlFetchApp.fetch(endpoint, {
    method: "post",
    payload: JSON.stringify({ url: url }),
    contentType: "application/json",
  });

  // Parse the response JSON or handle the result accordingly
  var result = JSON.parse(response.getContentText());
  return result;
}

function createResultCard(urls, results) {
  // Create a card displaying the results
  var card = CardService.newCardBuilder();
  card.setName("ResultCard").setHeader(CardService.newCardHeader().setTitle("Phishing Detection Results"));

  var sectionResults = CardService.newCardSection();
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    var result = results[i];

    // Assuming the relevant information is stored in the "detectionResult" property
    var detection = result.detectionResult;

    // Set prediction based on the "detectionResult"
    var prediction = detection === 1 ? 'Phishing' : 'Safe';

    sectionResults.addWidget(CardService.newTextParagraph().setText(`URL: ${url}\nResult: ${prediction}`));
  }

  return card.addSection(sectionResults).build();
}

function createDefaultCard() {
  // Create a default card when no URLs are found
  var card = CardService.newCardBuilder();
  card.setName("DefaultCard").setHeader(CardService.newCardHeader().setTitle("No URLs found"));

  var sectionDefault = CardService.newCardSection();
  sectionDefault.addWidget(CardService.newTextParagraph().setText("No URLs found in the email."));

  return card.addSection(sectionDefault).build();
}
