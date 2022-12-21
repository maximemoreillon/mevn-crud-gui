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
            <!-- TODO: Adjust to Vuetify 3 -->
            <v-select
              label="Director"
              :items="persons"
              item-title="name"
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

<script lang="js">

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
    async get_movie(){
      this.movie = null
      this.loading = true
      const url = `/movies/${this.movie_id}`
      try {
        const { data } = await this.axios.get(url)
        this.movie = data
      } catch (error) {
        alert('Failed to get item')
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async get_persons(){
      const url = `/persons`
      const params = {limit: 0}
      try {
        const { data: {items} } = await this.axios.get(url, { params })
        this.persons = items
      } catch (error) {
        console.error(error)
        this.snackbar.show = true
        this.snackbar.text = 'Failed to query persons'
        this.snackbar.color = 'error'
      } 

    },
    async delete_movie(){
      if(!confirm(`Delete movie ${this.movie_id}?`)) return
      this.deleting = true
      const url = `/movies/${this.movie_id}`     
      try {
        await this.axios.delete(url)
        this.$router.push({ name: 'movies' })
      } catch (error) {
        console.error(error)
        this.snackbar.show = true
        this.snackbar.text = 'Deletion failed'
        this.snackbar.color = 'error'
      } finally {
        this.deleting = false
      }
    },
    async update_movie(){
      this.updating = true
      const url = `/movies/${this.movie_id}`

      try {
        await this.axios.patch(url, this.movie)
        this.snackbar.show = true
        this.snackbar.text = 'Update successul'
        this.snackbar.color = 'success'
      } catch (error) {
        console.error(error)
        this.snackbar.show = true
        this.snackbar.text = 'Update failed'
        this.snackbar.color = 'error'
      } finally {
        this.updating = false
      }
      
    }

  },
  computed:{
    movie_id(){
      return this.$route.params._id
    }
  }
}
</script>
