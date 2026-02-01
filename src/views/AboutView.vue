<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center px-6 py-16 -mt-14"
    style="
      background-image: url('/img/hero-bg.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <!-- Contenedor glassmorphism -->
    <div
      class="w-full max-w-6xl bg-white/20 backdrop-blur-lg rounded-3xl p-12 flex flex-col gap-12 shadow-xl"
    >
      <!-- Título -->
      <h2 class="text-4xl font-bold text-gray-800 text-center">
        💌 Nuestro equipo
      </h2>

      <!-- Iconos + textos -->
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Item 1 -->
        <div
          class="flex items-center gap-6 flex-1"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            class="shrink-0 w-24 h-24 bg-white/30 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <i class="bi bi-heart text-pink-500 text-4xl"></i>
          </div>
          <p class="text-gray-700">
            Expresa tu cariño y gratitud a tus amigos más cercanos. ¡Una carta
            puede ser el mejor regalo!
          </p>
        </div>

        <!-- Item 2 -->
        <div
          class="flex items-center gap-6 flex-1"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            class="shrink-0 w-24 h-24 bg-white/30 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <i class="bi bi-envelope-heart text-pink-500 text-4xl"></i>
          </div>
          <p class="text-gray-700">
            ¿Tienes algo que decirle a esa persona especial? Utiliza nuestra
            plataforma para enviar cartas (incluso anónimas) y hacer oír tu voz.
          </p>
        </div>

        <!-- Item 3 -->
        <div
          class="flex items-center gap-6 flex-1"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div
            class="shrink-0 w-24 h-24 bg-white/30 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <i class="bi bi-incognito text-pink-500 text-4xl"></i>
          </div>
          <p class="text-gray-700">
            ¿Esa persona especial en clase te roba el aliento? ¡Atrévete a
            escribirle una carta anónima! Expresa tus sentimientos sin revelar
            tu identidad y deja que la magia de las palabras haga el resto.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Glassmorphism todo con Tailwind, no necesita CSS extra */
</style>
