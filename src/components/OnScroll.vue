<template>
  <div class="infinite-scroll-container" @scroll="handleScroll">
    <div v-for="item in items" :key="item.id" class="list-item">
      {{ item.fullName }}<br />
      {{ item.id }}
    </div>
    <div ref="bottomSentinel" class="bottom-sentinel"></div>
    <div v-if="loading" class="loading-indicator">Loading more...</div>
    <div v-if="noMoreContent" class="no-more-content">No more content to load.</div>
  </div>
</template>

<script>
import { supabase } from '@/supabase'
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    const items = ref([]) // Array to hold your data
    const page = ref(1)
    const loading = ref(false)
    const noMoreContent = ref(false)
    const bottomSentinel = ref(null) // Reference to the element at the bottom
    const range = 6
    let observer = null

    const fetchData = async () => {
      if (loading.value || noMoreContent.value) return

      loading.value = true
      // Simulate API call delay
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      // Replace with your actual API call
      // const newData = Array.from({ length: 10 }, (_, i) => ({
      //   id: items.value.length + i,
      //   content: `Item ${items.value.length + i + 1}`,
      // }))
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .range((page.value - 1) * range, page.value * range - 1)

      if (error) {
        console.log(error)
      }
      if (data.length === 0) {
        noMoreContent.value = true
      } else {
        items.value.push(...data)
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

    return {
      items,
      loading,
      noMoreContent,
      bottomSentinel,
    }
  },
}

// Function to fetch data (simulate an API call)
</script>

<style scoped>
.infinite-scroll-container {
  height: 200px; /* Example fixed height for scrollable area */
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
  width: 25rem;
  text-align: center;
  padding: 1rem 1.5rem;
  color: #888;
}
</style>
