<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <p>
      <span>COPYRIGHT &copy;</span>
      <span>{{ new Date().getFullYear() }} </span>
      <a href="https://iflowapp.com/" target="_blank" rel="nofollow">Iflow</a>
      <span class="hidden sm:inline-block">, Todos los derechos reservados</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
