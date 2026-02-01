<script setup>
import CardBuzon from '../components/CardBuzon.vue'
import { ref, onMounted } from 'vue'

const navbarHeight = ref(0)

const updateNavbarHeight = () => {
  navbarHeight.value = window.innerWidth >= 768 ? 80 : 64 //
}

onMounted(() => {
  updateNavbarHeight()
  window.addEventListener('resize', updateNavbarHeight)
})
</script>

<template>
  <section
    class="h-screen w-screen flex flex-col items-center justify-start overflow-hidden bg-cover bg-center md:pt-60 md:pb-110 -mt-14"
    :style="`height: calc(100vh - ${navbarHeight}px); background-image: url('/img/hero-bg.jpg');`"
  >
    <CardBuzon />
  </section>
</template>

<style scoped>
/* nada extra, el fondo y scroll se controlan por Tailwind y height calculado */
</style>
