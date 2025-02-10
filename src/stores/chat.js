// Utilities
import { addMessage, createTitle, fetchChats, setMessageDetails } from '@/services/firebase'
import { defineStore } from 'pinia'
import { getChatCompletion } from '@/services/openaiService'
import { isEmpty } from 'lodash'
import { useMainStore } from './main'
import { useStorage } from '@vueuse/core'

import moment from 'moment'
import CONTANTS from '@/CONSTANTS'

export const useChatStore = defineStore('chat', {
  // Define o estado inicial do store
  state: () => ({
    // Usa armazenamento persistente para os chats
    chats: useStorage('chats', {
      text: {},
      image: {},
      audio: {},
    }),
  }),
  
  // Getters para acessar e manipular o estado
  getters: {
    // Retorna todos os títulos dos chats
    getTitles: state => state.chats.map(chat => chat.title),
    
    // Retorna as mensagens de um chat específico por ID
    getChatsById:
      state =>
      (id, page = CONTANTS.defaultPage) =>
        state.chats?.[page]?.[id]?.messages || [],
    
    // Retorna todas as informações de um título específico
    getWholeTitle:
      state =>
      (id, page = CONTANTS.defaultPage) =>
        state.chats[page]?.[id] || {},
    
    // Retorna chats paginados
    getChatsByPage: state => payload => {
      const { limit, page } = payload

      const entries = Object.entries(state.chats?.[page] || {})
      const result = entries.map(([id, chat]) => ({
        id,
        ...chat,
      }))

      // Ordena os chats por data de atualização em ordem decrescente
      result.sort((a, b) => {
        const updatedAtA = a.updatedAt ? new Date(a.updatedAt) : new Date(0)
        const updatedAtB = b.updatedAt ? new Date(b.updatedAt) : new Date(0)
        return updatedAtB - updatedAtA
      })

      return limit ? result.slice(0, limit) : result
    },
    
    // Retorna títulos paginados
    getTitlesByPage: getters => payload =>
      getters.getChatsByPage(payload).map(chat => ({ id: chat.id, title: chat.title })) || [],
  },
  
  // Ações para modificar o estado
  actions: {
    // Inicializa o store carregando os chats do Firebase
    async init() {
      const chats = await fetchChats()
      this.chats = { ...chats }
    },
    
    // Adiciona uma nova mensagem ao chat
    async addMessage(payload) {
      const { content, format, model, speed, type, voice } = payload
      let { id, page } = payload

      const time = moment().format()
      page ??= CONTANTS.defaultPage

      // Gera um novo ID se não fornecido
      if (!id) {
        id = crypto.randomUUID()
        this.createTitle({ id, page })
      }

      if (!content) return

      let found = this.chats[page]?.[id]

      // Cria um novo título se não encontrado
      if (!found) {
        this.createTitle({ id, page })
        found = this.chats[page]?.[id]
      }

      // Inicializa o chat se estiver vazio
      if (!Array.isArray(found?.messages) || found.messages.length === 0) {
        const temp = document.createElement('div')
        temp.innerHTML = content
        const text = temp.textContent || temp.innerText || ''

        found.title = text.substring(0, 100)
        found.messages = []
        setMessageDetails({ id, page, title: found.title, updatedAt: time })
      }

      // Adiciona a mensagem do usuário
      found.messages.push({ content, time, type })
      addMessage({ id, page, messages: found.messages, updatedAt: time })

      useMainStore().isLoading = true

      try {
        // Obtém e adiciona a resposta do bot
        const botContent = await getChatCompletion({ content, format, model, page, speed, voice })
        found.messages.push({ content: botContent, time, type: 'bot' })
        addMessage({ id, page, messages: found.messages, updatedAt: time })
      } finally {
        useMainStore().isLoading = false
      }
    },
    
    // Cria um novo título de chat
    createTitle(payload) {
      const time = moment().format()

      let { id, page } = payload
      page ??= CONTANTS.defaultPage
      id ??= crypto.randomUUID()

      if (isEmpty(this.chats[page])) {
        this.chats[page] = {}
      }

      createTitle({ createdAt: time, id, messages: [], page, title: 'Novo Chat' })
      this.chats[page][id] = { createdAt: time, messages: [], title: 'Novo Chat', updatedAt: time }

      return id
    },
    
    // Obtém o ID do último título na página
    getLastTitleId(page = CONSTANTS.defaultPage) {
      const chatsForPage = this.chats?.[page] ?? {}
      const chatIds = Object.keys(chatsForPage)

      if (chatIds.length > 0) {
        return chatIds[chatIds.length - 1]
      }

      return this.createTitle({ page })
    },
    
    // Verifica se um título existe
    isTheTitleExist:
      state =>
      (id, page = CONTANTS.defaultPage) => {
        if (!state.chats?.[page]?.[id]) {
          this.router.push(`/${page}`)
        }
      },
  },
})