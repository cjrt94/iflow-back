<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <p>
      <span>COPYRIGHT &copy;</span>
      <span>{{ new Date().getFullYear() }} </span>
      <a href="https://livesport.com.pe/" target="_blank" rel="nofollow">Livesport</a>
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
