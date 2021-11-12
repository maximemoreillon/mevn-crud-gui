<template>
  <v-card>

    <v-toolbar flat>
      <v-toolbar-title>Items</v-toolbar-title>
      <v-spacer />
      <v-btn
        exact
        :to="{name: 'create_item'}">
        <v-icon>mdi-plus</v-icon>
        <span class="ml-2">Create item</span>
      </v-btn>
    </v-toolbar>
    <v-divider/>
    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        @click:row="row_clicked($event)">
      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'Items',
  data(){
    return {
      loading: false,
      items: [],
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Value', value: 'value'},
        {text: 'Date', value: 'time'},
      ],
    }
  },
  mounted(){
    this.get_items()
  },
  methods: {
    get_items(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items`
      this.axios.get(url)
      .then( ({data}) => { this.items = data})
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    row_clicked({_id}){
      this.$router.push({name: 'item', params: {_id}})
    },
  }
}
</script>
