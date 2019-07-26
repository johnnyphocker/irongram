<template>
  <div>
      <input v-model='title' type="text" placeholder="Título">
      <input v-model='content' type="text" placeholder="Contenido">
      <button @click="postData()">Crear post</button>
  </div>
</template>

<script>
export default {
  name: 'CreatePost',
  data() {
      return {
          title: '',
          content: ''
      }
  },
  methods: {
      postData() {
          fetch('http://localhost:3000/perfil/5d37b988907cc9070cf20038/posts', {
              method: 'POST',
              body: JSON.stringify({title: this.title, content: this.content}),
              headers: {
                  "Accept": "application/json",
                  "Content-type": "application/json",
              }
          })
          .then(res => res.json())
          .then(data => console.log(data))
      }
  }
}
</script>
