<template>
  <div class="items">

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      @click:row="$router.push({name: 'item', params: {id: $event._id}})"
      class="elevation-1" >

      <template v-slot:top>

        <v-toolbar flat >
          <v-toolbar-title>Items</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{name: 'new_item'}">
            <span>New item</span>
          </v-btn>
        </v-toolbar>
      </template>

    </v-data-table>



  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Item',
  data: () => ({
    items: [],
    headers: [
      {text: 'Title', value: 'title'},
      {text: 'Description', value: 'description'},
    ],
    loading: false,
  }),
  mounted(){
    this.get_items()
  },
  methods: {
    get_items(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items`
      this.axios.get(url)
      .then(({data}) => {
        this.items = data
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {this.loading = false})
    }
  },
  computed: {

  }
}
</script>

<style>
tr {
  cursor: pointer;
}
</style>
