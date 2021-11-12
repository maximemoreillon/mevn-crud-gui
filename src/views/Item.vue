<template>
  <v-card>

    <v-toolbar flat>

      <v-btn
        icon
        exact
        :to="{name: 'items'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Item</v-toolbar-title>

      <v-spacer />
      <v-btn
        icon
        @click="update_item()">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        icon
        color="#c00000"
        @click="delete_item()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider/>

    <template v-if="loading">
      <v-card-text class="text-center">
        <v-progress-circular indeterminate />
      </v-card-text>
    </template>

    <template v-if="item">
      <v-card-text>
        <v-row
          v-for="(property, index) in properties"
          :key="`property_${index}`">
          <v-col>
            <v-text-field
              :label="property.text"
              v-model="item[property.value]"/>
          </v-col>
        </v-row>
      </v-card-text>
    </template>


  </v-card>
</template>

<script>
import properties from '@/item_properties.js'

export default {
  name: 'Item',
  data(){
    return {
      item: null,
      loading: false,
      properties,
    }
  },
  mounted(){
    this.get_item()
  },
  methods: {
    get_item(){
      this.item = null
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items/${this.item_id}`
      this.axios.get(url)
      .then( ({data}) => {
        this.item = data
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    delete_item(){
      if(!confirm(`Delete item ${this.item_id}?`)) return
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items/${this.item_id}`
      this.axios.delete(url)
      .then( () => {
        this.$router.push({name: 'items'})
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    update_item(){
      const url = `${process.env.VUE_APP_API_URL}/items/${this.item_id}`
      this.axios.patch(url, this.item)
      .then( () => { this.get_item() })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
    }

  },
  computed:{
    item_id(){
      return this.$route.params._id
    }
  }
}
</script>
