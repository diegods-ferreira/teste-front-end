# Teste iCasei: Front-End

Uma pequena aplicação, feita em React, que utiliza um termo de busca para consultar a API do Youtube e exibir em tela uma lista de vídeos com algumas informações.

## Como executar o projeto?

Siga os passos abaixo para executar o projeto em ambiente de desenvolvimento.

#### Passo 1

Clone esse repositório, acesse a pasta `/teste-front-react`, a qual contém a aplicação React, e faça o download das dependências do projeto executando o comando `npm install`, caso esteja usando o gerenciador de pacotes NPM, ou `yarn`, caso esteja utilizando o Yarn.

#### Passo 2

Depois de baixadas as dependências, crie o arquivo `.env` na raiz do projeto para que seja possível configurar as variáveis de ambiente. Ele deve seguir o modelo do arquivo `.env.example`.

Nele, deve conter a variável `REACT_APP_YOUTUBE_API_KEY={API_KEY}`.

Você pode gerar a sua chave da [API](https://developers.google.com/youtube/v3/docs/search/list) neste [link](https://developers.google.com/youtube/v3/getting-started?hl=pt-br).

#### Passo 3

Concluídos os passos anteriores, basta executar o comando `npm run start` ou `yarn start`, e aguardar até que a aplicação seja aberta automaticamente em seu navegador.
