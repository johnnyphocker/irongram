<template>
  <div class="container">
    <div class="row">
      <div class="col md-6">
        <div class="card">
          <div class="card-body">
            <h4 id='title' class="card-title">{{ $route.params.id }}</h4>
            <p class="card-text">
              {{nombre}}
            </p>
            <a href="#!" class="card-link">Card link</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Profile',
  data() {
    return {
      post: []
    }
  },
  methods: {
    getData(id) {
      fetch('http://localhost:8080/perfil/'+this.id)
        .then(res => res.json())
        .then(data => console.log(id))
        .catch(console.log(err))
        
    }
  },
  created() {
    getData()
  }
}
</script>
