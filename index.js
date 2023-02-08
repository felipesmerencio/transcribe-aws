// console.log('Alô mundo!');

var AWS = require("aws-sdk");
AWS.config.update({region: 'sa-east-1'});

// AWS.config.getCredentials(function(err) {
//     if (err) console.log(err.stack);
//     // credentials not loaded
//     else {
//       console.log("Access key:", AWS.config.credentials.accessKeyId);
//     }
// });

// console.log("Region: ", AWS.config.region);

var transcribeservice = new AWS.TranscribeService();

var params = {
    CallAnalyticsJobName: 'labTranscribeAtivy', /* required */
    Media: { /* required */
    MediaFileUri: 's3://test202302062/mono-conversasao_cliente_34999973687.mp3',
    RedactedMediaFileUri: 's3://test202302062/mono-conversasao_cliente_34999973687.mp3'
},
ChannelDefinitions: [
    {
        ChannelId: '5',
        ParticipantRole: "CUSTOMER"
    },
    /* more items */
],
DataAccessRoleArn: 'arn:aws:s3:::test202302062',
OutputEncryptionKMSKeyId: 'STRING_VALUE',
OutputLocation: 'STRING_VALUE',
Settings: {
    ContentRedaction: {
        RedactionOutput: "redacted", /* required */
        RedactionType: "PII", /* required */
        PiiEntityTypes: []
    },
    LanguageIdSettings: {
        '<LanguageCode>': {
            LanguageModelName: 'STRING_VALUE',
            VocabularyFilterName: 'STRING_VALUE',
            VocabularyName: 'STRING_VALUE'
        },
        /* '<LanguageCode>': ... */
    },
    LanguageModelName: 'STRING_VALUE',
    LanguageOptions: [
        "pt-BR",
        /* more items */
    ],
    VocabularyFilterMethod: "tag",
    VocabularyFilterName: 'STRING_VALUE',    
    VocabularyName: 'STRING_VALUE'
}
};
transcribeservice.startCallAnalyticsJob(params, function(err, data) {
if (err) console.log(err, err.stack); // an error occurred
else     console.log(data);           // successful response
});