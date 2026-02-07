<script setup>
import Card from '@/components/Card.vue'
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '@/clients/supabase'
import { useUserStore } from '@/stores/userStore'
import Swal from 'sweetalert2'

const navbarHeight = ref(0)

const updateNavbarHeight = () => {
  navbarHeight.value = window.innerWidth >= 768 ? 80 : 64
}

const cards = ref([])
const loading = ref(false)

const { supabase } = useSupabase()
const userStore = useUserStore()

const isAdmin = computed(() => {
  return userStore.profile?.rol === 'ce_admin'
})

/* =========================
   BUSCADOR
========================= */
const search = ref('')

const filteredCards = computed(() => {
  if (!search.value) return cards.value

  const q = search.value.toLowerCase()

  return cards.value.filter(
    (c) =>
      c.destinatario.toLowerCase().includes(q) ||
      c.decanato_destino.toLowerCase().includes(q),
  )
})

onMounted(() => {
  updateNavbarHeight()
  window.addEventListener('resize', updateNavbarHeight)
})

const loadCards = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('cards')
      .select(
        `*,
        author:profiles(
          id,
          nombre,
          apellido,
          decanato,
          semestre
        )`,
      )
      .order('created_at', { ascending: false })

    if (error) throw error

    cards.value = data || []
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: err.message || 'Ocurrió un error al cargar las cartas.',
    })
    cards.value = []
  } finally {
    loading.value = false
  }
}

const handleUpdateCardStatus = async (cardId, newStatus) => {
  try {
    const { error } = await supabase
      .from('cards')
      .update({ status: newStatus })
      .eq('id', cardId)

    if (error) throw error

    // Actualizar la carta localmente
    const index = cards.value.findIndex((card) => card.id === cardId)
    if (index !== -1) {
      cards.value[index].status = newStatus
    }

    Swal.fire(
      '¡Éxito!',
      `Carta ${newStatus === 'hidden' ? 'ocultada' : 'actualizada'} correctamente.`,
      'success',
    )
  } catch (error) {
    Swal.fire('Error', 'No se pudo actualizar el estado de la carta.', 'error')
    console.error('Error updating card status:', error)
  }
}

onMounted(() => {
  loadCards()
})
</script>

<template>
  <section
    class="w-screen flex flex-col items-center overflow-y-auto bg-cover bg-center"
    :style="`height: calc(100vh - ${navbarHeight}px); background-image: url('/img/hero-bg.jpg');`"
  >
    <!-- 🔍 BUSCADOR -->
    <div class="w-full max-w-2xl mt-8 px-6">
      <div class="relative group">
        <input
          v-model="search"
          placeholder="Buscar por nombre o carrera 💌"
          class="w-full p-4 rounded-xl bg-primaryGray/50 backdrop-blur-md border border-white/30 text-stone-700 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-primaryRed shadow-lg"
        />

        <span
          class="absolute right-4 top-3 text-xl text-primaryRed group-hover:scale-110 transition"
        >
          🔍
        </span>
      </div>
    </div>

    <!-- 💌 LISTA -->
    <div class="w-full max-w-6xl mt-10 px-6 pb-20">
      <Card
        :cards="filteredCards"
        :isAdmin="isAdmin"
        @update-card-status="handleUpdateCardStatus"
      />
    </div>

    <!-- Estado vacío -->
    <p v-if="filteredCards.length === 0" class="text-white/80 mt-10 text-lg">
      No se encontraron cartas 💔
    </p>
  </section>
</template>

<style scoped></style>
