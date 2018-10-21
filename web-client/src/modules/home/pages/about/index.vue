<template>
  <div class="container-fluid">
    <div class="row h-100 align-items-center">
      <div class="col-lg-12">

        <div class="row">
          <div class="col-lg-12 text-center">
            <h1 class='display-4' style="font-family: monospace;">ftl<i style='font-size:75%;' class="fa fa-heart text-danger"></i></h1>
            <p class="welcome-text mb-0">Free Textbook Library</p>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-lg-12 text-center">
            ABOUT PAGE & MISSION STATEMENT HERE
          </div>
        </div>

        <div class="row my-4">
          <div class="col-lg-12 text-center">
            <b-button size="lg" variant="outline-dark" class="mx-2" target="_blank" href="https://github.com/wtg/free-textbook-library">
              <i class="fa fa-github"></i>
              GitHub Repository
            </b-button>

            <b-button size="lg" variant="outline-danger" class="mx-2" target="_blank" href="https://github.com/wtg">
              <i class="fa fa-github"></i>
              WTG
            </b-button>
          </div>
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
