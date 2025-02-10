// Importa funções necessárias do Firebase Database
import { get, getDatabase, ref, set } from '@firebase/database'
import { initializeFirebase } from './index'

// Inicializa a conexão com o banco de dados Firebase
const db = getDatabase(initializeFirebase())

/**
 * Busca todos os chats armazenados no Firebase
 * @returns {Object} Objeto contendo todos os chats ou objeto vazio se não existirem chats
 */
export async function fetchChats() {
  // Cria uma referência para o nó 'chats' no banco de dados
  const chatsRef = ref(db, 'chats')
  // Obtém um snapshot dos dados
  const snapshot = await get(chatsRef)

  // Verifica se existem dados no snapshot
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return {}
  }
}

/**
 * Cria um novo título de chat no Firebase
 * @param {Object} payload - Objeto contendo os dados do novo chat
 * @param {string} payload.createdAt - Data de criação
 * @param {string} payload.id - ID único do chat
 * @param {Array} payload.messages - Array de mensagens
 * @param {string} payload.page - Página/categoria do chat
 * @param {string} payload.title - Título do chat
 */
export async function createTitle(payload) {
  const { createdAt, id, messages, page, title } = payload

  // Salva os dados do novo chat no Firebase
  set(ref(db, `chats/${page}/${id}`), {
    createdAt,
    id,
    messages,
    title,
    updatedAt: createdAt,
  })
}

/**
 * Adiciona uma nova mensagem a um chat existente
 * @param {Object} payload - Objeto contendo os dados da mensagem
 * @param {Array} payload.messages - Array atualizado de mensagens
 * @param {string} payload.id - ID do chat
 * @param {string} payload.page - Página/categoria do chat
 * @param {string} payload.updatedAt - Data da última atualização
 */
export async function addMessage(payload) {
  const { messages, id, page, updatedAt } = payload

  // Atualiza o array de mensagens no Firebase
  set(ref(db, `chats/${page}/${id}/messages`), [...messages])
  // Se fornecido, atualiza a data de última atualização
  if (updatedAt) set(ref(db, `chats/${page}/${id}/updatedAt`), updatedAt)
}

/**
 * Atualiza os detalhes de um chat existente
 * @param {Object} payload - Objeto contendo os detalhes a serem atualizados
 * @param {string} payload.createdAt - Data de criação
 * @param {string} payload.id - ID do chat
 * @param {string} payload.page - Página/categoria do chat
 * @param {string} payload.title - Novo título do chat
 * @param {string} payload.updatedAt - Data da última atualização
 */
export async function setMessageDetails(payload) {
  const { createdAt, id, page, title, updatedAt } = payload

  // Atualiza os campos fornecidos no Firebase
  if (title) set(ref(db, `chats/${page}/${id}/title`), title)
  if (createdAt) set(ref(db, `chats/${page}/${id}/createdAt`), createdAt)
  if (updatedAt) set(ref(db, `chats/${page}/${id}/updatedAt`), updatedAt)
}