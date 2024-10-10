export const navbarData = {
  homeTitle: 'Switty\'s Blog',
}

export const footerData = {
  author: 'Rustam Kutaev',
  aboutAuthor: 'Привет! Я Рустам , энтузиаст технологий, инженер-программист. В настоящее время Web-Developer',
  authorInterest: 'Если у вас есть интересная идея, как с открытым исходным кодом, так и платная, давайте работать вместе.',
  aboutTheSite: 'Это персональный блог, созданный с помощью Nuxt3, TailwindCSS, NuxtContent, Nuxt Icon.',
}

export const homePage = {
  title: 'Добро пожаловать на мой сайт',
  description: 'Получите информацию по веб-разработке, Javascript, Typescript, NodeJs, Vue и Nuxt, соответствующие статьи, советы, обучающие ресурсы и многое другое.',
}

export const blogsPage = {
  title: 'Все посты',
  description: 'Здесь вы найдете все записи, которые я написал и опубликовал на этом сайте.',
}

export const categoryPage = {
  title: 'Категории',
  description: 'Эта категория создается на основе всех тегов, упомянутых в различных записях блога.',
}

export const aboutPage = {
  title: 'Rustam Kutaev',
  description: 'Инженер-программист, специалист по решению проблем, веб-энтузиаст.',
  aboutMe: 'Привет, Мир! Я разработчик программного обеспечения, который большую часть своего дня проводит за написанием кода в JetBrains в команде со своими друзьями. Когда я не занимаюсь написанием кода, вы можете увидеть, как я предлагаю решения проблем онлайн!',
}

export const seoData = {
  description: 'Switty, инженер-программист, с опытом работы в области разработки программного обеспечения более 2 лет.',
  ogTitle: 'Switty кодирует и помогает другим изучать Javascript, Typescript, Vue, Nuxt и решать проблемы.',
  twitterDescription: 'Сайт моего блога, где я играю с Nuxt, Vue и т.д., а также демонстрирую свой блог, ресурсы и т.д.',
  image: 'https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp',
  mySite: 'https://IDSwitty.ru',
  twitterHandle: '@Switty',
  mailAddress: 'IncludeSpecial@gmail.com',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:site', content: seoData.twitterHandle },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.twitterDescription,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
