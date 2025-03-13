# iLotto Teste Técnico

Este projeto foi desenvolvido para um teste técnico para a vaga de *Desenvolvedor Back-end* na empresa iLotto.


## Como rodar

Você precisa ter na sua máquina:

* Node 22
* WSL2 (ambientes Windows)
* Docker

Depois de ter tudo isso instalado, faça `git clone` do projeto:

git clone https://github.com/joaoefornazari/ilotto-teste-tecnico.git .

Depois de concluir o download do repositório localmente, rode estes comandos:

```
cd ilotto-teste-tecnico
docker-compose -f docker-compose.yml up -d --build
```

Isso irá te levar para o diretório raiz do projeto, criar os contêineres necessários e executará a aplicação.

Para testar os endpoints, acesse `http://localhost:3000/swagger`.

DISCLAIMER: Não informe os `userId` nas requisições de transações. Este campo é preenchido automaticamente pelo *middleware* de token da API, porém é parte do tipo da requisição que é enviado pelos *controllers* e por isso está ali. Quando for testar as requisições, apague esse campo.
