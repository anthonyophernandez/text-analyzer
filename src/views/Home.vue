<template>
  <div class="relative w-full min-h-screen px-1 pt-4 pb-8" :class="(isDarkMode) ? 'bg-gray-900' : 'bg-gray-400'">
    <h1 class="text-4xl text-center" :class="(isDarkMode) ? 'text-gray-400' : 'text-gray-700'">Text Analyzer</h1>
    <div class="flex justify-center w-full h-full mt-8">
      <textarea
        class="resize-none w-full max-w-2xl p-3 rounded-lg border-t-2 border-l-2 shadow-2xl text-lg select-text"
        :class="(isDarkMode) ? 'selection-dark-mode bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800 text-gray-200' : 'selection-light-mode bg-gradient-to-br from-gray-200 to-gray-100 border-gray-200 text-gray-600'"
        cols="30"
        rows="15"
        :maxlength="maxLength"
        v-model="content">
      </textarea>
    </div>
    <div class="flex justify-center w-full h-full mt-4">
      <div class="flex justify-between w-full max-w-2xl">
        <span class="text-blue-600">{{ message }}</span>
        <span :class="(isDarkMode) ? 'selection-dark-mode text-gray-400' : 'selection-light-mode text-gray-700'">{{ content.length }} / {{ maxLength }}</span>
      </div>
    </div>
    <div class="flex justify-center w-full h-full mt-6">
      <button @click="goToAnalyze" class="w-20 py-1 px-4 rounded-lg bg-gray-100 shadow-lg border-t-2 border-l-2 border-transparent text-gray-800 focus:outline-none hover:border-gray-500 hover:text-red-600">&#9658;</button>
    </div>
    <button @click="$store.dispatch('setDarkMode', !isDarkMode)" class="fixed bottom-0 right-0 flex justify-center items-center w-12 h-12 mr-4 mb-4 rounded-full  bg-gray-100 shadow-lg border-2 text-gray-800 border-gray-800 focus:outline-none hover:border-blue-600 hover:text-blue-600">
      <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 stroke-current icon icon-tabler icon-tabler-moon" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 3c0.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 stroke-current icon icon-tabler icon-tabler-sun" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="4" />
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      content: '',
      maxLength: 2500,
      message: null
    }
  },
  computed: {
    ...mapState({
      isDarkMode: state => state.darkMode
    })
  },
  methods: {
    async goToAnalyze () {
      if (this.content.length > 0) {
        this.$store.dispatch('setContent', this.content)
        this.message = 'Analyzing...'
        this.$router.push({ path: '/results' })
      } else {
        this.message = 'There are 0 words. Write something...'
        setTimeout(() => { this.message = '' }, 2500)
      }
    }
  },
  mounted () {
    this.message = ''
  }
}
</script>
