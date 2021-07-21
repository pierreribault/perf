<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">

      <Sidebar />

      <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen">

        <Navbar />

        <div class="p-6 bg-gray-100 mb-20">
          <Nuxt />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'
import Navbar from '~/components/Navbar'
export default {
  components: {
    Sidebar,
    Navbar
  }
}
</script>
