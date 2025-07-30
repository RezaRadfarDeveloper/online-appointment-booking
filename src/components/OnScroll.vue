<template>
  <div class="infinite-scroll-container" @scroll="handleScroll">
    <div v-for="item in items" :key="item.id" class="list-item">
      {{ item.content }}
    </div>
    <div ref="bottomSentinel" class="bottom-sentinel"></div>
    <div v-if="loading" class="loading-indicator">Loading more...</div>
    <div v-if="noMoreContent" class="no-more-content">No more content to load.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const items = ref([]) // Array to hold your data
const page = ref(1)
const loading = ref(false)
const noMoreContent = ref(false)
const bottomSentinel = ref(null) // Reference to the element at the bottom

let observer = null

// Function to fetch data (simulate an API call)
const fetchData = async () => {
  if (loading.value || noMoreContent.value) return

  loading.value = true
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Replace with your actual API call
  const newData = Array.from({ length: 10 }, (_, i) => ({
    id: items.value.length + i,
    content: `Item ${items.value.length + i + 1}`,
  }))

  if (newData.length === 0) {
    noMoreContent.value = true
  } else {
    items.value.push(...newData)
    page.value++
  }
  loading.value = false
}

// Intersection Observer callback
const handleIntersection = (entries) => {
  const [entry] = entries
  if (entry.isIntersecting && !loading.value && !noMoreContent.value) {
    fetchData()
  }
}

onMounted(() => {
  fetchData() // Load initial data

  // Set up Intersection Observer
  observer = new IntersectionObserver(handleIntersection, {
    root: null, // observe relative to the viewport
    rootMargin: '0px',
    threshold: 0.1, // Trigger when 10% of the sentinel is visible
  })

  if (bottomSentinel.value) {
    observer.observe(bottomSentinel.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.infinite-scroll-container {
  height: 400px; /* Example fixed height for scrollable area */
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.bottom-sentinel {
  height: 1px; /* A tiny element at the bottom to observe */
}

.loading-indicator,
.no-more-content {
  text-align: center;
  padding: 10px;
  color: #888;
}
</style>
