<script setup lang="ts">
import { onMounted } from 'vue'
import { aboutPage, footerData, navbarData } from '~/data'
import { SkillsData } from '~/data/SkillsData'

// Lifecycle hook for component mounting
onMounted(() => {
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
  })

  // Open Graph image component for social shares
  defineOgImageComponent('About', {
    headline: 'Приветствую 👋',
    title: navbarData.homeTitle,
    description: 'Погрузитесь в веб-разработку вместе со мной, изучите Js, Ts, Vue, Nuxt.',
    link: '/switty.jpg',
  })
})

// Группируем навыки по категориям для лучшей организации
const skillCategories = [
  {
    name: 'Frontend',
    icon: 'mdi:monitor-dashboard',
    skills: SkillsData.filter(skill =>
      ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Nuxt.js', 'Tailwind CSS'].includes(skill.name),
    ),
  },
  {
    name: 'Backend',
    icon: 'mdi:server',
    skills: SkillsData.filter(skill =>
      ['Node.js'].includes(skill.name),
    ),
  },
  {
    name: 'Другие языки',
    icon: 'mdi:code-braces',
    skills: SkillsData.filter(skill =>
      ['Python', 'C#'].includes(skill.name),
    ),
  },
  {
    name: 'Инструменты',
    icon: 'mdi:tools',
    skills: SkillsData.filter(skill =>
      ['MarkDown'].includes(skill.name),
    ),
  },
]

// Путь профессионального развития
const careerPath = [
  {
    year: '2021',
    title: 'Начало пути',
    description: 'Первые шаги в веб-разработке. Изучение основ HTML, CSS и JavaScript.',
  },
  {
    year: '2022',
    title: 'Освоение фреймворков',
    description: 'Погружение в экосистему Vue.js и первые проекты на Nuxt.',
  },
  {
    year: '2023',
    title: 'Профессиональный рост',
    description: 'Разработка полноценных веб-приложений и изучение современных технологий.',
  },
  {
    year: '2024',
    title: 'Настоящее время',
    description: 'Создание и поддержка сложных проектов, менторство, написание технических статей.',
  },
]

// Отзывы
const _testimonials = [
  {
    text: 'Рустам — специалист, который всегда идет на шаг впереди. Его подход к разработке сочетает в себе глубокие технические знания и понимание потребностей пользователей.',
    author: 'Алексей П.',
    position: 'Техлид, IT-компания',
  },
  {
    text: 'Сотрудничество с Рустамом было отличным опытом. Он не только выполнил все задачи вовремя, но и предложил инновационные решения, которые значительно улучшили наш проект.',
    author: 'Марина С.',
    position: 'Владелец бизнеса',
  },
  {
    text: 'Благодаря статьям и учебным материалам Рустама я смог быстро освоить Vue и Nuxt. Его способность объяснять сложные концепции простым языком делает обучение приятным процессом.',
    author: 'Дмитрий К.',
    position: 'Начинающий разработчик',
  },
]

