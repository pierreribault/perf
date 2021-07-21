<template>
  <div>
    <form method="post" @submit.prevent="login">
      <label class="block">Email</label>
      <input type="text" class="border border-gray-900" v-model="email"/>

      <br>

      <label class="block">Password</label>
      <input type="password" class="border border-gray-900" v-model="password"/>

      <br>
      <br>

      <button type="submit" class="cursor border border-gray-900 p-2">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    async login(){
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.email,
          password: this.password,
        },
      })

      this.$router.push('/')
    }
  }
}
</script>
