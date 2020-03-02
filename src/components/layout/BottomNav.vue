<template>
  <transition appear appear-class="bottom-appear" appear-active-class="bottom-appear-active">
    <div class="app--bottom-nav">
      <div class="text-center">
        <strong>Copyright &copy; {{ new Date().getFullYear() }} Maths 300.</strong>
        All rights reserved.
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.app--bottom-nav {
  padding: 1rem;
  background-color: #e9ecef;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
}
.bottom-appear {
  opacity: 0;
}
.bottom-appear-active {
  transition: all 1s;
}
</style>
