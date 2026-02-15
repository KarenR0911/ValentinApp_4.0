<script setup>
import Card from '@/components/Card.vue'
import Preloader from '@/components/Preloader.vue'
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { useSupabase } from '@/clients/supabase'
import { useUserStore } from '@/stores/userStore'
import Swal from 'sweetalert2'

/* ================= NAVBAR ================= */
const navbarHeight = ref(0)
const updateNavbarHeight = () => {
  navbarHeight.value = window.innerWidth >= 768 ? 80 : 64
}

/* ================= SUPABASE ================= */
const { supabase } = useSupabase()
const userStore = useUserStore()

/* ================= PAGINACIÓN ================= */
const cards = ref([])
const loading = ref(false)

const page = ref(0)
const pageSize = 48
const hasMore = ref(true)

/* ================= FILTROS ================= */
const decanatos = ['DCYT', 'DCV', 'DAG', 'DEHA', 'DCS', 'DIC', 'DCEE']
const selectedDecanato = ref('')
const search = ref('')
// Variable temporal para el input de búsqueda
const searchInput = ref('')

/* =========================
   DECANATOS
========================= */
const decanatoToCareers = {
  DCYT: [
    'Ingeniería en Informática',
    'Ingeniería en Telemática',
    'Ingeniería de Producción',
    'Análisis de Sistemas',
    'Licenciatura en Física',
    'Licenciatura en Matemática',
  ],
  DCV: ['Medicina Veterinaria', 'T.S.U Agropecuaria'],
  DIC: ['Ingeniería Civil', 'Urbanismo'],
  DAG: [
    'Ingeniería Agronómica',
    'Ingeniería Agroindustrial',
    'T.S.U Agroindustrial',
  ],
  DCS: ['Enfermería', 'Medicina'],
  DCEE: ['Economía', 'Administración', 'Contaduría'],
  DEHA: [
    'Licenciatura en Desarrollo Humano',
    'Licenciatura en Psicología',
    'Licenciatura en Música',
    'Licenciatura en Artes Plásticas',
  ],
}

/* Default decanato del usuario */
onMounted(() => {
  if (userStore.profile?.decanato) {
    selectedDecanato.value = userStore.profile.decanato
  }
})

/* ================= INFINITE SCROLL ================= */
const sentinel = ref(null)
let observer = null

const initObserver = async () => {
  await nextTick()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loading.value) {
        loadCards()
      }
    },
    { rootMargin: '300px' },
  )

  if (sentinel.value) observer.observe(sentinel.value)
}

/* =========================
   LOAD CARDS
========================= */
const loadCards = async () => {
  if (!hasMore.value || loading.value) return

  loading.value = true

  try {
    let query = supabase
      .from('cards_with_likes')
      .select(
        `
        *,
        author:profiles(
          id,
          nombre,
          apellido,
          decanato,
          semestre,
          rol
        )
      `,
      )
      .eq('status', 'published')
      .order('likes_count', { ascending: false }) // 👈 más likes primero
      .order('created_at', { ascending: false }) // 👈 luego más recientes

    /* ===== DECANATO FILTER ===== */
    if (selectedDecanato.value) {
      const careers = decanatoToCareers[selectedDecanato.value]
      if (careers) {
        query = query.in('decanato_destino', careers)
      }
    }

    /* ===== SEARCH FILTER ===== */
    if (search.value) {
      query = query.or(
        `destinatario.ilike.%${search.value}%,decanato_destino.ilike.%${search.value}%`,
      )
    }

    /* ===== RANGE ===== */
    const from = page.value * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, error } = await query
    if (error) throw error

    if (!data.length) {
      hasMore.value = false
      return
    }

    const formatted = (data || []).map((c) => ({
      ...c,
      liked: c.liked_by_user,
      likes_count: Number(c.likes_count) || 0,
    }))

    cards.value.push(...formatted)

    page.value++
  } catch (err) {
    Swal.fire('Error', err.message || 'Error cargando cartas', 'error')
  } finally {
    loading.value = false
  }
}

