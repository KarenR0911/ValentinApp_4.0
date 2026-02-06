<script setup>
import { ref } from 'vue'
import { useSupabase } from '@/clients/supabase'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { completeProfileSchema } from '@/schemas/completeProfile.schema.js'

const userStore = useUserStore()
const { supabase } = useSupabase()
const router = useRouter()

const form = ref({
  nombre: '',
  apellido: '',
  decanato: '',
  semestre: '',
})
const loading = ref(false)
const errors = ref({})

const submit = async () => {
  errors.value = {}
  const parsed = completeProfileSchema.safeParse({
    nombre: form.value.nombre,
    apellido: form.value.apellido,
    decanato: form.value.decanato,
    semestre: form.value.semestre,
  })

  if (!parsed.success) {
    const issues = parsed.error?.issues || parsed.error?.errors || []
    issues.forEach((e) => {
      errors.value[e.path?.[0]] = e.message
    })
    return
  }

  try {
    loading.value = true

    const updates = {
      id: userStore.user.id,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      decanato: form.value.decanato,
      semestre: form.value.semestre,
    }

    const { error } = await supabase.from('profiles').upsert(updates)
    if (error) throw error

    await userStore.getProfile()

    Swal.fire({
      icon: 'success',
      title: 'Perfil completado',
      text: 'Tu perfil ha sido guardado correctamente',
    })

    router.push('/')
  } catch (error) {
    Swal.fire('Error', error.message || error, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-6"
    style="background-image: url('/img/hero-bg.jpg')"
  >
    <div
      class="w-full max-w-md p-8 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/30 animate-fade-in"
    >
      <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="bi bi-person-plus-fill text-primaryRed"></i>
        Completar Perfil
      </h3>

      <form @submit.prevent="submit" class="space-y-4" autocomplete="off">
        <div>
          <label for="nombre" class="block text-sm text-gray-700 mb-1"
            >Nombre</label
          >
          <input
            id="nombre"
            type="text"
            v-model="form.nombre"
            placeholder="Nombre"
            class="w-full pl-4 pr-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          />
          <small class="text-red-600 text-sm" v-if="errors.nombre">{{
            errors.nombre
          }}</small>
        </div>

        <div>
          <label for="apellido" class="block text-sm text-gray-700 mb-1"
            >Apellido</label
          >
          <input
            id="apellido"
            type="text"
            v-model="form.apellido"
            placeholder="Apellido"
            class="w-full pl-4 pr-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          />
          <small class="text-red-600 text-sm" v-if="errors.apellido">{{
            errors.apellido
          }}</small>
        </div>

        <div>
          <label for="decanato" class="block text-sm text-gray-700 mb-1"
            >Decanato</label
          >
          <select
            id="decanato"
            v-model="form.decanato"
            class="w-full py-2 px-4 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          >
            <option value="" disabled>Selecciona un decanato</option>
            <option value="DCYT">DCyT</option>
            <option value="DIC">DIC</option>
            <option value="DAG">DAG</option>
            <option value="DCV">DCV</option>
            <option value="DCEE">DCEE</option>
            <option value="DEHA">DEHA</option>
            <option value="DCS">DCS</option>
          </select>
          <small class="text-red-600 text-sm" v-if="errors.decanato">{{
            errors.decanato
          }}</small>
        </div>

        <div>
          <label for="semestre" class="block text-sm text-gray-700 mb-1"
            >Semestre / Año</label
          >
          <select
            id="semestre"
            v-model="form.semestre"
            class="w-full py-2 px-4 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          >
            <option value="" disabled>Selecciona tu semestre o año</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <small class="text-red-600 text-sm" v-if="errors.semestre">{{
            errors.semestre
          }}</small>
        </div>

        <div class="space-y-2">
          <button
            class="w-full py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition flex items-center justify-center gap-2 disabled:opacity-60"
            type="submit"
            :disabled="loading"
          >
            <span v-if="!loading">Guardar</span>
            <span v-else class="flex items-center gap-2">
              <i class="bi bi-arrow-repeat animate-spin"></i>
              Guardando...
            </span>
          </button>
        </div>
      </form>
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
