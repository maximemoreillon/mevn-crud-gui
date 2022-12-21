<template>
  <v-dialog
      v-model="dialog"
      max-width="800">

      <template v-slot:activator="{ props }">
        <v-btn prepend-icon="mdi-plus" v-bind="props">
          Create movie
        </v-btn>
      </template>

      <v-card>

        <v-card-title>
          Create person
        </v-card-title>

        <v-form @submit.prevent="create_movie()">
          <v-card-text>

            <v-row align="baseline">
              <v-col>
                <v-text-field
                  label="Title"
                  v-model="new_movie.title"/>
              </v-col>
            </v-row>
            
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="dialog=false">
              Close
            </v-btn>
            <v-btn type="submit" variant="text">
              Create person
            </v-btn>
          
          </v-card-actions>
        </v-form>

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
    async create_movie(){
      this.loading = true
      const url = `/movies`
      const body = this.new_movie
      this.axios.post(url, body)
      try {
        const { data: { _id } } = await this.axios.post(url, body)
        this.$router.push({ name: 'movie', params: { _id } })
      } catch (error) {
        alert('Failed to create item')
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
