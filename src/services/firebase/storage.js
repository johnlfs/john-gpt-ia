// Importações necessárias
import CONSTANTS from '@/CONSTANTS'
import { getDownloadURL, getStorage, uploadBytes, uploadString, ref } from '@firebase/storage'
import { useMessageStore } from '@/stores'

/**
 * Realiza o upload de um arquivo para o Firebase Storage
 * @param {Object} payload - Objeto contendo os dados do arquivo
 * @param {string} payload.extension - Extensão do arquivo
 * @param {File|string} payload.file - Arquivo a ser enviado
 * @param {string} payload.mimeType - Tipo MIME do arquivo
 * @param {string} payload.page - Página/categoria do arquivo
 * @returns {Promise<string>} Nome do arquivo após o upload
 */
export async function upload(payload = {}) {
  const { extension, file, mimeType, page } = payload
  // Inicializa o storage do Firebase
  const storage = getStorage()
  // Cria uma referência com nome único para o arquivo
  const storageRef = ref(storage, crypto.randomUUID() + '.' + extension)

  let fileName
  // Define os metadados do arquivo
  const metadata = {
    contentType: mimeType,
  }

  // Realiza upload diferente baseado no tipo de página
  if (page === CONSTANTS?.pages?.image) {
    // Upload para imagens usando bytes
    await uploadBytes(storageRef, file, metadata).then(snapshot => {
      fileName = snapshot.ref.name
    })
  } else if (page === CONSTANTS?.pages?.audio) {
    // Upload para áudio usando string codificada
    await uploadString(storageRef, file, 'data_url').then(snapshot => {
      fileName = snapshot.ref.name
    })
  }

  return fileName
}

/**
 * Busca a URL de download de um arquivo no Firebase Storage
 * @param {Object} payload - Objeto contendo os dados do arquivo
 * @param {string} payload.fileName - Nome do arquivo a ser buscado
 * @returns {Promise<string>} URL de download do arquivo
 */
export function fetchFile(payload) {
  const { fileName } = payload

  // Inicializa o storage e cria referência ao arquivo
  const storage = getStorage()
  const storageRef = ref(storage, fileName)

  // Obtém a URL de download
  return getDownloadURL(storageRef)
    .then(url => url)
    .catch(error => {
      // Lista completa de códigos de erro disponível em:
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // Arquivo não encontrado
          useMessageStore().setError({ error: "Arquivo não existe" })
          break
        case 'storage/unauthorized':
          // Sem permissão de acesso
          useMessageStore().setError({ error: "Usuário não tem permissão para acessar o objeto" })
          break
        case 'storage/canceled':
          // Upload cancelado
          useMessageStore().setError({ error: 'Usuário cancelou o upload' })
          break

        // Outros casos possíveis...

        case 'storage/unknown':
          // Erro desconhecido
          useMessageStore().setError({ error: 'Erro desconhecido ocorreu, verifique a resposta do servidor' })
          break
      }
    })
}