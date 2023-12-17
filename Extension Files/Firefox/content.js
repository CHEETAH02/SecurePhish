// Create a payload object with the URL
let url = location.href;
// alert(url)

if(url.includes("http://localhost:3000",0)!=true && Status==undefined)
{     
fetch(
    "http://127.0.0.1:5000/Predict", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({url:url}),
}
).then((res) => {
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
            location.href = 'http://localhost:3000/home?url='+url;
            // alert("Phishing site");
            if (!confirm("This website seems like a phishing website, you might not want to continue")) {
                history.back();
            } 
        } else {
            alert("Website is ok!")
        }
    })
    .catch((error) => {
        alert(error)
    });
}