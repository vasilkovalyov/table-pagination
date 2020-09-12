<template>
    <fragment>
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.position}}</td>
    </fragment>
</template>
<script>
import { Fragment } from 'vue-fragment'

export default {
    props: {
        user: {
            type: Object,
            required: true,
            default: null,
        }
    },

    components: {
        Fragment
    }
}
</script>