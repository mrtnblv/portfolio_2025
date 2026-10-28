<script setup lang="ts">
import kumbh500 from '@fontsource/kumbh-sans/files/kumbh-sans-latin-500-normal.woff2?url'
import kumbh700 from '@fontsource/kumbh-sans/files/kumbh-sans-latin-700-normal.woff2?url'

// The two weights of the first screen, fetched before the CSS asks for them.
useHead({
  link: [kumbh500, kumbh700].map(href => ({ rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: '' })),
})

// The easter egg of the Weweb version, kept as is.
onMounted(() => {
  console.log(`

      =-................-
     : -.                -
     -  -                 -
    :    -                 -
   :      =                 :.
   =      .+========+******+=#-
   ::     =@@@@@@@@@@@@@@@@@@@%
    ::   .@@@@@@@@@@@@@@@@@@@@@
     :: #@@@@@@@%@@@@@@@@% @@@-
       :+@@@@@@@# @@@@@@@@@@@@@-
       +@@@@@@@@@@@@@@@%@@@@@@@:
      .@@@@@@@@@@@@@@@-  -@@@@@
      %@@@@@@@@@@@@@@*  . -@@@*
     =@@@@@@@@@@@@@@@#....#@@@-
    :@@@@@@@@@@@@@@@@@#++%@@@@-
    *@@@@@@@@@@@@@@@@@@@@@@@@@:
   -@@@@@@@@@@@@@@@@@@@@@@@@@@.
  .@@@@@@@@@@@@@@@@@@@@@@@@@@*
 =@@@@@@@@@@@@@@@@@@@@@@@@@@%
.@@@@@@@@@@@@@@@@@@@@@@@@@@@-
 .+%@@@@@@@@@@@@@@@@@@@@@@@@:
     .:-=+=++**#%@@@@@@@#*-
                   .:--.


Hi !
contact@martinblevy.com
`)
})
</script>

<template>
  <SiteLoader />
  <NuxtPage />
</template>
