<template>
  <v-card>

    <v-toolbar flat>
      <v-toolbar-title>Persons</v-toolbar-title>
      <v-spacer />
      <CreatePersonDialog />
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
import CreatePersonDialog from '@/components/CreatePersonDialog.vue'

export default {
  name: 'Persons',
  components: {
    CreatePersonDialog
  },
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
