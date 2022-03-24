<template>
  <v-card>

    <v-toolbar flat>

      <v-btn
        icon
        exact
        :to="{name: 'persons'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Create Person</v-toolbar-title>
    </v-toolbar>
    <v-divider/>
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
</template>

<script>
export default {
  name: 'CreatePerson',
  data(){
    return {
      new_person: {
        name: '',
        value: 0,
        time: null,
      },
      loading: false,
    }
  },
  methods: {
    create_person(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/persons`
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
