//Step 3 to initiate the GET HTTPS Request

const services = (inputData.services || '').split(',').map(service => service.trim());
const zip = inputData.zip || '';

// Create a filter formula for Airtable
const servicesFilter = services.map(service => `FIND("${service}", {Services})`).join(' + ');
const zipFilter = `{Zip} = "${zip}"`;

// Combine the filters into a single formula
const filterByFormula = `AND(${servicesFilter} > 0, ${zipFilter})`;

// Prepare the output with the constructed filter formula
output = { filterByFormula };


//The Webhook GET Request
https://api.airtable.com/v0/app92aloH3oAKCOL9/Providers

//Filtered Formula
//Query String =filterbyFormula
AND(
  {Zip Code}='{{324747436__question_W8x1XN}}',
  ARRAYJOIN(TRIM('{{324747436__question_8LKD6x}}'), ARRAYJOIN({Services}))
)

//Step 5 Javascript to parse the data
// Parse the Airtable API JSON response
let data = JSON.parse(inputData.airtableResponse);

// Extract the records from the response
let records = data.records.map(record => ({
  name: record.fields["Provider Name"],
  services: record.fields["Services"],
  address: record.fields["Address"],
  phone: record.fields["Phone Number"],
  email: record.fields["Email"],
  zip: record.fields["Zip Code"]
}));

// Combine into a clean summary string for OpenAI
let summary = records.map(r => 
  `${r.name} — Services: ${r.services}. Address: ${r.address}. Phone: ${r.phone || "N/A"}.`
).join("\n\n");

return { providersSummary: summary };
