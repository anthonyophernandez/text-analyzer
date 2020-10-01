<template>
  <div class="relative w-full min-h-screen px-1 pt-4 pb-8 bg-gray-400">
    <h1 class="text-4xl text-center text-gray-700">Results</h1>
    <div class="flex justify-center w-full h-full mt-8 select-text">
      <div class="grid grid-cols-3 w-full h-auto max-w-2xl p-3 rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 border-t-2 border-l-2 border-gray-200 shadow-2xl text-gray-600 text-lg">
        <div class="w-full" v-for="(token, index) in tokens" :key="index">{{ token }}</div>
      </div>
    </div>
    <!-- Return Button-->
    <button @click="$router.push({ path: '/' })" class="absolute bottom-0 right-0 w-12 h-12 mr-4 mb-4 rounded-full  bg-gray-100 shadow-lg border-t-2 border-l-2 border-transparent text-gray-800 focus:outline-none hover:border-gray-500 hover:text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 stroke-current icon icon-tabler icon-tabler-arrow-back-up" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as sentiment from 'multilang-sentiment'

export default {
  name: 'Results',
  data () {
    return {
      tokens: []
    }
  },
  computed: {
    ...mapState({
      content: state => state.content
    })
  },
  methods: {
    analyze () {
      if (this.content) {
        const result = sentiment(this.content, 'en')
        this.tokens = result.tokens.map(t => t.value)
        console.log(result)
      }
    }
  },
  mounted () {
    this.analyze()
  }
}
</script>

<style>
  div::selection {
    background: #faf089;
  }
</style>
