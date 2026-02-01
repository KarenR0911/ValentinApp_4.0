<script setup>
import { ref } from 'vue'

let year = new Date().getFullYear()
let copyright = ref(year)
</script>

<template>
  <footer class="bg-primaryRed text-white py-12 relative">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <!-- Nombre y lema -->
      <h3 class="text-4xl font-bold mb-2">ValentinApp</h3>
      <p class="italic mb-6">"Cartas para todos"</p>

      <!-- Redes sociales -->
      <div class="flex justify-center gap-4 mb-6">
        <a
          href="https://x.com/codefrontend87"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 transition"
        >
          <i class="bi bi-twitter-x text-white"></i>
        </a>
        <a
          href="https://www.facebook.com/josemanuel.graterolrodriguez"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 transition"
        >
          <i class="bi bi-facebook text-white"></i>
        </a>
        <a
          href="https://www.instagram.com/josephcode_87"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 transition"
        >
          <i class="bi bi-instagram text-white"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/jos%C3%A9-manuel-graterol-rodriguez-856788249/"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 transition"
        >
          <i class="bi bi-linkedin text-white"></i>
        </a>
        <a
          href="https://github.com/JoseXP7"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 transition"
        >
          <i class="bi bi-github text-white"></i>
        </a>
      </div>

      <!-- Copyright -->
      <div class="border-t border-white/20 pt-6">
        <div class="text-sm">
          <span>&#169; {{ copyright }}</span>
          <strong class="px-1">ValentinApp</strong>
          <span>Todos los derechos reservados</span>
        </div>
        <div class="text-sm mt-2">
          Hecho por
          <a
            href="https://github.com/JoseXP7"
            class="underline hover:text-red-200 transition"
            >José Graterol</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
