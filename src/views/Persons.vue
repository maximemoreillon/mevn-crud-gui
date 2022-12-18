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
        :server-items-length="total"
        :options.sync="options"
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
      total: 0,
      options: {},
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Age', value: 'age'},
      ],
    }
  },
  mounted(){
    this.get_persons()
  },
  watch: {
    options: {
        handler () {
          this.get_persons()
        },
        deep: true,
      },
  },
  methods: {
    get_persons(){

      this.loading = true

      const url = `/persons`

      const { itemsPerPage, page, sortBy, sortDesc} = this.options


      const params = {
        limit: itemsPerPage,
        skip: ( page - 1 ) * itemsPerPage,
        sort: sortBy[0],
        order: sortDesc[0] ? -1 : 1,
      }

      this.axios.get(url, { params })
      .then( ({data: {total, items}}) => {
        this.total = total
        this.persons = items
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
