<template>
  <section class="section">
    <div class="container">
      <h1>Complexity O(n2)</h1>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in complexity" :key="item.name">
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      complexity: null,
      user: this.$auth.user
    }
  },
  mounted() {
    this.$axios.$get('/api/fake/complexity').then(res => this.complexity = res)
  }
}
</script>


<style>
td {
  @apply px-2;
  @apply py-2;
  @apply text-center;
}

th {
  @apply border-b;
  @apply border-gray-300;
}

td, th {
  @apply border-r;
  @apply border-gray-300;

&:last-child {
   @apply border-r-0;
 }
}
</style>
