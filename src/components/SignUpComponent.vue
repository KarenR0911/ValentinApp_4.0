<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const email = ref('')
const password = ref('')
const emailregEx = /[^@ \t\r\n]{8,}@gmail\.com/g

const { signUpWithPassw } = useAuth()

const signup = async () => {
  if (!emailregEx.test(email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes usar un correo Gmail válido',
    })
    return
  }

  try {
    loading.value = true
    await signUpWithPassw({
      email: email.value,
      password: password.value,
    })
    Swal.fire({
      title: 'Cuenta creada',
      text: 'Ya puedes iniciar sesión',
      icon: 'success',
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="h-screen w-screen bg-cover grid grid-cols-1 md:grid-cols-2 -mt-14"
    style="background-image: url('/img/hero-bg.jpg')"
  >
    <!-- Panel izquierdo -->
    <div
      class="hidden md:flex flex-col justify-center items-center px-12 text-white bg-linear-to-r from-primaryRed via-red-500 to-rose-400"
    >
      <h1 class="text-4xl font-bold mb-4">ValentinApp</h1>
      <p class="text-lg text-center max-w-sm opacity-90">
        Lo que nunca le has dicho, aquí encuentra voz.
      </p>
    </div>

    <!-- Panel derecho -->
    <div class="flex items-center justify-center px-6">
      <div
        class="w-full max-w-md p-8 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/30 animate-fade-in"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">
          Crear cuenta
        </h2>

        <p class="text-gray-600 text-sm text-center mb-6">
          ¿Ya tienes cuenta?
          <RouterLink
            to="/auth"
            class="text-primaryRed font-semibold hover:underline"
          >
            Inicia sesión
          </RouterLink>
        </p>

        <form @submit.prevent="signup" class="space-y-4">
          <!-- Email -->
          <div class="relative">
            <i
              class="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-primaryRed"
            ></i>
            <input
              v-model="email"
              type="email"
              required
              placeholder="correo@gmail.com"
              class="w-full pl-11 pr-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
            />
          </div>

          <!-- Password -->
          <div class="relative">
            <i
              class="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-primaryRed"
            ></i>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full pl-11 pr-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
            />
          </div>

          <!-- Botón -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span v-if="!loading">Crear cuenta</span>
            <span v-else class="flex items-center gap-2">
              <i class="bi bi-arrow-repeat animate-spin"></i>
              Creando...
            </span>
          </button>

          <!-- Info -->
          <p class="text-xs text-gray-600 text-center mt-4">
            <i class="bi bi-info-circle-fill text-primaryRed"></i>
            Tus datos serán eliminados al finalizar la actividad.
            <br />
            Att: <span class="font-semibold text-orange-500">Delta DCyT</span> y
            <span class="font-semibold text-indigo-600">CEDCYT</span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
