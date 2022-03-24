<template>
  <v-card>

    <v-toolbar flat>
      <v-toolbar-title>Persons</v-toolbar-title>
      <v-spacer />
      <v-btn
        exact
        :to="{name: 'create_person'}">
        <v-icon>mdi-plus</v-icon>
        <span class="ml-2">Create person</span>
      </v-btn>
    </v-toolbar>

    <v-divider/>

    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="persons"
        @click:row="row_clicked($event)">
      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'Persons',
  data(){
    return {
      loading: false,
      persons: [],
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Age', value: 'age'},
      ],
    }
  },
  mounted(){
    this.get_persons()
  },
  methods: {
    get_persons(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/persons`
      this.axios.get(url)
      .then( ({data}) => {
        this.persons = data
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    row_clicked({_id}){
      this.$router.push({name: 'person', params: {_id}})
    },
  }
}
</script>
