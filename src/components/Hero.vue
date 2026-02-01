<template>
  <div
    class="h-screen w-screen bg-cover bg-center -mt-14 transition-all duration-700 ease-out overflow-hidden relative"
    style="background-image: url('/img/hero-bg.jpg')"
  >
    <div
      class="w-full h-full max-h-150 px-6 md:px-20 flex items-start justify-center pt-25 md:pt-20"
    >
      <div class="max-w-3xl flex h-full m-4 md:m-6">
        <div
          class="relative group sm:w-full md:w-1/2 bg-primaryGray/60 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/10 hover:bg-primaryRed border-t border-l border-b border-r md:border-r-0 bg-opacity-5 transition-all duration-300"
        >
          <h1
            class="pl-4 md:pl-8 mt-8 text-3xl md:text-4xl text-primaryRed font-serif uppercase leading-tight transition group-hover:translate-x-4 group-hover:text-[#F7E4DA]"
          >
            Dile lo que sientes 💌
          </h1>
          <h2
            class="pl-4 md:pl-8 mt-4 text-stone-700 text-lg md:text-xl font-light transition group-hover:text-[#F3D6C6]"
          >
            Una carta digital. Un momento eterno.
          </h2>
          <p
            class="absolute bottom-4 pl-4 md:pl-8 text-stone-600 text-xs max-w-xs leading-relaxed transition group-hover:text-[#EBC1B0]"
          >
            Escribe, envía y guarda mensajes que importan. Porque algunas
            palabras merecen quedarse.
          </p>
          <div
            class="absolute z-50 bottom-28 md:bottom-10 right-0 translate-x-12 group cursor-pointer select-none"
          >
            <div
              class="heart-btn flex items-center justify-center text-white text-sm font-semibold shadow-xl shadow-red-500/40 transition group-hover:scale-110"
            >
              <span class="heart-text">Escribir<br />mi carta</span>
            </div>
          </div>
        </div>
        <div
          class="md:w-auto hidden md:block bg-red-500 h-full object-cover rounded-r-xl"
        >
          <img
            src="/img/img-hero.jpg"
            alt="Hero"
            class="h-full object-cover rounded-r-xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>
