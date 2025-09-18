<template>
  <div class="doctorsList">
    <div class="infinite-scroll-container" @scroll="handleScroll">
      <doctor-item
        v-for="doctor in localAvailableDoctors"
        :key="doctor.id"
        :doctor="doctor"
        @select-doctor="$emit('select-doctor', $event)"
        :active-action="true"
      ></doctor-item>
      <div ref="bottomSentinel" class="bottom-sentinel"></div>
      <loader-icon v-if="loading"></loader-icon>
      <!-- <div v-if="loading" class="loading-indicator">Loading more...</div> -->
      <div v-if="noMoreContent" class="no-more-content">No more content to load.</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import DoctorItem from './DoctorItem.vue'
import LoaderIcon from '@/ui/LoaderIcon.vue'
import { onUnmounted } from 'vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'

export default {
  components: { DoctorItem, LoaderIcon },

  setup() {
    const { noMoreContent, fetchDoctors, bottomSentinel, loading, localAvailableDoctors } =
      useAppointmentDetails()

    const isLoading = ref(false)
    let observer = null

    const handleIntersection = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !loading.value && !noMoreContent.value) {
        fetchDoctors()
      }
    }

    onMounted(() => {
      fetchDoctors()
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

    return { loading, localAvailableDoctors, noMoreContent, bottomSentinel, isLoading }
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
  position: relative;
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
  width: 25rem;
  height: 100%;
  padding: 10px;
  color: #888;
}
</style>
