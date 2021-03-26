<template>
  <div class="newitem">


    <v-text-field
      v-model="item.title"
      label="Title"/>

      <v-text-field
        v-model="item.description"
        label="Description"/>

      <v-btn
        :to="{name: 'items'}">
        <span>Return</span>
      </v-btn>

      <v-btn
        @click="create_item()">
        <span>Create item</span>
      </v-btn>







  </div>
</template>

<script>

export default {
  name: 'NewItem',
  components: {

  },
  data: () => ({
    item: {
      title: '',
      description: '',
    },

    loading: false,
  }),
  mounted(){
  },
  methods: {
    create_item(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items/`
      const body = this.item
      this.axios.post(url, body)
      .then(({data}) => {
        this.$router.push({name: 'item', params: {id: data._id}})
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {this.loading = false})
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
