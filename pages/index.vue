<template>
    <client-only>
     <div class="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center p-2">
      
    <video id="front-player" class="video-js vjs-fluid vjs-theme-forest" controls>
      <source src="https://adultswim-vodlive.cdn.turner.com/live/rick-and-morty/stream.m3u8" type="application/x-mpegURL" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"
          >supports HTML5 video</a>.
      </p>
    </video>
    <div class="vjs-playlist"></div>
    <div class="mt-2">
      <h2 class="text-lg font-bold">Available Streams</h2>
      <ul class="list-none p-0 m-0">
        <li v-for="(stream, index) in streams" :key="index" class="mb-2">
          <Channel :channel="stream" />
        </li>
      </ul>
    </div>
     </div>
    </client-only>
</template>
<script setup>
import videojs from 'video.js'
import 'video.js/dist/video-js.css' // Import the default Video.js CSS
// City
import '@videojs/themes/dist/city/index.css';

// Fantasy
import '@videojs/themes/dist/fantasy/index.css';

// Forest
import '@videojs/themes/dist/forest/index.css';

// Sea
import '@videojs/themes/dist/sea/index.css';
import 'videojs-playlist/dist/videojs-playlist.js'
import 'videojs-playlist-ui/dist/videojs-playlist-ui.js'
import 'videojs-playlist-ui/dist/videojs-playlist-ui.css'
import 'videojs-contrib-quality-menu'
import { onMounted } from 'vue'

const streams = () => useState('streams', () => [])

onMounted(async () => {
    // Initialize the streams state
  const res = await fetch('https://iptv-org.github.io/api/streams.json')
  streams.value = await res.json()

  
//   // Initialize video.js player
  const player = videojs('front-player', {
    controls: true,
    autoplay: false,
    preload: 'auto',
    controlBar: {
        skipButtons: {
        forward: 10,
        backward: 10
        }
  }
  })
   streams.value = streams.value.filter(stream => stream.url && stream.channel) // Filter out streams without URL or name 
  player.playlist({
    sources: [
        {
            src:'https://adultswim-vodlive.cdn.turner.com/live/rick-and-morty/stream.m3u8',
            type: 'application/x-mpegURL'
        }
    ],
    name: 'Rick and Morty', // Adding a default entry
    poster: "https://shaketv.jcompsolu.com/default.svg",
    thumbnail: "https://shaketv.jcompsolu.com/default.svg"
  })
  player.playlist.add({
    sources: [
        {
            src:'https://adultswim-vodlive.cdn.turner.com/live/rick-and-morty/stream.m3u8',
            type: 'application/x-mpegURL'
        }
    ],
    name: 'Rick and Morty', // Adding a default entry
    poster: "https://shaketv.jcompsolu.com/default.svg",
    thumbnail: "https://shaketv.jcompsolu.com/default.svg"
  },0)

//   console.log('Streams initialized:', streams.value)
  player.playlist.add(streams.value.map(stream => ({
    sources: [
      {
        src: stream.url, // Assuming each stream has a 'url' property
        type: 'application/x-mpegURL'
      }
    ],
    name: stream.channel, // Assuming each stream has a 'name' property
    poster: "https://shaketv.jcompsolu.com/default.svg",
    thumbnail: "https://shaketv.jcompsolu.com/default.svg"
  })),1)  
  player.playlist.autoadvance(0) // Disable auto-advance to the next item
  player.playlistUi();
  player.qualityMenu();
  // Dispose of the player when the component is unmounted
  onUnmounted(() => {
    if (player) {
      player.dispose()
    }
  })
})
</script>