<script setup>
import { onMounted, ref } from 'vue'
import { useSupabase } from '../clients/supabase'
const { supabase } = useSupabase()
import CountUp from 'vue-countup-v3'

let numCards = ref(0)
let numUsers = ref(0)
let numCarreras = ref(23)

async function getCounters() {
  const { count } = await supabase
    .from('cartas')
    .select('*', { count: 'exact' })
  numCards.value = count
}

async function getUsers() {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
  numUsers.value = count
}

onMounted(() => {
  getCounters()
  getUsers()
})
</script>

<template>
  <section
    id="stats"
    class="relative py-20 bg-linear-to-r from-primaryRed via-red-500 to-rose-400"
  >
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <!-- Recuadro padre blanco con glass -->
      <div class="bg-white/50 rounded-3xl shadow-lg p-12 lg:p-16 relative z-10">
        <!-- Título -->
        <div class="text-center mb-16" data-aos="fade-up" data-aos-delay="100">
          <h2
            class="text-4xl font-bold text-gray-900 relative inline-block mb-4"
          >
            Estadísticas
            <span
              class="absolute left-0 -bottom-2 w-12 h-1 bg-red-500 rounded"
            ></span>
            <span
              class="absolute right-0 -bottom-2 w-12 h-1 bg-red-500 rounded"
            ></span>
          </h2>
          <p class="text-gray-700 text-lg">Nuestro progreso en números</p>
        </div>

        <div class="grid gap-12 lg:grid-cols-12 items-center">
          <!-- Imagen izquierda -->
          <div class="lg:col-span-5 flex justify-center" data-aos="fade-up">
            <img src="/img/counter-img.svg" alt="Carta" class="w-full h-auto" />
          </div>

          <!-- Estadísticas derecha -->
          <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Card 1 -->
            <div
              class="flex items-center gap-4 p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition transform hover:scale-105"
            >
              <i class="bi bi-envelope-heart text-4xl text-red-500"></i>
              <div>
                <CountUp
                  :end-val="numCards"
                  :duration="3"
                  class="text-4xl font-bold text-gray-900"
                />
                <p class="text-gray-700 text-sm mt-1">
                  <strong>Cartas</strong> enviadas
                </p>
              </div>
            </div>

            <!-- Card 2 -->
            <div
              class="flex items-center gap-4 p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition transform hover:scale-105"
            >
              <i class="bi bi-people text-4xl text-red-500"></i>
              <div>
                <CountUp
                  :end-val="numUsers"
                  :duration="3"
                  class="text-4xl font-bold text-gray-900"
                />
                <p class="text-gray-700 text-sm mt-1">
                  <strong>Usuarios</strong> registrados
                </p>
              </div>
            </div>

            <!-- Card 3 -->
            <div
              class="flex items-center gap-4 p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition transform hover:scale-105"
            >
              <i class="bi bi-mortarboard text-4xl text-red-500"></i>
              <div>
                <CountUp
                  :end-val="numCarreras"
                  :duration="3"
                  class="text-4xl font-bold text-gray-900"
                />
                <p class="text-gray-700 text-sm mt-1">
                  <strong>Carreras</strong> añadidas
                </p>
              </div>
            </div>

            <!-- Card 4 -->
            <div
              class="flex items-center gap-4 p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition transform hover:scale-105"
            >
              <i class="bi bi-shield-check text-4xl text-red-500"></i>
              <div>
                <CountUp
                  :start-val="100"
                  :end-val="0"
                  :duration="3"
                  class="text-4xl font-bold text-gray-900"
                />
                <p class="text-gray-700 text-sm mt-1">
                  <strong>Brechas</strong> de seguridad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay detrás del recuadro -->
    <div class="absolute inset-0 bg-black/20 z-0"></div>
  </section>
</template>
