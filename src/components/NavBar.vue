<script setup>
import { useSupabase } from '@/clients/supabase'
import { RouterLink } from 'vue-router'
import { useUser } from '@/composables/useUser'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { user } = useUser()
const { supabase } = useSupabase()
const loading = ref(false)
const router = useRouter()

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const open = ref(false)
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50">
    <nav
      class="w-full bg-[rgba(245,230,211,0.4)] backdrop-blur-sm shadow-md transition-all duration-300"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div class="flex justify-between items-center h-16 md:h-20">
          <!-- Logo -->
          <RouterLink to="/" class="shrink-0">
            <img
              src="/img/logo_horizontal.png"
              alt="Logo Valentin App"
              class="h-10 md:h-12"
            />
          </RouterLink>

          <!-- Desktop menu -->
          <ul class="hidden md:flex space-x-4 items-center">
            <li>
              <RouterLink
                to="/"
                class="px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
                >Inicio</RouterLink
              >
            </li>
            <li v-if="Object.keys(user).length">
              <RouterLink
                to="/enviar"
                class="px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
                >Enviar una carta</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/buzon"
                class="px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
                >Buzón</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/about"
                class="px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
                >Sobre Nosotros</RouterLink
              >
            </li>

            <!-- Auth buttons -->
            <li v-if="Object.keys(user).length">
              <button
                @click="signOut"
                :disabled="loading"
                class="ml-4 px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Cerrar Sesión
              </button>
            </li>
            <li v-else class="flex space-x-2">
              <RouterLink
                to="/auth"
                class="px-4 py-2 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"
                >Iniciar Sesión</RouterLink
              >
              <RouterLink
                to="/authSignUp"
                class="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >Registrarme</RouterLink
              >
            </li>
          </ul>

          <!-- Mobile menu button -->
          <button
            @click="open = !open"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-red-500 transition"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!open"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="open"
        class="md:hidden bg-[rgba(245,230,211,0.4)] backdrop-blur-sm px-2 pt-2 pb-3 space-y-1 transition-all"
      >
        <RouterLink
          to="/"
          class="block px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
          @click="open = false"
          >Inicio</RouterLink
        >
        <RouterLink
          v-if="Object.keys(user).length"
          to="/enviar"
          class="block px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
          @click="open = false"
          >Enviar una carta</RouterLink
        >
        <RouterLink
          to="/buzon"
          class="block px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
          @click="open = false"
          >Buzón</RouterLink
        >
        <RouterLink
          to="/about"
          class="block px-3 py-2 rounded-md text-gray-800 hover:text-red-500 transition"
          @click="open = false"
          >Sobre Nosotros</RouterLink
        >
        <div class="mt-2">
          <button
            v-if="Object.keys(user).length"
            @click="signOut"
            :disabled="loading"
            class="w-full px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>
          <div v-else class="flex flex-col space-y-2">
            <RouterLink
              to="/auth"
              class="w-full px-4 py-2 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"
              @click="open = false"
              >Iniciar Sesión</RouterLink
            >
            <RouterLink
              to="/authSignUp"
              class="w-full px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              @click="open = false"
              >Registrarme</RouterLink
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
