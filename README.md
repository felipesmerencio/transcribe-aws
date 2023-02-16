# Processo para utilizar o Transcribe da AWS, para realizar a transcrição do audio em texto. 

## A estapas de funcionamento será: o usuario posta um arquivo no bucket de entrada, esse audio seria enviado para o Transcribe, e ao concluir o processo, será postado o arquivo json com o texto transcrito  no bucket de saida.   

### Dentro do json gerado pelo transcribe tera as tag abaixo:  

    * transcripts - A transcrição inteira do audio para um texto.  
    * speaker_labels: Tras o tempo de cada palavra dita no dialogo com seu tempo inicio e fim.  
    * channel_labels: Tras o transcrição de palavra falada, com calculo de confiança, tempo inicio e fim.   
    * items: Retorno semelhante ao "channel_labels".  

    Obs. na pasta example, segue um arquivo de audio, texto e json da transcrição.  

## Segue abaixo as etapas de configuração no portal da AWS. Para habilitar o serviço
# IAM - Gerenciameto de Acesso

## Politicas

1. Criar uma nova politica com acesso full para os recurso abaixo.

    - S3 Object Lambda
    - S3 Outposts
    - S3

    Obs. para facilitar segue o JSON com as permissões necessarias
        
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
                    "Resource": "*"
                }
            ]
        }

## Funções

    1. Criar um função com as permissões abaixo
        - AmazonTranscribeFullAccess
        - CloudWatchLogsFullAccess

    2. Vincular a politica criada na etapa anterior "Politicas" a essa função.

## Lambda

1. Criar um Lambda com template HelloWord de python3 e insira o codigo abaixo.
    ```
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
            OutputBucketName = "test202302062-out",
            Settings={
                'ChannelIdentification': True,
                'ShowSpeakerLabels': True,
                'MaxSpeakerLabels': 5,
            }
        )


        return {
            'TranscriptionJobName': response['TranscriptionJob']['TranscriptionJobName']
        }
    ```

2. Dentro da opção de criação do Lambda, especificar na parte "Alterar a função de execução padrão", a opção "Usar uma função existente" e selecione a função que foi criada na etapa de função deste manual.  

3. Por fim clique em Criar Função.  

## Bucket

### Bucket de POSTAGEM dos arquivos

1. Criar o bucket para postagem dos arquivos de audio para transcrição, selecionando a região sa-east-1. Que é a região que compativel com o transcribe do idioma portugues Brasil.  

2. Por fim, clique em Criar Bucket.  

3. Para habilitar a notificação, que ao inserir qualquer arquivo no bucket, enviara ao transcribe.  
    a. Entre na configurações do bucket, selecionando o mesmo na fila de bucket.  
    b. Na tela aberta, entre na aba "Propriedades".  
    c. Na opção "Notificações de eventos", clique em "Criar notificação de evento".  
    d. Defina um descrição no campo "Nome do evento".  
    e. Na opção de "Criação de objetos", selecione a opção: Todos os eventos de criação de objeto.  
    f. Em "Destino", selecione: Função do Lambda.  
    g. Em "Especificar Função do Lambda", selecione a opção Lambda que foi criando anteriormente neste manual.  
    h. por fim, clique em "Salvar Alterações".  
    
### Bucket de SAIDA do arquivo json com transcrição do audio. 

1. Criar o bucket para postagem dos arquivos de audio para transcrição, selecionando a região sa-east-1. Que é a região que compativel com o transcribe do idioma portugues Brasil.   

2. Por fim, clique em Criar Bucket.      
