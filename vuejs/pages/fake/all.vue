<template>
  <section class="section">
    <div class="container">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th v-if="isAdmin()">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fakes" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.phone }}</td>
            <td v-if="isAdmin()">
              <button v-on:click="destroy(item.id)">Delete</button>
            </td>
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
      fakes: null,
      user: this.$auth.user
    }
  },
  methods: {
    destroy: async function(id) {
      await this.$axios.$delete(`/api/fake/${id}`)

      this.$axios.$get('/api/fake').then(res => this.fakes = res)
    },
    isAdmin: function() {
      return this.user.role === "admin"
    }
  },
  mounted() {
    this.$axios.$get('/api/fake/all').then(res => this.fakes = res)
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
