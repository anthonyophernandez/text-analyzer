<template>
  <div class="relative w-full min-h-screen px-1 pt-4 pb-8 bg-gray-400">
    <h1 class="text-4xl text-center text-gray-700">Results</h1>
    <div class="flex flex-col items-center justify-center w-full h-full mt-8 select-text">
      <div class="w-full max-w-2xl h-auto p-3 rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 border-t-2 border-l-2 border-gray-200 shadow-2xl text-gray-600 text-lg">
        <div class="flex justify-between">
          <div class="flex items-center w-40">
            <span class="font-bold text-gray-700 text-xl">Score ({{ score }})</span>
            <span class="relative ml-2 cursor-pointer text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-info-circle" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" @mouseover="showTooltip('score-tooltip')" @mouseleave="hideTooltip('score-tooltip')">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
                <polyline points="11 12 12 12 12 16 13 16" />
              </svg>
              <span ref="score-tooltip" class="hidden absolute left-0 bottom-0 w-64 -mb-16 bg-indigo-200 bg-opacity-75 p-1 text-gray-700 text-xs">Overall score calculated by adding the sentiment values of recongnized words.</span>
            </span>
          </div>
          <div class="flex items-center w-64">
            <span class="font-bold text-gray-700 text-xl">Comparative ({{ comparative }})</span>
            <span class="relative ml-2 cursor-pointer text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-info-circle" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" @mouseover="showTooltip('comparative-tooltip')" @mouseleave="hideTooltip('comparative-tooltip')">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
                <polyline points="11 12 12 12 12 16 13 16" />
              </svg>
              <span ref="comparative-tooltip" class="hidden absolute right-0 bottom-0 w-64 -mb-16 bg-indigo-200 bg-opacity-75 p-1 text-gray-700 text-xs">Comparative score is the overall score divided by the number of words in the input string.</span>
            </span>
          </div>
        </div>
        <hr class="border-gray-500 border-2 my-2">
        <div class="flex justify-center w-full">
          <div v-if="score > 0" class="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 stroke-current icon icon-tabler icon-tabler-mood-happy" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
              <path d="M8 13a4 4 0 1 0 8 0m0 0h-8" />
            </svg>
          </div>
          <div v-else-if="score === 0" class="text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 stroke-current icon icon-tabler icon-tabler-mood-neutral" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="10" x2="9.01" y2="10" />
              <line x1="15" y1="10" x2="15.01" y2="10" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <div v-else class="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 stroke-current icon icon-tabler icon-tabler-mood-sad" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="10" x2="9.01" y2="10" />
              <line x1="15" y1="10" x2="15.01" y2="10" />
              <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
            </svg>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1 w-full h-auto max-w-2xl mt-4">
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
      neutralTokens: [],
      score: 0,
      comparative: 0
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
        this.score = result.score
        this.comparative = result.comparative
        this.positiveTokens = result.positive
        this.negativeTokens = result.negative
        this.neutralTokens = this.allTokens.filter(t => this.positiveTokens.indexOf(t) === -1).filter(t => this.negativeTokens.indexOf(t) === -1)
        console.log(result)
      }
    },
    showTooltip (elem) {
      this.$refs[elem].classList.remove('hidden')
      this.$refs[elem].classList.add('flex')
    },
    hideTooltip (elem) {
      this.$refs[elem].classList.remove('flex')
      this.$refs[elem].classList.add('hidden')
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
