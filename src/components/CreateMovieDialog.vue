<template>
  <v-dialog
      v-model="dialog"
      max-width="800">

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          color="primary"
          v-bind="attrs"
          v-on="on">
          <v-icon>mdi-plus</v-icon>
          <span class="ml-2">Create movie</span>
        </v-btn>
      </template>

      <v-card>

        <v-toolbar flat>

          <v-toolbar-title>Create Movie</v-toolbar-title>
          <v-spacer/>
          <v-btn
            text
            @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="create_movie()">

            <v-row align="baseline">
              <v-col>
                <v-text-field
                  label="Title"
                  v-model="new_movie.title"/>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  :loading="loading"
                  type="submit">
                  <v-icon>mdi-plus</v-icon>
                  <span class="ml-2">Create movie</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>

        </v-card-text>

      </v-card>

    </v-dialog>


</template>

<script>
export default {
  name: 'CreateMovieDialog',
  data(){
    return {
      dialog: false,
      new_movie: {
        name: '',
      },
      loading: false,
    }
  },
  methods: {
    create_movie(){
      this.loading = true
      const url = `/movies`
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
