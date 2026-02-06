<script setup>
import { ref } from 'vue'

const props = defineProps({
  cards: Array,
})

const selectedCard = ref(null)

const openModal = (card) => {
  selectedCard.value = card
}

const embedUrl = (url) => {
  return url.replace('open.spotify.com', 'open.spotify.com/embed')
}
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- CARD -->
    <div
      v-for="card in cards"
      :key="card.id"
      @click="openModal(card)"
      class="cursor-pointer group bg-primaryGray/50 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg shadow-black/10 hover:bg-primaryRed/80 transition-all duration-300"
    >
      <h3 class="text-xl font-serif text-primaryRed group-hover:text-[#F7E4DA]">
        Para: {{ card.destinatario }}
      </h3>

      <p class="text-sm text-stone-600 mt-2 group-hover:text-[#F3D6C6]">
        Decanato: {{ card.decanato_destino }}
      </p>

      <p class="mt-3 text-stone-700 group-hover:text-[#F3D6C6]">
        De:
        <span v-if="card.is_anonymous">💌 Anónimo</span>
        <span v-else>{{ card.author?.nombre }}</span>
      </p>

      <p class="text-xs text-stone-500 mt-4 group-hover:text-[#EBC1B0]">
        Click para leer 💘
      </p>
    </div>

    <!-- MODAL -->
    <div
      v-if="selectedCard"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="selectedCard = null"
    >
      <div
        class="bg-primaryGray/90 backdrop-blur-lg border border-white/30 rounded-xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn"
      >
        <!-- Close -->
        <button
          @click="selectedCard = null"
          class="absolute top-3 right-4 text-white text-xl hover:scale-110"
        >
          ✕
        </button>

        <h2 class="text-2xl font-serif text-primaryRed mb-4">
          💌 Carta para {{ selectedCard.destinatario }}
        </h2>

        <p class="mt-2">
          De:
          <span v-if="selectedCard.is_anonymous">💌 Anónimo</span>
          <span v-else>
            {{ selectedCard.author?.nombre }}
            {{ selectedCard.author?.apellido }}
          </span>
        </p>

        <p class="text-sm text-stone-600">
          Destino:
          <span class="font-semibold">
            {{ selectedCard.decanato_destino }}
          </span>
        </p>

        <p class="text-stone-700 mt-2 mb-4 whitespace-pre-line">
          {{ selectedCard.texto }}
        </p>

        <!-- Spotify -->
        <iframe
          v-if="selectedCard.spotify_url"
          class="mt-6 rounded-lg"
          :src="embedUrl(selectedCard.spotify_url)"
          width="100%"
          height="80"
          frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style>
.animate-fadeIn {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
