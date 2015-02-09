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
            },{
                name: "Status",
                uri: "/app/status",
                description: "200 status code"
            },{
                name: "Callback",
                uri: "/app/callback",
                description: "200 status code"
            }]
        },
        {
            name: "Action endpoints", 
            endpoints: [{
                name: "Create",
                uri: "/action/create",
                description: "200 status code with a record definition"
            },
            {
                name: "Configure",
                uri: "/action/configure",
                description: "Html response"
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
                name: "Create",
                uri: "/content/create",
                description: "200 status code with a record definition"
            },
            {
                name: "Configure",
                uri: "/content/configure",
                description: "Html response"
            },
            {
                name: "Delete",
                uri: "/content/delete",
                description: "204 status code"
            },
            {
                name: "Copy",
                uri: "/content/copy",
                description: "Same as create"
            },
            {
                name: "Notify",
                uri: "/content/notify",
                description: "Html response"
            },
            {
                name: "Notify with tracking links",
                uri: "/content/tracking",
                description: "Html response with tracking links"
            }]
        },
        {
            name: "Menu endpoints", 
            endpoints: [{
                name: "Notify",
                uri: "/meny/notify",
                description: "Html response"
            }]
        },
        {
            name: "Echo endpoints", 
            endpoints: [{
                name: "Success",
                uri: "/echo/200/hello",
                description: "Status code 200 and hello in the body"
            },
            {
                name: "Created",
                uri: "/echo/201/created",
                description: "Status code 201 and created in the body"
            },
            {
                name: "User error",
                uri: "/echo/404/error=not_found",
                description: "Status code 404 and error=not_found in the body"
            },
            {
                name: "Server error",
                uri: "/echo/500/error=server",
                description: "Status code 500 and error=server in the body"
            }]
        }
    ];


})(module.exports);