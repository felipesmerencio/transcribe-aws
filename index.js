// console.log('Alô mundo!');

var AWS = require("aws-sdk");
AWS.config.update({region: 'sa-east-1'});

var transcribeservice = new AWS.TranscribeService();

var params = {
    CallAnalyticsJobName: 'labTranscribeAtivy312312312322', /* required */
    Media: { /* required */
    MediaFileUri: 's3://test202302062-in2/mono-conversasao_cliente_34999973687.mp3',
    RedactedMediaFileUri: 's3://test202302062-in2/mono-conversasao_cliente_34999973687.mp3'
},
ChannelDefinitions: [
    {
        ChannelId: 0,
        ParticipantRole: "AGENT",
    },
    {
        ChannelId: 1,
        ParticipantRole: "CUSTOMER",
    },
    /* more items */
],
// DataAccessRoleArn: 'arn:aws:iam::566322147993:role/full-acess-trascribebatata',
OutputEncryptionKMSKeyId: 'STRING_VALUE',
OutputLocation: 's3://test202302062-out',
Settings: {
    ContentRedaction: {
        RedactionOutput: "redacted", /* required */
        RedactionType: "PII", /* required */
        PiiEntityTypes: []
    },
    // LanguageIdSettings: {
    //     '<LanguageCode>': {
    //         LanguageModelName: 'STRING_VALUE',
    //         VocabularyFilterName: 'STRING_VALUE',
    //         VocabularyName: 'STRING_VALUE'
    //     },
    //     /* '<LanguageCode>': ... */
    // },
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

console.log("Batata!");
transcribeservice.startCallAnalyticsJob(params, function(err, data) {
if (err) console.log(err, err.stack); // an error occurred
else     console.log(data);           // successful response
});