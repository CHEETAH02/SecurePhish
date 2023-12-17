// Create a payload object with the URL
var url = location.href;
let domain_name = url.split("/", 3)
let full_domain_name = domain_name[0] + "//" + domain_name[2]
// console.log(full_domain_name)

if (url.includes("localhost:3000", 0) != true) {
    fetch("localhost:5000/Predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Failed to fetch data");
            }
        })
        .then((record) => {
            const detectionResult = record.detectionResult; // Assuming 1 indicates Phishing and 0 indicates Safe

            // Display the result on the page

            if (detectionResult == 1) {
                if (confirm("SecurePhish Chrome Extension: We have found a phishing website!")) {
                    location.href = 'localhost:3000/home?url=' + url;
                }
                else {
                    window.location.href = url;
                }
            } else {
                // alert("Website is ok!");
            }
        })
        .catch(() => {
            alert("SecurePhish Chrome Extension: Oops! Looks like we have an error!")
        });
}
