<template>
  <v-card>

    <v-toolbar flat>
      <v-toolbar-title>Movies</v-toolbar-title>
      <v-spacer />
      <CreateMovieDialog />
    </v-toolbar>

    <v-divider/>

    <v-card-text>
      <!-- Data table not yet part of Vuetify 3 -->
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Tite</th>
            <th class="text-left">Year</th>
            <th class="text-left">Dirctor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie._id">
            <td>
              <RouterLink :to="{ name: 'movie', params: { _id: movie._id}}">
                {{ movie.title }}
              </RouterLink>
              
            </td>
            <td>{{ movie.year }}</td>
            <td v-if="movie.director">
              <RouterLink :to="{ name: 'person', params: { _id: movie.director ._id}}">
                {{ movie.director.name }}
              </RouterLink>
            </td>
            <td v-else> - </td>
          </tr>
        </tbody>
      </v-table>
      
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

  methods: {
    async get_movies(){
      this.loading = true
      const url = `/movies`
      const params = { limit: 0 }

      try {
        const { data: { total, items } } = await this.axios.get(url, { params })
        this.total = total
        this.movies = items
      } catch (error) {
        alert('Failed to get items')
        console.error(error)
      } finally {
        this.loading = false
      }

    },
    row_clicked({_id}){
      this.$router.push({name: 'movie', params: {_id}})
    },
  }
}
</script>
