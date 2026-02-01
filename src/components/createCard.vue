<script setup>
import { useSupabase } from '@/clients/supabase'
import { onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const props = defineProps(['user'])
const { user } = toRefs(props)

const username = ref(null)
const surname = ref(null)
const decanato = ref(null)
const role = ref(null)

const texto = ref('')
const destinatario = ref('')
const destino = ref('')

const loading = ref(false)
const anonimato = ref(false)

const { supabase } = useSupabase()
const router = useRouter()

onMounted(() => {
  getProfile()
})

const getProfile = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('profiles')
      .select('username, surname, decanato, role')
      .eq('id', user.value.id)
      .single()

    if (error) throw error

    username.value = data.username
    surname.value = data.surname
    decanato.value = data.decanato
    role.value = data.role
  } catch (error) {
    Swal.fire('Error', error.message, 'error')
  } finally {
    loading.value = false

    if (!username.value || !surname.value) {
      Swal.fire({
        icon: 'error',
        title: 'Perfil incompleto',
        text: 'Debes completar tu perfil antes de enviar cartas',
      })
      router.push('/')
    }
  }
}

const sendCard = async () => {
  if (!texto.value || !destinatario.value || !destino.value) {
    Swal.fire('Oops...', 'Debes rellenar todos los campos', 'error')
    return
  }

  try {
    loading.value = true

    const payload = {
      nombre: username.value,
      apellido: surname.value,
      texto: texto.value,
      decanato: decanato.value,
      id_user: user.value.id,
      destino: destino.value,
      destinatario: destinatario.value,
      rol: role.value,
    }

    const { error } = await supabase.from('cartas').upsert(payload)
    if (error) throw error

    Swal.fire('¡Carta enviada!', 'Revisa el buzón 💌', 'success')
    texto.value = ''
    destinatario.value = ''
  } catch (error) {
    Swal.fire('Error', error.message, 'error')
  } finally {
    loading.value = false
  }
}

const handleIncognito = () => {
  anonimato.value = !anonimato.value
  if (anonimato.value) {
    username.value = 'Anónimo'
    surname.value = '🕵️'
  } else {
    getProfile()
  }
}
</script>

<template>
  <div class="flex justify-center px-4 py-10">
    <div
      class="w-full max-w-xl p-8 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/30 animate-fade-in"
    >
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <i class="bi bi-envelope-heart-fill text-primaryRed"></i>
        Enviar una carta
      </h3>

      <form @submit.prevent="sendCard" class="space-y-4">
        <!-- Destinatario -->
        <div>
          <label class="text-sm font-semibold text-gray-700">
            ¿Para quién va tu carta? <span class="text-primaryRed">*</span>
          </label>
          <input
            v-model="destinatario"
            type="text"
            placeholder="Para alguien especial…"
            class="w-full mt-1 px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          />
        </div>

        <!-- Carrera -->
        <div>
          <label class="text-sm font-semibold text-gray-700">
            Carrera del afortunado(a) <span class="text-primaryRed">*</span>
          </label>
          <select
            v-model="destino"
            class="w-full mt-1 px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          >
            <option disabled value="">Selecciona una carrera</option>
            <optgroup label="DCyT">
              <option>Ingeniería en Informática</option>
              <option>Ingeniería en Telemática</option>
              <option>Ingeniería de Producción</option>
              <option>Análisis de Sistemas</option>
              <option>Licenciatura en Física</option>
              <option>Licenciatura en Matemática</option>
            </optgroup>
            <optgroup label="DCV">
              <option>Medicina Veterinaria</option>
              <option>T.S.U Agropecuaria</option>
            </optgroup>
            <optgroup label="DIC">
              <option>Ingeniería Civil</option>
              <option>Urbanismo</option>
            </optgroup>
            <optgroup label="DAG">
              <option>Ingeniería Agronómica</option>
              <option>Ingeniería Agroindustrial</option>
              <option>T.S.U Agroindustrial</option>
            </optgroup>
            <optgroup label="DCS">
              <option>Enfermería</option>
              <option>Medicina</option>
            </optgroup>
            <optgroup label="DCEE">
              <option>Economía</option>
              <option>Administración</option>
              <option>Contaduría</option>
            </optgroup>
            <optgroup label="DEHA">
              <option>Licenciatura en Desarrollo Humano</option>
              <option>Licenciatura en Psicología</option>
              <option>Licenciatura en Música</option>
              <option>Licenciatura en Artes Plásticas</option>
            </optgroup>
          </select>
        </div>

        <!-- Texto -->
        <div>
          <label class="text-sm font-semibold text-gray-700">
            Escribe tu carta <span class="text-primaryRed">*</span>
          </label>
          <textarea
            v-model="texto"
            rows="4"
            placeholder="Las rosas son rojas…"
            class="w-full mt-1 px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          ></textarea>
        </div>

        <!-- Incognito -->
        <div class="flex items-start gap-2">
          <input
            id="incognito"
            type="checkbox"
            class="mt-1 accent-red-500"
            @change="handleIncognito"
          />
          <label for="incognito" class="text-sm text-gray-700">
            Modo incógnito 🕵️
            <p v-if="anonimato" class="text-xs text-gray-500 mt-1">
              Tu nombre aparecerá como “Anónimo”
            </p>
          </label>
        </div>

        <!-- Botón -->
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition disabled:opacity-60 flex items-center gap-2"
          >
            <i class="bi bi-chat-heart"></i>
            {{ loading ? 'Enviando…' : 'Enviar' }}
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
