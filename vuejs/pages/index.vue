<template>
  <section class="section">
    <div class="container">
      <p>Hi {{ username }}, welcome on the Dashboard!</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
    }
  },
  computed: {
    username() {
      return this.user.name.charAt(0).toUpperCase() + this.user.name.slice(1);
    }
  }
}
</script>
