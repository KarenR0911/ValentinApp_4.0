<script setup>
import Preloader from './Preloader.vue'
import { ref, onMounted } from 'vue'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'

const { supabase } = useSupabase()
const loading = ref(false)

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800)
})
</script>

<template>
  <!-- Preloader -->
  <Preloader v-if="loading" />

  <!-- Glass card contenedor -->
  <div
    class="w-full max-w-6xl flex flex-col items-center backdrop-blur-lg bg-white/20 rounded-3xl p-8 shadow-xl"
  >
    <!-- Título bonito -->
    <h1
      class="text-4xl md:text-5xl font-extrabold text-pink-500 text-center mb-8 drop-shadow-lg"
    >
      💌 Buzón de Cartas
    </h1>

    <!-- Filtros -->
    <div
      class="flex flex-col md:flex-row items-center gap-3 mb-10 w-full justify-center"
    >
      <input
        type="text"
        v-model="searchName"
        placeholder="Busca por destinatario..."
        class="grow max-w-md px-4 py-2 rounded-2xl border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:outline-none bg-white/30 backdrop-blur-md placeholder-pink-500 text-gray-800 text-center"
      />
      <select
        v-model="decanato"
        class="px-4 py-2 rounded-2xl border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:outline-none bg-white/30 backdrop-blur-md text-gray-800 text-center"
      >
        <option value="todos">Mostrar todas</option>
        <option value="DCYT">DCyT</option>
        <option value="DIC">DIC</option>
        <option value="DAG">DAG</option>
        <option value="DCV">DCV</option>
        <option value="DCEE">DCEE</option>
        <option value="DEHA">DEHA</option>
        <option value="DCS">DCS</option>
      </select>
      <button
        @click="searchCarta"
        class="px-5 py-2 bg-pink-400 text-white rounded-2xl hover:bg-pink-500 transition"
      >
        <i class="bi bi-search"></i>
      </button>
      <button
        @click="cleanSearch"
        class="px-5 py-2 bg-pink-100 text-pink-600 rounded-2xl hover:bg-pink-200 transition"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Cartas -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center"
    >
      <div
        v-for="carta in cartas"
        :key="carta.id"
        class="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col justify-between items-start hover:scale-105 hover:shadow-xl transition-transform w-full max-w-sm"
      >
        <div class="w-full text-left">
          <h5
            class="font-bold text-gray-800 text-lg flex items-center justify-between"
          >
            <span>{{ carta.nombre }} {{ carta.apellido }}</span>
            <i
              v-if="carta.rol == 'admin'"
              class="bi bi-patch-check-fill text-pink-500 ml-2"
            ></i>
          </h5>
          <h6 class="text-gray-500 mt-1">{{ carta.decanato }}</h6>
          <p class="mt-3 font-medium text-gray-700 truncate">
            Para {{ carta.destinatario }} ({{ carta.destino }})
          </p>
        </div>

        <button
          class="mt-4 self-end text-pink-500 text-2xl hover:text-pink-600 transition"
          @click="getOneCarta(carta.id)"
          title="Ver carta"
        >
          <i class="bi bi-envelope"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        class="bg-white/50 backdrop-blur-md rounded-3xl shadow-lg max-w-lg w-full p-6 relative"
      >
        <button
          @click="showModal = false"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div class="space-y-4 max-h-[60vh] overflow-y-auto">
          <div v-for="ucarta in oneCarta" :key="ucarta.id">
            <p>
              <strong>De:</strong> {{ ucarta.nombre }} {{ ucarta.apellido }}
              <i
                v-if="ucarta.rol == 'admin'"
                class="bi bi-patch-check-fill text-pink-500 ml-1"
              ></i>
              ({{ ucarta.decanato }})
            </p>
            <p>
              <strong>Para:</strong> {{ ucarta.destinatario }} ({{
                ucarta.destino
              }})
            </p>
            <hr class="border-pink-300" />
            <p class="text-gray-700">{{ ucarta.texto }}</p>
            <button
              v-if="userRole == 'admin'"
              @click="questionDelete(ucarta.id)"
              class="mt-2 px-4 py-2 bg-pink-400 text-white rounded-2xl hover:bg-pink-500 transition"
            >
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            @click="showModal = false"
            class="px-4 py-2 bg-pink-100 text-pink-600 rounded-2xl hover:bg-pink-200 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.truncate {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
