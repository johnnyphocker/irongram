<template>
  <div class="container">
      <div class="row">
          <div class="col-md-4" v-for='(post,i) of posts' :key='i'>
              <h2>{{post.title}}</h2>
              <p>{{post.content}}</p>
              <q>{{post.user.email}}</q>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  data() {
      return {
          posts: []
      }
  },
  methods: {
      getData() {
          fetch('http://localhost:3000/feed')
            .then(res => res.json())
            .then(data => {
                this.posts = data.post;
            })
            .catch(err => console.log(err));
      }
  },
  created() {
      this.getData()
  }
}
</script>
