<template>
  <div class="relative w-full min-h-screen px-1 pt-4 pb-8 bg-gray-400">
    <h1 class="text-4xl text-center text-gray-700">Results</h1>
    <div class="flex flex-col items-center justify-center w-full h-full mt-8 select-text">
      <div class="grid grid-cols-2 gap-1 w-full h-auto max-w-2xl">
        <div class="w-full max-w-sm h-auto p-3 rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 border-t-2 border-l-2 border-gray-200 shadow-2xl text-gray-600 text-lg">
          <span class="font-bold text-green-700 text-xl">Positive ({{ positiveTokens.length }})</span>
          <hr class="border-gray-500 border-2 my-2">
          <div class="grid grid-cols-1 gap-2">
            <div class="border-b-2 border-r-2" v-for="(token, index) in positiveTokens" :key="index">{{ token }}</div>
          </div>
        </div>
        <div class="w-full max-w-sm h-auto p-3 rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 border-t-2 border-l-2 border-gray-200 shadow-2xl text-gray-600 text-lg">
          <span class="font-bold text-gray-700 text-xl">Negative ({{ negativeTokens.length }})</span>
          <hr class="border-gray-500 border-2 my-2">
          <div class="grid grid-cols-1 gap-2">
            <div class="border-b-2 border-r-2" v-for="(token, index) in negativeTokens" :key="index">{{ token }}</div>
          </div>
        </div>
      </div>
      <div class="w-full h-auto max-w-2xl mt-4 p-3 rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 border-t-2 border-l-2 border-gray-200 shadow-2xl text-gray-600 text-lg">
        <span class="font-bold text-blue-700 text-xl">Neutral ({{ neutralTokens.length }})</span>
        <hr class="border-gray-500 border-2 my-2">
        <div class="grid grid-cols-3 gap-2 w-full h-auto max-w-2xl">
          <div class="w-full border-b-2 border-r-2" v-for="(token, index) in neutralTokens" :key="index">{{ token }}</div>
        </div>
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
      allTokens: [],
      positiveTokens: [],
      negativeTokens: [],
      neutralTokens: []
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
        this.allTokens = result.tokens.map(t => t.value)
        this.positiveTokens = result.positive
        this.negativeTokens = result.negative
        this.neutralTokens = this.allTokens.filter(t => this.positiveTokens.indexOf(t) === -1).filter(t => this.negativeTokens.indexOf(t) === -1)
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
