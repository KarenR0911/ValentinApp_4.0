<template>
  <section
    id="about"
    class="relative bg-linear-to-r from-primaryRed via-red-500 to-rose-400 pt-28 pb-5"
  >
    <!-- Overlay para contraste -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Wave flotante -->
    <div
      class="absolute top-0 left-0 w-full -translate-y-3/6 pointer-events-none"
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        class="w-full h-40"
      >
        <defs>
          <linearGradient
            id="aboutWaveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stop-color="#5A0416" />
            <stop offset="50%" stop-color="#C9242D" />
            <stop offset="100%" stop-color="#CC4E62" />
          </linearGradient>
        </defs>
        <path
          fill="url(#aboutWaveGradient)"
          d="M0,0L80,16C160,32,320,64,480,74.7C640,85,800,75,960,64C1120,53,1280,43,1360,37.3L1440,32V160H0Z"
        />
      </svg>
    </div>

    <!-- Header -->
    <div
      class="relative z-10 max-w-7xl mx-auto px-6 text-center mb-20"
      data-aos="fade-up"
    >
      <h2 class="text-4xl font-extrabold text-white">Version 4.0</h2>
      <p class="mt-3 text-gray-200 text-lg">La forma más honesta de conectar</p>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-14 items-start">
        <!-- Left -->
        <div
          class="xl:col-span-5 flex flex-col gap-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3 class="text-3xl font-semibold text-white leading-tight">
            ValentinApp
            <span class="block text-rose-200 text-xl font-normal">
              Una carta puede cambiarlo todo ✨
            </span>
          </h3>

          <p class="text-gray-200 leading-relaxed">
            Descubre el amor y la amistad dentro de la uni de una forma
            auténtica. Envía cartas anónimas, crea tu perfil y explora el buzón
            público. Sin presión. Sin máscaras. Solo conexiones reales.
          </p>

          <div class="flex justify-center xl:justify-start mt-4">
            <RouterLink
              to="/about"
              class="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-primaryRed font-semibold hover:bg-rose-100 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explora ValentinApp
              <i class="bi bi-arrow-right"></i>
            </RouterLink>
          </div>
        </div>

        <!-- Right -->
        <div class="xl:col-span-7" data-aos="fade-up" data-aos-delay="200">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Card 1: Modo Anónimo -->
            <div
              class="group relative overflow-hidden p-7 rounded-2xl bg-white/90 backdrop-blur shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <!-- Icono de fondo -->
              <i
                class="bi bi-incognito absolute -top-6 -right-6 text-[120px] text-rose-200/30 pointer-events-none"
              ></i>
              <!-- Icono principal -->
              <div
                class="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-4 group-hover:scale-110 transition"
              >
                <i class="bi bi-incognito text-2xl"></i>
              </div>
              <h4 class="relative z-10 text-lg font-semibold text-gray-900">
                Modo Anónimo
              </h4>
              <p class="relative z-10 mt-2 text-gray-600">
                Interactúa sin revelar tu identidad hasta que tú lo decidas.
              </p>
            </div>

            <!-- Card 2: Velocidad Mejorada -->
            <div
              class="group relative overflow-hidden p-7 rounded-2xl bg-white/90 backdrop-blur shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <i
                class="bi bi-speedometer2 absolute -top-6 -right-6 text-[120px] text-rose-200/30 pointer-events-none"
              ></i>
              <div
                class="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-4 group-hover:scale-110 transition"
              >
                <i class="bi bi-speedometer2 text-2xl"></i>
              </div>
              <h4 class="relative z-10 text-lg font-semibold text-gray-900">
                Velocidad Mejorada
              </h4>
              <p class="relative z-10 mt-2 text-gray-600">
                Vue.js optimizado para una experiencia fluida e inmediata.
              </p>
            </div>

            <!-- Card 3: Buzón Público -->
            <div
              class="group relative overflow-hidden p-7 rounded-2xl bg-white/90 backdrop-blur shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <i
                class="bi bi-mailbox-flag absolute -top-6 -right-6 text-[120px] text-rose-200/30 pointer-events-none"
              ></i>
              <div
                class="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-4 group-hover:scale-110 transition"
              >
                <i class="bi bi-mailbox-flag text-2xl"></i>
              </div>
              <h4 class="relative z-10 text-lg font-semibold text-gray-900">
                Buzón Público
              </h4>
              <p class="relative z-10 mt-2 text-gray-600">
                Explora cartas y conexiones que nacen cada día.
              </p>
            </div>

            <!-- Card 4: Autenticación Segura -->
            <div
              class="group relative overflow-hidden p-7 rounded-2xl bg-white/90 backdrop-blur shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <i
                class="bi bi-person-lock absolute -top-6 -right-6 text-[120px] text-rose-200/30 pointer-events-none"
              ></i>
              <div
                class="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-4 group-hover:scale-110 transition"
              >
                <i class="bi bi-person-lock text-2xl"></i>
              </div>
              <h4 class="relative z-10 text-lg font-semibold text-gray-900">
                Autenticación Segura
              </h4>
              <p class="relative z-10 mt-2 text-gray-600">
                Control total de usuarios con módulos de seguridad robustos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cierre emocional -->
      <p class="mt-24 text-center text-gray-200 text-lg">
        Miles de historias empiezan con una carta.
        <span class="block font-semibold text-white">
          La próxima puede ser la tuya.
        </span>
      </p>
    </div>
  </section>
</template>
