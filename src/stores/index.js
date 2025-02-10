// Barrel file para os stores Pinia

// Exporta o store de chat, responsável por gerenciar:
// - Histórico de conversas
// - Mensagens dos chats
// - Interações com o ChatGPT
export { useChatStore } from './chat'

// Exporta o store de mensagens, responsável por gerenciar:
// - Mensagens de erro
// - Mensagens de sucesso
// - Notificações do sistema
export { useMessageStore } from './message'

// Exporta o store principal, responsável por gerenciar:
// - Estado global da aplicação
// - Configurações gerais
// - Estados de carregamento
export { useMainStore } from './main'