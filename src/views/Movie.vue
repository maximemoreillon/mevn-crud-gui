<template>
  <v-card
    :loading="loading">

    <v-toolbar flat>

      <v-btn
        icon
        exact
        :to="{name: 'movies'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Movie</v-toolbar-title>

      <v-spacer />
      <v-btn
        icon
        :loading="updating"
        @click="update_movie()">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        icon
        :loading="deleting"
        color="#c00000"
        @click="delete_movie()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider/>

    <template v-if="movie">
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="movie.title"/>
          </v-col>
          <v-col>
            <v-select
              label="Director"
              :items="persons"
              item-text="name"
              item-value="_id"
              v-model="movie.director"/>
          </v-col>
        </v-row>
      </v-card-text>
    </template>

    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.show" >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          icon
          v-bind="attrs"
          @click="snackbar.show = false" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>


  </v-card>
</template>

<script>

export default {
  name: 'Movie',
  data(){
    return {
      movie: null,
      persons: [],
      loading: false,
      updating: false,
      deleting: false,
      snackbar: {
        show: false,
        text: null,
        color: null,
      }
    }
  },
  mounted(){
    this.get_movie()
    this.get_persons()
  },
  methods: {
    get_movie(){
      const url = `${process.env.VUE_APP_API_URL}/movies/${this.movie_id}`
      this.axios.get(url)
      .then( ({data}) => {
        this.movie = data
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    get_persons(){
      const url = `${process.env.VUE_APP_API_URL}/persons`
      this.axios.get(url)
      .then( ({data}) => {
        this.persons = data
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    delete_movie(){
      if(!confirm(`Delete movie ${this.movie_id}?`)) return
      this.deleting = true
      const url = `${process.env.VUE_APP_API_URL}/movies/${this.movie_id}`
      this.axios.delete(url)
      .then( () => {
        this.$router.push({name: 'movies'})
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.deleting = false })
    },
    update_movie(){
      this.updating = true
      const url = `${process.env.VUE_APP_API_URL}/movies/${this.movie_id}`
      this.axios.patch(url, this.movie)
      .then( () => {
        this.snackbar.show = true
        this.snackbar.text = 'Movie updated'
        this.snackbar.color = 'success'
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally(() => {
        this.updating = false
      })
    }

  },
  computed:{
    movie_id(){
      return this.$route.params._id
    }
  }
}
</script>
