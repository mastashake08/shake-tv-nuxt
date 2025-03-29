<template>
    <button
        @click="playStream"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    >
        {{props.channel.name}}
    </button>
</template>
<script setup>
const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})
</script>