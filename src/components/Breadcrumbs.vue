<template>
  <v-breadcrumbs :items="items"/>
</template>

<script>
  export default {
    name: 'Breadcrumbs',
    data: () => ({}),
    computed: {
      items(){
        let items = [
          {
            text: 'Items',
            disabled: false,
            to: {name: 'items'},
            exact: true,
          },
        ]

        if(this.$route.params.id) {
          items.push({
            text: this.$route.params.id,
            disabled: true,
          })
        }
        return items
      }
    }
  }
</script>
