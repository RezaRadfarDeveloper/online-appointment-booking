<template>
  <div class="doctorsList">
    <h2>doctors list</h2>
    <div class="infinite-scroll-container" @scroll="handleScroll">
      <doctor-item
        v-for="doctor in availableDoctors"
        :key="doctor.id"
        :doctor="doctor"
        @select-doctor="$emit('select-doctor', $event)"
        active-action="true"
      ></doctor-item>
      <div ref="bottomSentinel" class="bottom-sentinel"></div>
      <div v-if="loading" class="loading-indicator">Loading more...</div>
      <div v-if="noMoreContent" class="no-more-content">No more content to load.</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import DoctorItem from './DoctorItem.vue'
import { supabase } from '@/supabase'
import { onUnmounted } from 'vue'

export default {
  components: { DoctorItem },
  props: ['doctors'],

  setup() {
    const availableDoctors = ref([])
    const page = ref(1)
    const noMoreContent = ref(false)
    const bottomSentinel = ref(null) // Reference to the element at the bottom
    const range = 4
    let observer = null
    const loading = ref(false)
    // const isLoading = ref(false)

    // const fetchData = async () => {
    //   isLoading.value = true
    //   const { data, error } = await supabase.from('doctors').select('*')
    //   isLoading.value = false
    //   if (error) {
    //     console.error('Error fetching data:', error)
    //   } else {
    //     console.log(data)

    //     availableDoctors.value = data
    //   }
    // }

    const fetchData2 = async () => {
      if (loading.value || noMoreContent.value) return

      loading.value = true

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
        availableDoctors.value.push(...data)
        page.value++
      }
      loading.value = false
    }

    const handleIntersection = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !loading.value && !noMoreContent.value) {
        fetchData2()
      }
    }

    onMounted(() => {
      fetchData2()

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

    return { loading, availableDoctors, noMoreContent, bottomSentinel }
  },
}
</script>

<style scoped>
.doctorsList,
.noData {
  flex: 0 0 1;
  display: flex;
  padding: 0.4rem 1rem;
  align-items: center;
  flex-direction: column;
  width: 45%;
}
.doctorItems {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 5px;
  height: 80vh;
}

.bottom-sentinel {
  height: 1px; /* A tiny element at the bottom to observe */
}
.infinite-scroll-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 600px; /* Example fixed height for scrollable area */
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

h2 {
  height: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.loading-indicator,
.no-more-content {
  text-align: center;
  padding: 10px;
  color: #888;
}
</style>
