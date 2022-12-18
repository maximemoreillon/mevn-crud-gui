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
          <span class="ml-2">Create Person</span>
        </v-btn>
      </template>

      <v-card>

        <v-toolbar flat>

          <v-toolbar-title>Create Person</v-toolbar-title>
          <v-spacer/>
          <v-btn
            text
            @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="create_person()">

            <v-row align="baseline">
              <v-col>
                <v-text-field
                  label="Name"
                  v-model="new_person.name"/>
              </v-col>
              <v-col cols="auto">
                <v-btn type="submit">
                  <v-icon>mdi-plus</v-icon>
                  <span class="ml-2">Create person</span>
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
    create_person(){
      this.loading = true
      const url = `/persons`
      const body = this.new_person
      this.axios.post(url, body)
      .then( ({data}) => {
        this.$router.push({name: 'person', params: {_id: data._id}})
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
