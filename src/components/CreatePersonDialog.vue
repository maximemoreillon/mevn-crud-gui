<template>
  <v-dialog
      v-model="dialog"
      max-width="800">

      <template v-slot:activator="{ props }">
        <v-btn prepend-icon="mdi-plus" v-bind="props">
          Create person
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Create Movie
        </v-card-title>
        <v-form @submit.prevent="create_person()">
          <v-card-text>

            <v-row align="baseline">
              <v-col>
                <v-text-field
                  label="Name"
                  v-model="new_person.name"/>
              </v-col>
            </v-row>

            
          </v-card-text>
          
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="dialog=false">
              Close
            </v-btn>
            <v-btn type="submit" variant="text">
              Create movie
            </v-btn>
            
          </v-card-actions>
        </v-form>

      </v-card>

    </v-dialog>


</template>

<script>
export default {
  name: 'CreatePersonDialog',
  data(){
    return {
      dialog: false,
      new_person: {
        name: '',
      },
      loading: false,
    }
  },
  methods: {
    async create_person(){
      this.loading = true
      const url = `/persons`
      const body = this.new_person
    
      try {
        const { data: { _id } } = await this.axios.post(url, body)
        this.$router.push({ name: 'person', params: { _id } })
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
