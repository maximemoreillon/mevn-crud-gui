<template>
  <v-card>

    <v-toolbar flat>

      <v-btn
        icon
        exact
        :to="{name: 'movies'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Create Movie</v-toolbar-title>
    </v-toolbar>
    <v-divider/>
    <v-card-text>
      <v-form @submit.prevent="create_movie()">

        <v-row align="baseline">
          <v-col>
            <v-text-field
              label="Title"
              v-model="new_movie.title"/>
          </v-col>
          <v-col cols="auto">
            <v-btn type="submit">
              <v-icon>mdi-plus</v-icon>
              <span class="ml-2">Create movie</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'CreateMovie',
  data(){
    return {
      new_movie: {
        name: '',
        value: 0,
        time: null,
      },
      loading: false,
    }
  },
  methods: {
    create_movie(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/movies`
      const body = this.new_movie
      this.axios.post(url, body)
      .then( ({data}) => {
        this.$router.push({name: 'movie', params: {_id: data._id}})
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    }
  }
}
</script>
