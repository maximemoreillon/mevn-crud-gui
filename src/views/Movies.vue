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
        :server-items-length="total"
        :options.sync="options"
        @click:row="row_clicked($event)">
      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<script lang="js">
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
      total: 0,
      options: {},
      headers: [
        {text: 'Title', value: 'title'},
        {text: 'Director', value: 'director.name'},
      ],
    }
  },
  mounted(){
    this.get_movies()
  },
  watch: {
    options: {
        handler () {
          this.get_movies()
        },
        deep: true,
      },
  },
  methods: {
    get_movies(){
      this.loading = true
      const url = `/movies`

      const { itemsPerPage, page, sortBy, sortDesc} = this.options


      const params = {
        limit: itemsPerPage,
        skip: ( page - 1 ) * itemsPerPage,
        sort: sortBy[0],
        order: sortDesc[0] ? -1 : 1,
      }

      this.axios.get(url, { params })
      .then( ({data: {total, items}}) => {
        this.total = total
        this.movies = items
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
