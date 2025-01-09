

<template>
  <article class="group border dark:border-neutral-800 m-2 rounded-2xl overflow-hidden shadow-lg text-neutral-700">
    <NuxtLink to="/">
      <div
        class="lg:h-48 md:h-36 w-full object-cover object-center group-hover:scale-[1.05] transition-all duration-500"
      >
        <LogoConfused />
      </div>
      <div class="p-5">
        <h2 class="text-3xl font-semibold text-black dark:text-neutral-300 pb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-400">
          Посты не обнаружены
        </h2>

        <div class="flex group-hover:underline text-neutral-700 dark:text-neutral-400 items-center pt-2">
          <p>На главную</p>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
