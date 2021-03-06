<template>
  <div class="relative w-full min-h-screen px-1 pt-4 pb-8" :class="(isDarkMode) ? 'bg-gray-900' : 'bg-gray-400'">
    <h1 class="text-4xl text-center" :class="(isDarkMode) ? 'text-gray-400' : 'text-gray-700'">Results</h1>
    <div class="flex flex-col items-center justify-center w-full h-full mt-8 select-text">
      <div
        class="w-full max-w-3xl h-auto p-3 rounded-lg border-t-2 border-l-2 shadow-2xl text-lg"
        :class="(isDarkMode) ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-200 text-gray-600'">
        <span class="font-bol text-xl" :class="(isDarkMode) ? 'text-gray-400' : 'text-gray-700'">Details</span>
        <hr class="border-gray-500 border-2 my-2">
        <div class="flex justify-between w-full">
          <span>Tokens: </span>
          <span>{{ numOfTokens }}</span>
        </div>
        <div class="flex justify-between w-full">
          <span>Unique Tokens: </span>
          <span>{{ numOfUniqueTokens }}</span>
        </div>
        <div class="flex justify-between w-full">
          <span>Characters: </span>
          <span>{{ numOfCharacters }}</span>
        </div>
        <div class="flex justify-between w-full">
          <span>Characters (no spaces): </span>
          <span>{{ numOfCharactersWithoutSpaces }}</span>
        </div>
      </div>
      <div
      class="w-full max-w-3xl h-auto p-3 mt-4 rounded-lg border-t-2 border-l-2 shadow-2xl text-lg"
      :class="(isDarkMode) ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-200 text-gray-600'">
        <div class="flex justify-between items-center">
          <span class="font-bold text-xl" :class="(isDarkMode) ? 'text-gray-400' : 'text-gray-700'">Token Density</span>
          <button v-if="allTokens.length > 21" class="focus:outline-none" @click="moreTokenDensity = !moreTokenDensity">
            <svg v-if="!moreTokenDensity" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-plus" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-minus" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
        <hr class="border-gray-500 border-2 my-2">
        <div class="grid grid-cols-3 gap-2 w-full overflow-hidden max-w-3xl" :class="(moreTokenDensity || allTokens.length <= 21)? 'h-auto' : 'h-64'">
          <div class="flex items-center justify-between w-full border-b-2 border-r-2 break-all" :class="(isDarkMode) ? 'border-gray-600' : 'border-gray-400'" v-for="(value, key) in dictOfTokens" :key="key">
            <span class="w-1/2">
              {{ key }}
            </span>
            <span class="w-1/2 text-gray-500 text-sm text-right">
              ({{ ((value / allTokens.length) * 100).toFixed(2)}}%)
            </span>
          </div>
        </div>
      </div>
      <div
      class="w-full max-w-3xl h-auto mt-4 p-3 rounded-lg border-t-2 border-l-2 shadow-2xl text-lg"
      :class="(isDarkMode) ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-200 text-gray-600'">
        <div class="flex justify-between">
          <div class="flex justify-start items-center w-1/2">
            <span class="font-bold text-xl" :class="(isDarkMode) ? 'text-gray-400' : 'text-gray-700'">Score ({{ score }})</span>
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
          <div class="flex justify-end items-center w-1/2">
            <span class="font-bold text-xl" :class="(isDarkMode) ? 'text-gray-400' : 'text-gray-700'">Comparative ({{ comparative }})</span>
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
          <div v-else class="text-red-700">
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
      <div class="grid grid-cols-2 gap-1 w-full h-auto max-w-3xl mt-4">
        <div
        class="w-full max-w-sm h-auto p-3 rounded-lg border-t-2 border-l-2 shadow-2xl text-lg"
        :class="(isDarkMode) ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-200 text-gray-600'">
          <span class="font-bold text-green-700 text-xl">Positive ({{ positiveTokens.length }})</span>
          <hr class="border-gray-500 border-2 my-2">
          <div class="grid grid-cols-1 gap-2">
            <div class="border-b-2 border-r-2" :class="(isDarkMode) ? 'border-gray-600' : 'border-gray-400'" v-for="(token, index) in positiveTokens" :key="index">{{ token }}</div>
          </div>
        </div>
        <div
        class="w-full max-w-sm h-auto p-3 rounded-lg border-t-2 border-l-2 shadow-2xl text-lg"
        :class="(isDarkMode) ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-200 text-gray-600'">
          <span class="font-bold text-red-700 text-xl">Negative ({{ negativeTokens.length }})</span>
          <hr class="border-gray-500 border-2 my-2">
          <div class="grid grid-cols-1 gap-2">
            <div class="border-b-2 border-r-2" :class="(isDarkMode) ? 'border-gray-600' : 'border-gray-400'" v-for="(token, index) in negativeTokens" :key="index">{{ token }}</div>
          </div>
        </div>
      </div>
      <div
      class="w-full h-auto max-w-3xl mt-4 p-3 rounded-lg border-t-2 border-l-2 shadow-2xl text-lg"
      :class="(isDarkMode) ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800 text-gray-200' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-200 text-gray-600'">
        <div class="flex justify-between items-center">
          <span class="font-bold text-blue-700 text-xl">Neutral ({{ neutralTokens.length }})</span>
          <button v-if="neutralTokens.length > 21" class="focus:outline-none" @click="moreNeutralTokens = !moreNeutralTokens">
            <svg v-if="!moreNeutralTokens" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-plus" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-minus" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
        <hr class="border-gray-500 border-2 my-2">
        <div class="grid grid-cols-3 gap-2 w-full overflow-hidden max-w-3xl" :class="(moreNeutralTokens || neutralTokens.length <= 21)? 'h-auto' : 'h-64'">
          <div class="w-full border-b-2 border-r-2" :class="(isDarkMode) ? 'border-gray-600' : 'border-gray-400'" v-for="(token, index) in neutralTokens" :key="index">{{ token }}</div>
        </div>
      </div>
    </div>
    <!-- Return Button-->
    <button @click="$router.push({ path: '/' })" class="fixed bottom-0 right-0 w-12 h-12 mr-4 mb-4 rounded-full bg-gray-100 shadow-lg border-2 text-gray-800 border-gray-800 focus:outline-none hover:border-blue-600 hover:text-blue-600">
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
      comparative: 0,
      dictOfTokens: {},
      moreTokenDensity: false,
      moreNeutralTokens: false
    }
  },
  computed: {
    ...mapState({
      content: state => state.content,
      isDarkMode: state => state.darkMode
    }),
    numOfTokens () {
      return this.allTokens.length
    },
    numOfUniqueTokens () {
      return Object.keys(this.dictOfTokens).length
    },
    numOfCharacters () {
      return this.content.length
    },
    numOfCharactersWithoutSpaces () {
      return this.content.split(' ').join('').length
    }
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
      }
    },
    loadDictOfTokens () {
      this.allTokens.forEach(t => {
        if (this.dictOfTokens[t]) {
          this.dictOfTokens[t] += 1
        } else {
          this.dictOfTokens[t] = 1
        }
      })
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
  created () {
    this.analyze()
    this.loadDictOfTokens()
  }
}
</script>
