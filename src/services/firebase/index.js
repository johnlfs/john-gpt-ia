// Exporta a função de inicialização do Firebase
export { default as initializeFirebase } from './initialize'

// Exporta funções relacionadas ao banco de dados Firebase
// - addMessage: Adiciona mensagens a um chat
// - createTitle: Cria um novo chat
// - fetchChats: Busca todos os chats existentes
// - setMessageDetails: Atualiza detalhes de um chat
export { addMessage, createTitle, fetchChats, setMessageDetails } from './database'

// Exporta funções relacionadas ao armazenamento Firebase Storage
// - fetchFile: Recupera arquivos do storage
// - upload: Faz upload de arquivos para o storage
export { fetchFile, upload } from './storage'