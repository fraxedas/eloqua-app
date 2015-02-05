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

})(module.exports);