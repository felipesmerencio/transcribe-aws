# IAM - Gerenciameto de Acesso

1. Politicas

   1. Criar uma nova politica com acesso full para os recurso abaixo.

      - S3 Object Lambda
      - S3 Outposts
      - S3

      Obs. para facilitar segue o JSON com as permissões necessarias

      ```
      {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": [
                    "s3:*",
                    "s3-outposts:*",
                    "s3-object-lambda:*"
                ],
                "Resource": "\*"
            }
        ]
      }
      ```

   2. Funções

      1. Criar um função
      2. Vincular a politica criada na etapa anterior a essa função.

# Lambda

    ## Liberar para o meu usuario felipe.smerencio@callface.com.br tenha acesso full ao recurso lambda.

    1. Criar um Lambda com template HelloWord de python3 e insira o codigo abaixo.
        import boto3
        import uuid
        import json

        def lambda_handler(event, context):

            record = event['Records'][0]

            s3bucket = record['s3']['bucket']['name']
            s3object = record['s3']['object']['key']

            s3Path = "s3://" + s3bucket + "/" + s3object
            jobName = s3object + '-' + str(uuid.uuid4())

            client = boto3.client('transcribe')

            response = client.start_transcription_job(
                TranscriptionJobName=jobName,
                LanguageCode='pt-BR',
                MediaFormat='wav',
                Media={
                    'MediaFileUri': s3Path
                },
                OutputBucketName = "test202302062-out"
            )


            return {
                'TranscriptionJobName': response['TranscriptionJob']['TranscriptionJobName']
            }

    2. Alterar o campo OutputBucketName para a descrição do bucket de saida. Para que apos a transcrição possa depositar o json.

    3. Na configuração do lambda, vincula a função criada na primeira etapa, para dar as permissões necessarias para o funcionamento.

    4. Na configuração do Lambda criado, criar um gatilho actionar, onde qualquer criação de arquivo no bucket de origem, chame essa função do lambda. E realize o processo de transcrição.
