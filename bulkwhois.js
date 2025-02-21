var apikey = $secure.VW_X_RAPID_API_KEY
const urlParams = $secure.VW_BULKWHOIS_DOMAINS
var assert = require("assert");
var options = {
  //Define endpoint URL.
  url: `https://pointsdb-bulk-whois-v1.p.rapidapi.com/${urlParams}`,
  headers: {
    'x-rapidapi-key' : apikey,
    'x-rapidapi-host': 'pointsdb-bulk-whois-v1.p.rapidapi.com',
    'Content-Type'   : 'application/json',
  },
};

function extractExpiryDates(data) {
    const result = {};

    for (const domain in data) {
        const records = data[domain];
        
        const expiryRecord = records.find(record => 
            Object.values(record)[0].toLowerCase().includes("registry expiry date")
        );
        
        if (expiryRecord) {
            result[domain] = Object.values(expiryRecord)[0].trim();
            $util.insights.set(`${domain}-registration-expiry`,`${domain} : ${Object.values(expiryRecord)[0].trim()}`);
        } else {
            result[domain] = "Expiry date not found";
            $util.insights.set(`${domain}-registration-expiry`, "Expiry date not found");
        }
    }
    
    return result;
}

$http.get(options, function (error, response, body) {
  
 console.log(response.statusCode + " status code");
 
 assert.ok(response.statusCode == 200, "Expected 200 OK response, got " + response.statusCode);

 $util.insights.set("http-status-code", response.statuscode)
 $util.insights.set("body", JSON.stringify(body))
 const expireDates = extractExpiryDates(body);
 $util.insights.set("all-registration-expiry",JSON.stringify(expireDates))
 console.table(expireDates)
  

});