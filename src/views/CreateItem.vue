<template>
  <v-card>

    <v-toolbar flat>

      <v-btn
        icon
        exact
        :to="{name: 'items'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Create Item</v-toolbar-title>
    </v-toolbar>
    <v-divider/>
    <v-card-text>
      <v-form @submit.prevent="create_item()">
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="new_item.name"/>
          </v-col>
          <v-col>
            <v-text-field
              label="Value"
              v-model="new_item.value"/>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col cols="auto">
            <v-btn type="submit">
              <v-icon>mdi-plus</v-icon>
              <span class="ml-2">Create item</span>
            </v-btn>
          </v-col>
        </v-row>

      </v-form>

    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'CreateItem',
  data(){
    return {
      new_item: {
        name: '',
        value: 0,
      },
      loading: false,
    }
  },
  methods: {
    create_item(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items`
      const body = this.new_item
      this.axios.post(url, body)
      .then( ({data}) => {
        this.$router.push({name: 'item', params: {_id: data._id}})
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
