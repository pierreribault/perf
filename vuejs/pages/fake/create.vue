<template>
  <div>
    <form method="post" v-on:submit.prevent=store>
      <label class="block">Email</label>
      <input type="text" class="border border-gray-900" v-model="email"/>

      <br>

      <label class="block">Name</label>
      <input type="text" class="border border-gray-900" v-model="name"/>

      <br>

      <label class="block">Phone</label>
      <input type="text" class="border border-gray-900" v-model="phone"/>

      <br>

      <label class="block">Address</label>
      <input type="text" class="border border-gray-900" v-model="address"/>

      <br>
      <br>

      <button type="submit" class="cursor border border-gray-900 p-2">Create Fake</button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: '',
      name: '',
      phone: '',
      address: ''
    }
  },

  methods: {
    async store(){
      await this.$axios.$post('/api/fake', {
          email: this.email,
          name: this.name,
          phone: this.phone,
          address: this.address,
      })

      this.$router.push('/fake')
    }
  }
}
</script>
