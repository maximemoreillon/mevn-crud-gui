<template>
  <v-card>

    <v-toolbar flat>
      <v-toolbar-title>Movies</v-toolbar-title>
      <v-spacer />
      <CreateMovieDialog />
    </v-toolbar>
    
    <v-divider/>

    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="movies"
        @click:row="row_clicked($event)">
      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<script>
import CreateMovieDialog from '@/components/CreateMovieDialog.vue'

export default {
  name: 'Movies',
  components: {
    CreateMovieDialog
  },
  data(){
    return {
      loading: false,
      movies: [],
      headers: [
        {text: 'Title', value: 'title'},
        {text: 'Director', value: 'director.name'},
      ],
    }
  },
  mounted(){
    this.get_movies()
  },
  methods: {
    get_movies(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/movies`
      this.axios.get(url)
      .then( ({data}) => {
        this.movies = data
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    row_clicked({_id}){
      this.$router.push({name: 'movie', params: {_id}})
    },
  }
}
</script>
