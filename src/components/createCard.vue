<script setup>
import { useSupabase } from '@/clients/supabase'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { cardSchema } from '@/schemas/card.schema.js'
import { useUserStore } from '@/stores/userStore'

const { supabase } = useSupabase()
const router = useRouter()

/* ======================
   STATE
====================== */
const form = ref({
  destinatario: '',
  semestre: '',
  destino: '',
  texto: '',
  is_anonymous: false,
  spotify_url: '',
})

const loading = ref(false)
const errors = ref({})
const userStore = useUserStore()

/* ======================
   SPOTIFY EMBED
====================== */
const spotifyEmbed = computed(() => {
  if (!form.value.spotify_url) return null
  return form.value.spotify_url.replace(
    'open.spotify.com',
    'open.spotify.com/embed',
  )
})

/* ======================
   SEND CARD
====================== */
const submit = async () => {
  errors.value = {}
  const parsed = cardSchema.safeParse({
    destinatario: form.value.destinatario,
    semestre: form.value.semestre,
    destino: form.value.destino,
    texto: form.value.texto,
    is_anonymous: form.value.is_anonymous,
    spotify_url: form.value.spotify_url,
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

    const spotifyUrl = form.value.spotify_url
    const spotifyType = spotifyUrl
      ? spotifyUrl.includes('/track')
        ? 'track'
        : 'playlist'
      : null

    const insertPayload = {
      author_id: userStore.user?.id || null,
      destinatario: form.value.destinatario,
      decanato_destino: form.value.destino,
      texto: form.value.texto,
      is_anonymous: form.value.is_anonymous,
      semestre: form.value.semestre || 'N/A',
      spotify_url: spotifyUrl || null,
      spotify_type: spotifyType,
    }

    const { error } = await supabase.from('cards').insert(insertPayload)

    if (error) throw error

    Swal.fire({
      icon: 'success',
      title: 'Carta enviada 💌',
      text: 'Tu mensaje ya está en el buzón',
      confirmButtonColor: '#ef4444',
    })

    router.push('/buzon')
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Ups…',
      text: err.message || 'Algo salió mal',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center px-4 py-10">
    <div
      class="w-full max-w-xl p-8 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/30"
    >
      <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        💌 Enviar una carta
      </h3>

      <form @submit.prevent="submit" class="space-y-4">
        <!-- Destinatario -->
        <div>
          <label for="destinatario" class="block text-sm text-gray-700 mb-1"
            >Destinatario</label
          >
          <input
            v-model="form.destinatario"
            type="text"
            id="destinatario"
            placeholder="Para alguien especial…"
            class="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          />
          <small class="text-red-600 text-sm" v-if="errors.destinatario">{{
            errors.destinatario
          }}</small>
        </div>

        <div>
          <label for="semestre" class="block text-sm text-gray-700 mb-1"
            >Semestre del afortunad@</label
          >
          <select
            id="semestre"
            v-model="form.semestre"
            class="w-full py-2 px-4 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          >
            <option value="" disabled selected>
              Selecciona el semestre o año de destino 🎓
            </option>
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

        <!-- Carrera -->
        <div>
          <label for="destino" class="block text-sm text-gray-700 mb-1"
            >Carrera de destino</label
          >
          <select
            v-model="form.destino"
            id="destino"
            class="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          >
            <option value="" disabled selected>Selecciona el destino 🎓</option>
            <optgroup label="DCyT">
              <option value="Ingeniería en Informática" selected>
                Ingeniería en Informática
              </option>
              <option value="Ingeniería en Telemática">
                Ingeniería en Telemática
              </option>
              <option value="Ingeniería de Producción">
                Ingeniería de Producción
              </option>
              <option value="Análisis de Sistemas">Análisis de Sistemas</option>
              <option value="Licenciatura en Física">
                Licenciatura en Física
              </option>
              <option value="Licenciatura en Matemática">
                Licenciatura en Matemática
              </option>
            </optgroup>
            <optgroup label="DCV">
              <option value="Medicina Veterinaria">Medicina Veterinaria</option>
              <option value="T.S.U Agropecuaria">T.S.U Agropecuaria</option>
            </optgroup>
            <optgroup label="DIC">
              <option value="Ingeniería Civil">Ingeniería Civil</option>
              <option value="Urbanismo">Urbanismo</option>
            </optgroup>
            <optgroup label="DAG">
              <option value="Ingeniería Agronómica">
                Ingeniería Agronómica
              </option>
              <option value="Ingeniería Agroindustrial">
                Ingeniería Agroindustrial
              </option>
              <option value="T.S.U Agroindustrial">T.S.U Agroindustrial</option>
            </optgroup>
            <optgroup label="DCS">
              <option value="Enfermería">Enfermeria</option>
              <option value="Medicina">Medicina</option>
            </optgroup>
            <optgroup label="DCEE">
              <option value="Economía">Economía</option>
              <option value="Administración">Administración</option>
              <option value="Contaduría">Contaduría</option>
            </optgroup>
            <optgroup label="DEHA">
              <option value="Licenciatura en Desarrollo Humano">
                Licenciatura en Desarrollo Humano
              </option>
              <option value="Licenciatura en Psicología">
                Licenciatura en Psicología
              </option>
              <option value="Licenciatura en Música">
                Licenciatura en Música
              </option>
              <option value="Licenciatura en Artes Plásticas">
                Licenciatura en Artes Plásticas
              </option>
            </optgroup>
          </select>
          <small class="text-red-600 text-sm" v-if="errors.destino">{{
            errors.destino
          }}</small>
        </div>

        <!-- Texto -->
        <div>
          <label for="texto" class="block text-sm text-gray-700 mb-1"
            >Mensaje</label
          >
          <textarea
            v-model="form.texto"
            rows="4"
            id="texto"
            placeholder="Escribe tu carta 💌"
            class="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          ></textarea>
          <small class="text-red-600 text-sm" v-if="errors.texto">{{
            errors.texto
          }}</small>
        </div>

        <!-- Spotify -->
        <div>
          <label for="spotify" class="block text-sm text-gray-700 mb-1"
            >Link de Spotify (opcional)</label
          >
          <input
            v-model="form.spotify_url"
            type="text"
            id="spotify"
            placeholder="Link de Spotify (opcional)"
            class="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
          />
          <small class="text-red-600 text-sm" v-if="errors.spotify_url">{{
            errors.spotify_url
          }}</small>

          <!-- Preview Spotify -->
          <iframe
            v-if="spotifyEmbed"
            :src="spotifyEmbed"
            width="100%"
            height="80"
            class="rounded-lg"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen"
          ></iframe>
        </div>

        <!-- Incognito -->
        <div class="flex items-start gap-2">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="form.is_anonymous"
              class="sr-only peer"
              value=""
            />
            <div
              class="group peer bg-white rounded-full duration-300 w-10 h-4 ring-2 ring-gray-500 after:duration-300 after:bg-gray-500 peer-checked:after:bg-red-500 peer-checked:ring-red-500 after:rounded-full after:absolute after:h-3 after:w-3 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-5 peer-hover:after:scale-95"
            ></div>
            <span class="ml-2 text-sm text-gray-700">Modo incógnito 🕵️</span>
          </label>
          <small class="text-red-600 text-sm" v-if="errors.is_anonymous"
            >{{ errors.is_anonymous }}
          </small>
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition disabled:opacity-60 flex items-center gap-2"
        >
          {{ loading ? 'Enviando…' : 'Enviar 💘' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
