<template>
  <VContainer 
    class="dashboard-container"
    fluid
    fill-height
  >
    <VRow class="dashboard-row">
      <VCol
        v-for="page in pages"
        :key="page"
        cols="12"
        md="4"
      >
        <VCard class="mx-2 mb-4">
          <VCardTitle class="d-flex align-center justify-space-between">
            <span>
              {{ page === 'text' ? 'Texto' :
                 page === 'image' ? 'Imagens' :
                 page === 'audio' ? 'Áudio' :
                 page.toUpperCase() }}
            </span>
            <VBtn
              icon
              variant="text"
              class="d-md-none"
              @click="toggleExpand(page)"
            >
              <VIcon>
                {{ isExpanded[page] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </VIcon>
            </VBtn>
          </VCardTitle>
          
          <VExpandTransition>
            <VList v-show="isExpanded[page] || $vuetify.display.mdAndUp">
              <VListItem
                v-for="item in chatStore.getChatsByPage({ page, limit: 10 })"
                :key="item.id"
                :to="`/${page}?id=${item.id}`"
                class="chat-item"
              >
                <VListItemTitle
                  v-text="item.title"
                />
              </VListItem>
            </VList>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref } from 'vue'
import CONSTANTS from '@/CONSTANTS'
import { useChatStore } from '@/stores'

const chatStore = useChatStore()
const pages = Object.keys(CONSTANTS.pages)

// Estado para controlar a expansão de cada card
const isExpanded = ref(pages.reduce((acc, page) => {
  acc[page] = false
  return acc
}, {}))

// Função para alternar a expansão
const toggleExpand = (page) => {
  isExpanded.value[page] = !isExpanded.value[page]
}
</script>

<style scoped lang="scss">
.dashboard-container {
  padding: 20px;
  background-color: rgba(18, 18, 18, 0.9);
  min-height: 100vh;
}

.dashboard-row {
  margin: 0;
  width: 100%;
}

.v-card {
  transition: all 0.3s ease;
  border-radius: 8px;
  
  .v-card-title {
    font-size: 1.25rem;
    font-weight: 600;
    padding: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    @media (max-width: 959px) {
      padding: 12px 16px;
    }
  }
  
  .v-list {
    padding: 8px;
    
    .chat-item {
      border-radius: 4px;
      margin: 4px 0;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
      
      .v-list-item-title {
        font-size: 0.95rem;
        
        @media (max-width: 959px) {
          font-size: 0.9rem;
        }
      }
    }
  }
}

// Estilos específicos para mobile
@media (max-width: 959px) {
  .v-card {
    margin-bottom: 12px;
  }
  
  .dashboard-container {
    padding: 12px;
  }
}

// Animações
.v-expand-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }
  
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>