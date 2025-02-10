import { defineStore } from 'pinia'

// Define um store Pinia para gerenciamento de mensagens (erros e sucessos)
export const useMessageStore = defineStore('message', {
  // Estado inicial do store
  state: () => ({
    error: null,           // Armazena mensagens de erro
    isSuccess: null,       // Armazena mensagens de sucesso
    errorTime: 5000,       // Tempo padrão de exibição de erros (5 segundos)
    successTime: 5000,     // Tempo padrão de exibição de sucessos (5 segundos)
  }),

  // Getters para acessar o estado
  getters: {
    // Retorna o erro atual
    getError() {
      return this.error
    },
    // Retorna o status de sucesso atual
    getIsSuccess() {
      return this.isSuccess
    },
  },

  // Ações para modificar o estado
  actions: {
    // Define um erro e o limpa após um tempo determinado
    setErrorClear(payload) {
      this.error = payload?.error
      // Usa o tempo fornecido ou o tempo padrão
      let time = payload?.time && payload?.time != undefined ? payload?.time : this.errorTime
      // Limpa o erro após o tempo especificado
      setTimeout(() => {
        this.error = null
      }, time)
    },

    // Define uma mensagem de sucesso e a limpa após um tempo determinado
    setIsSuccessClear(payload) {
      try {
        this.error = null  // Limpa qualquer erro existente
        this.isSuccess = payload?.message || null

        // Usa o tempo fornecido ou o tempo padrão
        const time = payload?.time ? payload.time : this.successTime

        // Limpa a mensagem de sucesso após o tempo especificado
        setTimeout(() => {
          this.isSuccess = null
        }, time)
      } catch (error) {
        // Em caso de erro, chama setErrorClear
        this.setErrorClear({ error })
      }
    },

    // Define uma mensagem de sucesso, limpando erros anteriores
    setIsSuccess(payload) {
      try {
        this.error = null  // Limpa qualquer erro existente
        this.setIsSuccessClear(payload)
      } catch (error) {
        this.setErrorClear({ error })
      }
    },

    // Define uma mensagem de erro, limpando mensagens de sucesso anteriores
    setError(payload) {
      try {
        this.isSuccess = null  // Limpa qualquer mensagem de sucesso existente
        this.setErrorClear(payload)
      } catch (error) {
        this.setErrorClear({ error })
      }
    },
  },
})