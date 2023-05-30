
## Sistema de geração de escala Pascom (SCAGE)


### Contexto
> Durante o mês a uma quantidade de missas que precisam ser transmitidas. A transmissão é feita por três pessoas, uma na mesa de corte e duas nas câmeras. Quando há mulheres, elas sempre ficam na mesa de corte, o mesmo não é válido para os homens, pois caso haja somente homens para transmitir qualquer um pode ficar na mesa de corte.

### Problema 
Um sistema que gere de forma aleatória uma escala para todo o mês com todas as pessoas da PASCOM não repetindo a mesma pessoa na mesma transmissão e em várias transmissões durante o mês 

### Solução
* Ter uma tela que me possibilite inserir os membros e tbm os dias que haverá transmissão. Os membros não precisam ser inseridos toda vez que for feita uma nova escala, podem ficar armazenados no banco do sistema, como também pode ser possível inserir, atualizar ou remover um membro da lista. Já os dias das missas serão inseridos todas as vezes que houver transmissão
* Para escalar que vai servir no dia, deverá ser possível gerar de forma aleatória os nomes dos membros.

### Tecnologias
- Frontend
    - React
    - styled component
    - Material UI
- Backend
    - .NET
    - DDD

### Screenshots
* Geração da escala
  ![Imagem escala gerada](https://github.com/tiagolopesdev/desafios/assets/58925056/687aa1ea-f5ad-4a8c-9db5-7836369dd202)
* Escalas
  ![Escalas geradas](https://github.com/tiagolopesdev/desafios/assets/58925056/96bbe646-1cc3-47c6-82a3-d6c8849808fe)
  
### Preparação do ambiente
* Frontend
  * Após clonar o repositório, execute o comanda abaixo para instalar as dependencias:
  ```javascript
  npm install
  `````   
* Backend
  * Após clonar e repositório, execute os seguintes comandos para restaurar e construir a API:
  ```javascript
  dotnet restore
  `````
  ```javascript
  dotnet build
  `````
  * A versão do .NET nas API's é a 7. Para baixar [acesse aqui](https://dotnet.microsoft.com/pt-br/download/dotnet/7.0).
  * Após ter a versão 7 do .NET, acesse o seguinte caminho `scage-users-api/SCAGEUsers/SCAGEUsers.api`. Em seguinda, execute o comando abaixo para executar a API:
  ```javascript
  dotnet run
  `````








