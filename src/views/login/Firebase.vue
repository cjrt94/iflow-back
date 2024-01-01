<template>
  <div>
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Email"
        v-model="email"
        class="w-full mt-8"/>
    <span class="text-danger text-sm">{{ errors.first('email') ? 'El email es requerido' : '' }}</span>

    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:30'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Contraseña"
        v-model="password"
        class="w-full mt-6"/>
    <span class="text-danger text-sm">{{ errors.first('password') ? 'El password es requerido' : '' }}</span>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Mantener sesión iniciada</vs-checkbox>
    </div>
    <vs-button class="float-right" :disabled="!validateForm" @click="login">Ingresar</vs-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      checkbox_remember_me: true
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
    login () {
      // Loading
      this.$vs.loading()

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        },
        notify: this.$vs.notify,
        closeAnimation: this.$vs.loading.close
      }
      this.$store.dispatch('auth/loginAttempt', payload)
    }
  }
}

</script>


<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1
    }

    .bg-twitter {
      background-color: #00aaff
    }

    .bg-google {
      background-color: #4285F4
    }

    .bg-github {
      background-color: #333
    }
  }
}
</style>
