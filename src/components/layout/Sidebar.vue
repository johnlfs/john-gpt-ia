<template>
  <!-- Navegação lateral responsiva que se adapta ao modo mobile -->
  <VNavigationDrawer
    v-model="drawer"
    class="bg-light-blue-darken-4"
    theme="dark"
    :rail="isMobile"
    :permanent="!isMobile"
    :temporary="isMobile"
    :location="isMobile ? 'left' : 'start'"
    @click="toggleRail"
  >
    <VList>
      <!-- Lista de links do menu principal -->
      <VListItem
        v-for="link in menuLinks"
        :key="link.title"
        @click="router.push(link.to)"
        :prepend-icon="link.icon"
        :to="link.to"
        :title="link.title"
        link
      >
        <template v-slot:prepend>
          <VIcon :icon="link.icon" />
        </template>
      </VListItem>
      
      <!-- Botão de novo chat (visível apenas quando uma página está selecionada) -->
      <VListItem
        v-if="currentPage !== ''"
        @click="newChat"
        prepend-icon="mdi-plus"
        :title="isMobile ? '' : 'Novo Chat'"
      >
        <template v-slot:prepend>
          <VIcon icon="mdi-plus" />
        </template>
      </VListItem>

      <!-- Container para lista de chats existentes (oculto em mobile) -->
      <VContainer
        class="messages"
        v-if="currentPage !== '' && !isMobile"
      >
        <!-- Lista de chats existentes com links de navegação -->
        <RouterLink
          v-for="title in titles"
          :key="title.id"
          :to="`/${currentPage}?id=${title.id}`"
          :class="{ active: chatId === title.id }"
        >
          {{ title.title }}
        </RouterLink>
      </VContainer>
    </VList>

    <!-- Rodapé da navegação -->
    <template v-slot:append>
      <div class="pa-2 text-center" v-if="!isMobile">John - GPT AI</div>
      <div class="pa-2 text-center" v-else>
        <VIcon>mdi-robot</VIcon>
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script setup>
// Importações necessárias
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useChatStore } from '@/stores'

// Inicialização de stores e composables
const chatStore = useChatStore()
const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()

// Estado do drawer
const drawer = ref(true)
const rail = ref(true)

// Verifica se está em modo mobile
const isMobile = computed(() => mobile.value)

// Alterna o modo compacto do menu em mobile
const toggleRail = () => {
  if (isMobile.value) {
    rail.value = !rail.value
  }
}

// Configuração dos links do menu principal com seus respectivos ícones e rotas
const menuLinks = computed(() => {
  // Gera IDs para cada tipo de chat (texto, imagem, áudio)
  const ids = ['text', 'image', 'audio'].reduce(
    (acc, page) => ({
      ...acc,
      [page]: chatStore.getLastTitleId(page) ? `${page}?id=${chatStore.getLastTitleId(page)}` : page,
    }),
    {},
  )

  // Retorna array com configurações de cada item do menu
  return [
    { icon: 'mdi-view-dashboard', title: 'Painel', to: '/' },
    { icon: 'mdi-text', title: 'Texto', to: ids?.text },
    { icon: 'mdi-image', title: 'Imagem', to: ids?.image },
    { icon: 'mdi-microphone', title: 'Áudio', to: ids?.audio },
  ]
})

// Computed properties para controle de navegação e estado
const currentPage = computed(() => route?.name?.replace('/', ''))
const chatId = computed(() => route?.query?.id)
const titles = computed(() => chatStore.getTitlesByPage({ page: currentPage.value }))

// Função para criar novo chat
const newChat = () => {
  const id = chatStore.createTitle({ page: currentPage.value })
  router.push(`${route.path}?id=${id}`)
}
</script>

<style scoped lang="scss">
// Estilos para a lista de mensagens
.messages {
  a {
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    display: block;
    color: rgba(255, 255, 255, 0.7);
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s ease;

    // Adiciona bullet point antes de cada link
    &:before {
      content: '•';
      margin-right: 10px;
    }

    // Efeito hover
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    // Estilo para o link ativo
    &.active {
      color: white;
      background: rgba(255, 255, 255, 0.15);
    }
  }
}

// Ajustes específicos para visualização em mobile
@media (max-width: 960px) {
  .v-navigation-drawer {
    width: 56px !important;
    
    &.v-navigation-drawer--rail {
      width: 56px !important;
    }
  }

  .v-list-item {
    padding: 0 12px;
  }
}
</style>