/* ================= RESET AL FILTRAR ================= */
const resetAndReload = async () => {
  cards.value = []
  page.value = 0
  hasMore.value = true
  await loadCards()
}

/* ================= FUNCIÓN DE BÚSQUEDA ================= */
const handleSearch = () => {
  search.value = searchInput.value
  resetAndReload()
}

/* ================= RESET AL CAMBIAR DECANATO ================= */
watch(selectedDecanato, resetAndReload)

/* =========================
   INIT
========================= */
onMounted(async () => {
  updateNavbarHeight()
  window.addEventListener('resize', updateNavbarHeight)

  await userStore.getProfile()

  if (userStore.profile?.decanato) {
    selectedDecanato.value = userStore.profile.decanato
  }

  await loadCards(true)
  initObserver()
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

// Permitir búsqueda con Enter
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <section
    class="w-screen flex flex-col items-center overflow-y-auto bg-cover bg-center"
    :style="`height: calc(100vh - ${navbarHeight}px); background-image: url('/img/hero-bg.jpg');`"
  >
    <Preloader v-if="loading && cards.length === 0" />
    <!-- 🔍 BUSCADOR CON BOTÓN -->
    <div class="w-full max-w-2xl mt-8 px-6">
      <div class="flex gap-2">
        <div class="relative flex-1 group">
          <input
            v-model="searchInput"
            @keypress="handleKeyPress"
            placeholder="Buscar por nombre o carrera 💌"
            class="w-full p-4 rounded-xl bg-primaryGray/50 backdrop-blur-md border border-white/30 text-stone-700 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-primaryRed shadow-lg"
          />
        </div>

        <!-- Botón de búsqueda -->
        <button
          @click="handleSearch"
          class="px-6 rounded-xl bg-primaryRed hover:bg-red-700 text-white font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>🔍</span>
          <span class="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </div>

    <div class="w-full max-w-2xl mt-4 px-6">
      <div class="relative">
        <select
          v-model="selectedDecanato"
          class="w-full p-4 rounded-xl bg-primaryGray/50 backdrop-blur-md border border-white/30 text-stone-700 focus:outline-none focus:ring-2 focus:ring-primaryRed shadow-lg appearance-none cursor-pointer"
        >
          <option value="">Todos los decanatos</option>
          <option v-for="d in decanatos" :key="d" :value="d">
            {{ d }}
          </option>
        </select>

        <span
          class="absolute right-4 top-4 text-primaryRed pointer-events-none"
        >
          🎓
        </span>
      </div>

      <!-- Aviso -->
      <div
        class="bg-primaryRed border-l-4 border-red-500 text-white p-4 mb-6 rounded-lg shadow-md mt-4"
        role="alert"
      >
        <p class="font-bold">Votaciones en curso</p>
        <p>
          La mejor carta votada, se mostrará el Decanato proveniente y el
          semestre del autor. ¡Así que vota por tus cartas favoritas! 💌✨
          <br />
          Estamos atentos para ocultar cartas obscenas o inapropiadas, pero si
          ves alguna, por favor contacta al CE de tu decanato para borrarla 🙏.
        </p>
      </div>
    </div>

    <!-- 💌 LISTA -->
    <div class="w-full max-w-6xl mt-5 px-6 pb-20">
      <Card :cards="cards" />
      <!-- LOADING -->
      <div
        v-if="loading"
        class="bg-white/50 backdrop-blur-md rounded-xl p-6 text-center shadow-lg mt-2"
      >
        <p class="text-gray-700">Cargando más cartas...</p>
      </div>

      <!-- SENTINEL (trigger invisible) -->
      <div ref="sentinel" class="h-10"></div>
    </div>

    <!-- Estado vacío -->
    <div
      v-if="!loading && cards.length === 0"
      class="bg-white/50 backdrop-blur-md rounded-xl p-6 text-center shadow-lg"
    >
      <p class="text-gray-700">No se encontraron cartas 💔</p>
    </div>
  </section>
</template>

<style scoped></style>
