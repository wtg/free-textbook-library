<template>

  <div class="row h-100 align-items-center">
    <div class="col-lg-12">

      <div class="row my-2">
        <div class="col-lg-12 text-center">
          <p class="welcome-text">Built with</p>
        </div>
      </div>

      <div class="row my-4">
        <div class="col-lg-12 text-center">
          <img src="@/assets/logo.png">
        </div>
      </div>

      <div class="row my-4">
        <div class="col-lg-12 text-center">
          <a class="btn btn-lg btn-outline-dark" href="https://codotype.github.io" target="_blank">
            <i class="fa fa-book mr-1"></i>
            Documentation
          </a>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'About',
    metaInfo: {
      title: 'About'
    }
  }
</script>
