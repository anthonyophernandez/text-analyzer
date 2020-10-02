<template>
  <div class="w-full min-h-screen px-1 pt-4 pb-8 bg-gray-400">
    <h1 class="text-4xl text-center text-gray-700">Text Analyzer</h1>
    <div class="flex justify-center w-full h-full mt-8">
      <textarea class="resize-none w-full max-w-2xl p-3 rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 border-t-2 border-l-2 border-gray-200 shadow-2xl text-gray-600 text-lg" cols="30" rows="15" :maxlength="maxLength" v-model="content"></textarea>
    </div>
    <div class="flex justify-center w-full h-full mt-4">
      <div class="flex justify-between w-full max-w-2xl">
        <span class="text-red-600">{{ error }}</span>
        <span class="text-gray-700">{{ content.length }} / {{ maxLength }}</span>
      </div>
    </div>
    <div class="flex justify-center w-full h-full mt-6">
      <button @click="goToAnalyze" class="w-20 py-1 px-4 rounded-lg bg-gray-100 shadow-lg border-t-2 border-l-2 border-transparent text-gray-800 focus:outline-none hover:border-gray-500 hover:text-red-600">&#9658;</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      content: '',
      maxLength: 2500,
      error: null
    }
  },
  methods: {
    goToAnalyze () {
      if (this.content.length > 0) {
        this.$store.dispatch('setContent', this.content)
        this.$router.push({ path: '/results' })
      } else {
        this.error = 'There are 0 words. Write something...'
        setTimeout(() => { this.error = '' }, 2500)
      }
    }
  }
}
</script>

<style>
  textarea::selection {
    background: #faf089;
  }
</style>
