<template>
  <div>

    <v-card
      v-if="item"
      class="mx-auto mt-6 pa-4"
      max-width="400px">

      <v-card-title>{{item.title}}</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="item.description"
          label="Description"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="#c00000"
          text
          @click="delete_item()">
          <span>Delete item</span>
        </v-btn>
        <v-btn
          text
          @click="update_item()">
          <span>Update item</span>
        </v-btn>

      </v-card-actions>
    </v-card>

    <v-snackbar
      :color="snackbar_color"
      v-model="snackbar" >
      {{snackbar_text}}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false" >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>

export default {
  name: 'Item',
  components: {

  },
  data: () => ({
    item: null,
    headers: [
      {text: 'Title', value: 'title'},
      {text: 'Description', value: 'description'},
    ],
    loading: false,
    snackbar: false,
    snackbar_color: '#00c000',
    snackbar_text: '',
  }),
  mounted(){
    this.get_item()
  },
  methods: {
    get_item(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items/${this.item_id}`
      this.axios.get(url)
      .then(({data}) => { this.item = data })
      .catch(error => {
        console.error(error)
        this.snackbar_text = 'Error loading user'
        this.snackbar_color = '#c00000'
        this.snackbar = true
      })
      .finally(() => {this.loading = false})
    },
    update_item(){
      const url = `${process.env.VUE_APP_API_URL}/items/${this.item_id}`
      const body = this.item
      this.axios.put(url, body)
      .then(() => {
        this.snackbar_text = 'Update successful'
        this.snackbar_color = '#00C000'
        this.snackbar = true
      })
      .catch(error => {
        console.error(error)
        this.snackbar_text = 'Error Updating user'
        this.snackbar_color = '#c00000'
        this.snackbar = true
      })
    },
    delete_item(){
      const url = `${process.env.VUE_APP_API_URL}/items/${this.item_id}`
      this.axios.delete(url)
      .then(() => { this.$router.push({name: 'items'}) })
      .catch(error => {
        console.error(error)
        this.snackbar_text = 'Error deleting user'
        this.snackbar_color = '#c00000'
        this.snackbar = true
      })
    }
  },
  computed: {
    item_id(){
      return this.$route.params.id
    }
  }
}
</script>

<style>
tr {
  cursor: pointer;
}
</style>
