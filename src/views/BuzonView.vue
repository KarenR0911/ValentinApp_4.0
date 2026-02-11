<script setup>
import Card from '@/components/Card.vue'
import Preloader from '@/components/Preloader.vue'
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

/* =========================
   MAPA CARRERA → DECANATO
========================= */
const careerToDecanato = {
  /* DCYT */
  'Ingeniería en Informática': 'DCYT',
  'Ingeniería en Telemática': 'DCYT',
  'Ingeniería de Producción': 'DCYT',
  'Análisis de Sistemas': 'DCYT',
  'Licenciatura en Física': 'DCYT',
  'Licenciatura en Matemática': 'DCYT',

  /* DCV */
  'Medicina Veterinaria': 'DCV',
  'T.S.U Agropecuaria': 'DCV',

  /* DIC */
  'Ingeniería Civil': 'DIC',
  Urbanismo: 'DIC',

  /* DAG */
  'Ingeniería Agronómica': 'DAG',
  'Ingeniería Agroindustrial': 'DAG',
  'T.S.U Agroindustrial': 'DAG',

  /* DCS */
  Enfermería: 'DCS',
  Medicina: 'DCS',

  /* DCEE */
  Economía: 'DCEE',
  Administración: 'DCEE',
  Contaduría: 'DCEE',

  /* DEHA */
  'Licenciatura en Desarrollo Humano': 'DEHA',
  'Licenciatura en Psicología': 'DEHA',
  'Licenciatura en Música': 'DEHA',
  'Licenciatura en Artes Plásticas': 'DEHA',
}

/* =========================
   FILTRO DECANATO
========================= */
const decanatos = ['DCYT', 'DCV', 'DAG', 'DEHA', 'DCS', 'DIC', 'DCEE']

const selectedDecanato = ref('')

onMounted(() => {
  if (userStore.profile?.decanato) {
    selectedDecanato.value = userStore.profile.decanato
  }
})

/* =========================
   BUSCADOR
========================= */
const search = ref('')

const filteredCards = computed(() => {
  let result = cards.value

  /* FILTRO POR DECANATO */
  if (selectedDecanato.value) {
    result = result.filter((c) => {
      const decanato = careerToDecanato[c.decanato_destino]
      return decanato === selectedDecanato.value
    })
  }

  /* BUSCADOR */
  if (search.value) {
    const q = search.value.toLowerCase()

    result = result.filter(
      (c) =>
        c.destinatario.toLowerCase().includes(q) ||
        c.decanato_destino.toLowerCase().includes(q),
    )
  }

  return result
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
      .select('*, author:public_profiles(nombre, apellido)')
      .order('created_at', { ascending: false })
      .eq('status', 'published') // Solo cargar cartas pendientes para moderación

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

onMounted(() => {
  cards.value = []
  // loadCards()
})
</script>

<template>
  <section
    class="w-screen flex flex-col items-center overflow-y-auto bg-cover bg-center"
    :style="`height: calc(100vh - ${navbarHeight}px); background-image: url('/img/hero-bg.jpg');`"
  >
    <Preloader v-if="loading" />
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
    </div>

    <!-- 💌 LISTA -->
    <div class="w-full max-w-6xl mt-10 px-6 pb-20">
      <!--Aviso de buzon cerrado-->
      <div
        v-if="filteredCards.length === 0 && !loading"
        class="bg-white/80 backdrop-blur-md rounded-xl p-6 text-center shadow-lg"
      >
        <h2 class="text-2xl font-bold text-primaryRed mb-4">Buzón cerrado</h2>
        <p class="text-gray-700">
          El buzón está cerrado por el momento hasta el 14 de Febrero, puedes
          seguir enviando cartas, las estaremos revisando. ¡Gracias por tu
          comprensión!
        </p>
      </div>
      <!-- <Card :cards="filteredCards" /> -->
    </div>

    <!-- Estado vacío -->
    <!-- <p v-if="filteredCards.length === 0" class="text-white/80 mt-10 text-lg">
      No se encontraron cartas 💔
    </p> -->
  </section>
</template>

<style scoped></style>
