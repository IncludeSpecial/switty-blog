<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { aboutPage, navbarData, footerData } from '~/data';
import { SkillsData } from "~/data/SkillsData";
import { getRandomQuote } from "~/data/programmingQuotes";

// Reactive references for dynamic content
const randomQuote = ref<{ quote: string; author: string }>({
  quote: '',
  author: ''
});

// Lifecycle hook for component mounting
onMounted(() => {
  randomQuote.value = getRandomQuote();

  // SEO and meta tags setup
  useHead({
    title: `Обо мне - ${aboutPage.title}`,
    meta: [
      {
        name: 'description',
        content: footerData.aboutAuthor,
      },
      {
        name: 'keywords',
        content: 'frontend developer, web development, vue, nuxt, tailwindcss, программирование',
      },
    ],
  });

  // Open Graph image component for social shares
  defineOgImageComponent('About', {
    headline: 'Приветствую 👋',
    title: navbarData.homeTitle,
    description: 'Погрузитесь в веб-разработку вместе со мной, изучите Js, Ts, Vue, Nuxt.',
    link: '/switty.jpg',
  });
});
</script>

<template>

  <div class="py-5">


    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:gap-8">
        <!-- Основной блок информации -->
        <div class="lg:w-2/3 animate-fade-in">
          <h1 class="text-4xl font-extrabold sm:text-5xl mb-4">
            {{ aboutPage.title }}
          </h1>
          <h3 class="text-2xl font-medium mb-6">
            {{ aboutPage.description }}
          </h3>
          <p class="leading-relaxed mb-8">
            {{ aboutPage.aboutMe }}
          </p>

          <!-- Социальные ссылки -->
          <div class="flex flex-wrap gap-4 mb-10">
            <NuxtLink
              v-for="(link, index) in aboutPage.socialLinks"
              :key="index"
              :to="link.url"
              target="_blank"
              class="flex items-center px-5 py-3 border border-neutral-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300 animate-bounce-slow"
              :aria-label="link.label"
            >
              <Icon :name="link.icon" class="mr-2" size="1.5em"/>
              <span class="font-medium">{{ link.label }}</span>
            </NuxtLink>
          </div>

          <!-- Проекты -->
<!--          <section class="mb-8">
            <h2 class="text-3xl font-bold mb-4">Проекты</h2>
            <ul class="grid gap-6">
              <li v-for="project in aboutPage.projects" :key="project.title" class="p-4 border border-neutral-300 rounded-lg shadow animate-fade-in-up">
                <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
                <p class="mb-2">{{ project.description }}</p>
                <NuxtLink :to="project.link" class="hover:underline">Посмотреть на GitHub</NuxtLink>
              </li>
            </ul>
          </section>-->

          <!-- Образование -->
<!--          <section class="mb-8">
            <h2 class="text-3xl font-bold mb-4">Образование</h2>
            <ul class="space-y-4 animate-fade-in-up">
              <li v-for="edu in aboutPage.education" :key="edu.institution" class="flex">
                <div class="text-xl font-medium mr-4">{{ edu.institution }}</div>
                <div>
                  {{ edu.degree }} ({{ edu.year }})
                </div>
              </li>
            </ul>
          </section>-->

          <!-- Хобби -->
<!--          <section class="mb-8">
            <h2 class="text-3xl font-bold mb-4">Хобби</h2>
            <ul class="list-disc pl-5 animate-fade-in-up">
              <li v-for="hobby in aboutPage.hobbies" :key="hobby">{{ hobby }}</li>
            </ul>
          </section>-->
        </div>

        <!-- Фото -->
        <div class=" flex justify-center items-center">
          <div class="">
            <NuxtImg
              src="/switty.jpg"
              width="300"
              height="300"
              quality="80"
              class="object-cover w-96 h-96 border-4  rounded-full mx-auto"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Секция навыков -->
    <div class="py-10">
      <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold mb-6 text-center animate-fade-in-up">Навыки</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">

          <div
            v-for="skill in SkillsData"
            :key="skill.name"
            class="p-4 border flex justify-between items-center gap-4 border-neutral-300 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
          >

            <Icon :name="skill.icon" size="2.5rem" class=""/>
            <p class="text-center text-lg">{{ skill.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Секция цитаты -->
    <div class="py-10">
      <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-semibold mb-6 text-center animate-fade-in-up">Случайная цитата о программировании</h2>
        <div class="border border-neutral-300 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 animate-fade-in-up">
          <p class="italic mb-2 text-center">"{{ randomQuote.quote }}"</p>
          <p class="font-semibold text-right">— {{ randomQuote.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
