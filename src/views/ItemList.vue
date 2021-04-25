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
            @click="new_item.dialog = true">
            <v-icon>mdi-plus</v-icon>
            <span>New item</span>
          </v-btn>
        </v-toolbar>
      </template>

    </v-data-table>

    <!-- New item dialog -->
    <v-dialog
      v-model="new_item.dialog"
      max-width="600px">
      <v-card>
        <v-card-title>New item</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="create_item()"
            ref="user_create_form"
            v-model="new_item.valid"
            lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    label="Title"
                    v-model="new_item.title"
                    :rules="new_item.input_rules"
                    required />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    label="Description"
                    v-model="new_item.description"
                    :rules="new_item.input_rules"
                    required />
                </v-col>
              </v-row>
              <v-btn type="submit" style="display: none;">submit</v-btn>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions >
          <v-spacer/>
          <v-btn
            color="blue darken-1"
            text
            @click="clear_create_item()" >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="create_item()"
            :loading="new_item.processing"
            :disabled="!new_item.valid || new_item.processing">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- snackbar for error messages -->
    <v-snackbar
      color="#C00000"
      dark
      v-model="snackbar.show" >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbar.show = false" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>




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
    new_item: {
      processing: false,
      title: '',
      description: '',
      dialog: false,
      valid: false,
      input_rules: [
        v => !!v || 'This field is required',
      ],
    },
    snackbar: {
      show: false,
      text: '',
    }

  }),
  mounted(){
    this.get_items()
  },
  methods: {
    get_items(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items`
      this.axios.get(url)
      .then(({data}) => { this.items = data })
      .catch(error => {
        console.error(error)
        this.snackbar.show = true
        this.snackbar.text = error
      })
      .finally(() => {this.loading = false})
    },
    create_item(){
      this.new_item.processing = true
      const url = `${process.env.VUE_APP_API_URL}/items/`
      const {title, description} = this.new_item
      const body = {title, description}
      this.axios.post(url, body)
      .then(() => {
        this.clear_create_item()
        this.get_items()
        //this.$router.push({name: 'item', params: {id: data._id}})
      })
      .catch(error => {
        if(error.response) {
          this.snackbar.text = error.response.data
          console.error(error.response.data)
        }
        else {
          this.snackbar.text = error
          console.error(error)
        }

        this.snackbar.show = true
      })
      .then(() => { this.new_item.processing = false})
    },
    clear_create_item(){
      this.new_item.title = ''
      this.new_item.description = ''
      this.new_item.dialog = false
    },

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