// Проекты
const projects = [
  {
    title: 'Блог на Nuxt',
    description: 'Персональный блог, созданный с использованием Nuxt 3, TailwindCSS и контентной системы.',
    icon: 'mdi:web',
    gradient: 'from-indigo-500 to-purple-600',
    technologies: ['Nuxt', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/IncludeSpecial/switty-blog',
  },
  {
    title: 'Bingo Game',
    description: 'Игра в бинго на основе игры "Тарков".',
    icon: 'mdi:gamepad-variant',
    gradient: 'from-emerald-500 to-teal-600',
    technologies: ['NextJS', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/IncludeSpecial/dayz-helper-web',
  },
  {
    title: 'DayZ Helper',
    description: 'Приложение для помощи в игре "DayZ". В которой вы можете найти все что вам нужно.',
    icon: 'mdi:gamepad-variant',
    gradient: 'from-blue-500 to-cyan-600',
    technologies: ['NextJS', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/IncludeSpecial/dayz-helper-web',
  },
  {
    title: 'Турнирная таблица',
    description: 'Турнирная таблица для игры "Tarkov". Возможности для просмотра игроков и их результатов.',
    icon: 'mdi:tournament',
    gradient: 'from-blue-500 to-cyan-600',
    technologies: ['NextJS', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/IncludeSpecial/tournament-leaderboard',
  },
]

// Контактная информация
const contactInfo = [
  {
    icon: 'mdi:map-marker',
    title: 'Локация',
    value: 'Благовещенск, Россия',
  },
  {
    icon: 'mdi:email-outline',
    title: 'Email',
    value: 'IncludeSpecial@gmail.com',
  },
]

// Обработка скролла для анимаций
const _isInView = ref(false)

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  checkScroll()
})

function checkScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach((element) => {
    const position = element.getBoundingClientRect()
    if (position.top < window.innerHeight - 100)
      element.classList.add('in-view')
  })
}

// Функция для получения иконки хобби
function getHobbyIcon(index: number) {
  switch (index) {
    case 0: return 'mdi:code-tags'
    case 1: return 'mdi:palette-outline'
    case 2: return 'mdi:camera'
    default: return 'mdi:airplane'
  }
}

// Общие стили
const sectionClasses = 'py-16'
const containerClasses = 'container mx-auto max-w-5xl px-4 sm:px-6'
const headingClasses = 'text-3xl font-bold text-center text-slate-800 dark:text-white mb-12'
const cardClasses = 'bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll'
</script>

<template>
  <main class="bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
    <!-- Герой секция -->
    <section class="relative overflow-hidden py-20">
      <div class="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 pointer-events-none" />
      <div class="container mx-auto max-w-5xl px-4 sm:px-6">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <!-- Информация об авторе -->
          <div class="lg:w-2/3 space-y-6">
            <div class="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300 text-sm font-medium shadow-sm">
              Веб-разработчик
            </div>

            <h1 class="text-4xl font-bold text-slate-800 dark:text-white sm:text-5xl">
            {{ aboutPage.title }}
          </h1>

            <h3 class="text-xl font-medium text-slate-700 dark:text-gray-300">
            {{ aboutPage.description }}
          </h3>

            <p class="text-slate-700 dark:text-gray-400 leading-relaxed">
            {{ aboutPage.aboutMe }}
          </p>

          <!-- Социальные ссылки -->
            <div class="flex flex-wrap gap-4 pt-4">
              <a
              v-for="(link, index) in aboutPage.socialLinks"
              :key="index"
                :href="link.url"
              target="_blank"
                class="flex items-center px-5 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group relative z-10"
              :aria-label="link.label"
            >
                <Icon
                  :name="link.icon"
                  class="mr-2 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform"
                  size="1.5em"
                />
                <span class="font-medium text-slate-800 dark:text-white">{{ link.label }}</span>
              </a>
            </div>
          </div>

          <!-- Фото автора -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none" />
            <div class="relative">
            <NuxtImg
              src="/switty.jpg"
              width="300"
              height="300"
              quality="80"
                class="object-cover w-80 h-80 border-4 border-white dark:border-gray-800 rounded-full shadow-xl transition-transform hover:scale-105 duration-500"
                alt="Фото автора"
            />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Временная шкала развития -->
    <section :class="`${sectionClasses} bg-white dark:bg-gray-900 border-y border-slate-100 dark:border-gray-800 shadow-sm`">
      <div :class="containerClasses">
        <h2 :class="headingClasses">
          Мой путь
        </h2>

        <div class="relative">
          <!-- Вертикальная линия -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200 dark:bg-indigo-900/30 pointer-events-none" />

          <div class="space-y-16">
            <div
              v-for="(step, index) in careerPath"
              :key="index"
              class="flex flex-col md:flex-row items-center animate-on-scroll"
              :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
            >
              <!-- Индикатор на линии -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow pointer-events-none" />

              <!-- Контент (чередующийся) -->
              <div class="md:w-1/2 p-6 mt-6 md:mt-0" :class="{ 'md:text-right': index % 2 !== 0 }">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-gray-700">
                  <div class="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-2">
                    {{ step.year }}
                  </div>
                  <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    {{ step.title }}
                  </h3>
                  <p class="text-slate-700 dark:text-gray-400">
                    {{ step.description }}
                  </p>
      </div>
    </div>

              <!-- Пустое пространство для чередования -->
              <div class="md:w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Образование -->
    <section :class="`${sectionClasses} bg-slate-50 dark:bg-gray-800`">
      <div :class="containerClasses">
        <h2 :class="headingClasses">
          Образование
        </h2>

        <div class="grid gap-8 md:grid-cols-2">
          <div
            v-for="(edu, index) in aboutPage.education"
            :key="index"
            :class="`${cardClasses} p-6 border border-slate-100 dark:border-gray-700`"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 dark:bg-indigo-900 rounded-full shadow-sm">
                <Icon name="mdi:school-outline" size="2em" class="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white">
                  {{ edu.institution }}
                </h3>
                <p class="text-indigo-600 dark:text-indigo-400">
                  {{ edu.year }}
                </p>
              </div>
            </div>
            <p class="text-slate-700 dark:text-gray-300">
              {{ edu.degree }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Хобби -->
    <section :class="`${sectionClasses} bg-white dark:bg-gray-900 border-y border-slate-100 dark:border-gray-800 shadow-sm`">
      <div :class="containerClasses">
        <h2 :class="headingClasses">
          Интересы и хобби
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div
            v-for="(hobby, index) in aboutPage.hobbies"
            :key="index"
            :class="`${cardClasses} p-6 text-center border border-slate-100 dark:border-gray-700`"
          >
            <div class="p-4 bg-gradient-to-br from-indigo-100 to-blue-100 dark:bg-indigo-900 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
              <Icon
                :name="getHobbyIcon(index)"
                size="2em"
                class="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
              {{ hobby }}
            </h3>
          </div>
        </div>
      </div>
    </section>
    <!-- Проекты -->
    <section :class="`${sectionClasses} bg-white dark:bg-gray-900 border-y border-slate-100 dark:border-gray-800 shadow-sm`">
      <div :class="containerClasses">
        <h2 :class="headingClasses">
          Мои проекты
        </h2>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll flex flex-col border border-slate-100 dark:border-gray-700"
            :class="{ 'md:col-span-2 lg:col-span-1': index > 1 }"
          >
            <div :class="`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center`">
              <Icon :name="project.icon" size="4em" class="text-white opacity-80" />
            </div>
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {{ project.title }}
              </h3>
              <p class="text-slate-700 dark:text-gray-400 mb-4 flex-1">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
              <a :href="project.link" target="_blank" class="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center hover:underline">
                Посмотреть на GitHub
                <Icon name="mdi:arrow-right" class="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Навыки и компетенции -->
    <section :class="`${sectionClasses} bg-slate-50 dark:bg-gray-800`">
      <div :class="containerClasses">
        <h2 :class="headingClasses">
          Навыки и компетенции
        </h2>

        <div class="space-y-10">
          <div v-for="category in skillCategories" :key="category.name" class="animate-on-scroll">
            <h3 class="text-2xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
              <div class="p-2 bg-gradient-to-br from-indigo-100 to-blue-100 dark:bg-indigo-900 rounded-lg mr-3 shadow-sm">
                <Icon
                  :name="category.icon"
                  class="text-indigo-600 dark:text-indigo-400"
                  size="1.5em"
                />
              </div>
              {{ category.name }}
            </h3>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-gray-700"
              >
                <div class="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 dark:bg-indigo-900 rounded-full mb-3 shadow-sm">
                  <Icon :name="skill.icon" size="2em" class="text-indigo-600 dark:text-indigo-400" />
                </div>
                <p class="font-medium text-slate-800 dark:text-white text-center">
                  {{ skill.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Контакты -->
    <section :class="`${sectionClasses} bg-white dark:bg-gray-900`">
      <div :class="containerClasses">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-1 shadow-lg">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12">
            <div class="grid gap-8 md:grid-cols-1 items-center">
              <div class="text-left">
                <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-6">
                  Свяжитесь со мной
                </h2>
                <p class="text-lg text-slate-700 dark:text-gray-400 mb-8">
                  {{ footerData.authorInterest }}
                </p>
                <div class="flex flex-wrap gap-4">
                  <a
                    href="mailto:IncludeSpecial@gmail.com"
                    class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/50 flex items-center relative z-20"
                  >
                    <Icon name="mdi:email" class="mr-2" size="1.2em" />
                    Написать письмо
                  </a>
                  <a
                    :href="aboutPage.socialLinks.find(link => link.label === 'Telegram')?.url"
                    target="_blank"
                    class="px-6 py-3 border border-slate-300 bg-white text-slate-800 dark:border-gray-600 dark:bg-transparent dark:text-white rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 flex items-center relative z-20 shadow hover:shadow-md"
                  >
                    <Icon name="mdi:telegram" class="mr-2" size="1.2em" />
                    Telegram
                  </a>
    </div>

                <div class="mt-8 space-y-4">
                  <div
                    v-for="(info, index) in contactInfo"
                    :key="index"
                    class="flex items-start"
                  >
                    <div class="p-2 bg-gradient-to-br from-indigo-100 to-blue-100 dark:bg-indigo-900 rounded-full mr-3 shadow-sm">
                      <Icon :name="info.icon" class="text-indigo-600 dark:text-indigo-400" size="1.2em" />
                    </div>
                    <div>
                      <h4 class="font-medium text-slate-800 dark:text-white">
                        {{ info.title }}
                      </h4>
                      <p class="text-slate-700 dark:text-gray-400">
                        {{ info.value }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, #6366f1 1px, transparent 1px),
    linear-gradient(to bottom, #6366f1 1px, transparent 1px);
  background-size: 24px 24px;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
