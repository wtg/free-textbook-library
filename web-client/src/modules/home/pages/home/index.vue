<template>

  <div class="row h-100 align-items-center">
    <div class="col-lg-12">

      <div class="row">
        <div class="col-lg-12 text-center">
          <p class="welcome-text mb-0">Built with</p>
        </div>
      </div>

      <div class="row my-2">
        <div class="col-lg-12 text-center">
          <!-- <img src="@/assets/logo.png"> -->
          <h1 class='display-1' style="font-family: monospace;">codotype</h1>
        </div>
      </div>

      <div class="row my-4">
        <div class="col-lg-12 text-center">
          <a class="btn btn-lg btn-outline-dark mx-2" href="https://codotype.io" target="_blank">
            <i class="fa fa-desktop"></i>
            codotype.io
          </a>

          <a class="btn btn-lg btn-outline-dark mx-2" href="https://codotype.github.io" target="_blank">
            <i class="fa fa-book"></i>
            Documentation
          </a>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'Home',
    metaInfo: {
      title: 'Home'
    }
  }
</script>

<style lang="sass">
  img.welcome-logo
    height: 4rem
    width: 4rem

  .welcome-text
    letter-spacing: .6rem
    font-weight: 300
    font-size: 2rem
</style>
