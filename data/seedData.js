(function(data){
	data.recordDefinition = {
        ContactID: "{{Contact.Id}}", 
        EmailAddress: "{{Contact.Field(C_EmailAddress)}}"
    }

    data.actionRecordDefinition = {
        recordDefinition: data.recordDefinition
    };

    data.contentRecordDefinition = {
        recordDefinition: data.recordDefinition,
        height: 300,
        width: 400,
        editorImageUrl: "http://www.oscar-fraxedas.com/Nature/Bird-Kindom/i-QrQfsWg/0/XL/P1120087-XL.jpg"
    };

    data.endpoints = [
        {
            name: "Application endpoints", 
            endpoints: [{
                name: "Enable",
                uri: "/app/enable",
                description: "200 status code"
            }]
        },
        {
            name: "Action endpoints", 
            endpoints: [{
                name: "Create",
                uri: "/action/create",
                description: "200 status code"
            },
            {
                name: "Configure",
                uri: "/action/configue",
                description: "200 status code"
            },
            {
                name: "Delete",
                uri: "/action/delete",
                description: "204 status code"
            },
            {
                name: "Copy",
                uri: "/action/copy",
                description: "Same as create"
            },
            {
                name: "Notify",
                uri: "/action/notify",
                description: "204 status code"
            }]
        },
        {
            name: "Content endpoints", 
            endpoints: [{
                name: "Enable",
                uri: "/app/enable",
                description: "200 status code"
            }]
        },
        {
            name: "Echo endpoints", 
            endpoints: [{
                name: "Enable",
                uri: "/app/enable",
                description: "200 status code"
            }]
        }
    ];


})(module.exports);