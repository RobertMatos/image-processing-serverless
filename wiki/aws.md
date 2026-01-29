### 1️⃣ Lambda é um servidor que fica ligado? (sim / não e por quê)
**Resposta**: a lambda é uma função que fica armazenada na nuvem, ela não fica ligada, ela só executa quando é acionada - aí que a aws liga o ambiente e congela/descarta quando termina a execução - e depois tem seu fim quando termina de ser executada

### 2️⃣ O que faz uma Lambda rodar?

**Resposta**: Um evento. Pode ser o acesso a um link tipo API gateway, um upload no s3, uma mensagem no SQS, um CRON, um SNS, ou outra lambda.

### 3️⃣ No seu projeto, quando a Lambda de processamento vai rodar?

**Resposta**: Quando o usuário acessar o endpoint de POST  /process, aí vai rodar a lambda processImage