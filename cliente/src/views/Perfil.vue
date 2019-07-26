<template>
  <div class="container">

    <div class="row">
      <div class="col md-6" v-for='(post, i) of posts' :key='i'>
        <div class="card">
          <div class="card-body">
            <h4 id='title' class="card-title">{{ post.title }}</h4>
            <p class="card-text">
              {{post.content}}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12 mt-5">
        <div>
            <input v-model='title' type="text" placeholder="Título">
            <input v-model='content' type="text" placeholder="Contenido">
            <button @click="postData()">Crear post</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CreatePost from '../components/CreatePost';
export default {
  data() {
    return {
      posts: [],
      title: '',
      content: ''
    }
  },
  components: {
    CreatePost
  },
  methods: {
    postData() {
        fetch(`http://localhost:3000/perfil/${this.$route.params.id}/posts`, {
            method: 'POST',
            body: JSON.stringify({title: this.title, content: this.content}),
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
        })
        .then(res => res.json())
        .then(data => {
          this.getData();
        })
    },
    getData() {
      fetch('http://localhost:3000/perfil/'+this.$route.params.id)
        .then(res => res.json())
        .then(data => {
          this.posts = data;
          this.title = '';
          this.content = '';
        })
        .catch(err => console.log(err))
    }
  },
  created() {
    this.getData()
  }
}
</script>
