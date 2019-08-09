<template>
  <q-page padding>
    <p>This is an Details page</p>
  </q-page>
</template>

<script>
export default {
  name: 'DetailsPage',
  props: {
      dog: {
          type: Object,
          required: true
      }
  }
}
</script>
