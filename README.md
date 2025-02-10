# 🤖 John GPT AI


## ⚡ Desenvolvido com Tecnologias Modernas

**Vue 3:** Uma ferramenta versátil que torna a criação de interfaces dinâmicas mais simples.
**Vuetify** 3: Design elegante com Material Design ao seu alcance.
**Pinia:** Gerenciamento de estado simplificado e eficiente.
**Vite:** Ferramenta de construção ultra-rápida para uma experiência de desenvolvimento suave.
**Firebase:** Sistema em tempo real para banco de dados e armazenamento.
**OpenAI:** O cérebro por trás da operação, trazendo recursos avançados de chat com IA.

Este projeto utiliza essas tecnologias de ponta para oferecer uma interface de chat fluida e responsiva, enriquecida com interações baseadas em IA. Desfrute do poder dos dados em tempo real, design elegante e conversas inteligentes em um único pacote.

## 💡 Funcionalidades


**Chat com IA em Tempo Real**

Integração OpenAI: Utilize o poder do ChatGPT para conversas inteligentes e dinâmicas.
Interação Fluida: Converse com a IA em tempo real, com respostas instantâneas.



**Suporte a Múltiplos Formatos**

### 📝Mensagens de Texto:
Troque mensagens de texto facilmente.
### 🖼️Suporte a Imagens:
Envie e receba imagens diretamente no chat.
### 🎙️Mensagens de Áudio:
Grave e compartilhe áudios com facilidade.


**Histórico de Conversas**

Armazenamento Local: Mensagens salvas localmente, mantendo o histórico mesmo após atualizar a página.
Firebase em Tempo Real: Armazene mensagens na nuvem para acesso em vários dispositivos.



**Interface Amigável**

Vuetify 3: Design bonito e intuitivo com componentes Material Design.
Layout Responsivo: Otimizado para computadores e dispositivos móveis.



## ⚙️ Instruções de Configuração

### Clonando e Executando Localmente

Para começar, clone o repositório e execute o servidor de desenvolvimento:
```bash
git clone https://github.com/seu/repositorio.git
cd nome-do-repositorio
yarn install
yarn dev
```

A aplicação estará rodando em http://localhost:5017/

### 🛠️ Configuração do arquivo .env

Você deve criar um arquivo .env na raiz do projeto, contendo as seguintes informações.

**Por Exemplo**

```env
# OpenAI
VITE_OPENAI_API_KEY=ExemploAleatorioDeAPIObtidaApartirDaPenAI

# Firebase
VITE_FIREBASE_API_KEY=ExemploAleatorioDeAPIObtidaApartirDoFirebase
VITE_FIREBASE_AUTH_DOMAIN=suaapplicacao.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://base-do-seu-firebase-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=id-da-sua-aplicacao
VITE_FIREBASE_STORAGE_BUCKET=storage-da-sua-aplicacao.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=6112233445566
VITE_FIREBASE_APP_ID=1:exemplo1233124:web:dasuaaplicação2321
```


### 🔌 Configuração do Firebase


**Crie um Projeto Firebase:**

Acesse o Console Firebase e crie um novo projeto.
Durante a criação, habilite Firebase Storage, para armazenar arquivos, como imagens e áudios.

**Copie sua configuração de API:**
   - Vá até suas configurações do Firebase e procure essas informações no Firebase SDK snippet.

     - `apiKey`
     - `authDomain`
     - `databaseURL`
     - `projectId`
     - `storageBucket`
     - `messagingSenderId`
     - `appId`


Configure seu Arquivo .env:
```env
VITE_FIREBASE_API_KEY=sua-chave-api
VITE_FIREBASE_AUTH_DOMAIN=seu-dominio
VITE_FIREBASE_DATABASE_URL=sua-url
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```


### 🎯 Como Obter a Chave API da OpenAI


Cadastre-se na OpenAI:

Acesse o site da OpenAI e crie uma conta.



Adicione a Chave API ao .env:
```env
VITE_OPENAI_API_KEY=sua-chave-openai
```

**Se esse projeto o ajudou, não esquece de deixar uma estrela.**


