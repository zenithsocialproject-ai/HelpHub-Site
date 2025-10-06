//Automate the data of matching providers based on services and location.
let clientsTable = base.getTable("Clients");
let providersTable = base.getTable("Providers");

// Get the client record ID from automation input
let clientRecordId = input.config().clientRecordId;

// Load the client record
let clientRecord = await clientsTable.selectRecordAsync(clientRecordId);
let clientZip = clientRecord.getCellValue("Zip Code");
let clientServices = clientRecord.getCellValue("Services Needed") || [];

// Get all providers
let providers = await providersTable.selectRecordsAsync();

// Filter providers by ZIP + services
let matchingProviders = providers.records.filter(provider => {
    let providerZip = provider.getCellValue("Zip Code");
    let providerServices = provider.getCellValue("Services") || [];
    
    return providerZip === clientZip && clientServices.some(service => 
        providerServices.includes(service)
    );
});


output.set("matchingProviders", matchingProviders.map(p => ({
    name: p.getCellValue("Provider Name"),
    zip: p.getCellValue("Zip Code"),
    services: p.getCellValue("Services")
