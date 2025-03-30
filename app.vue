<template>
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
    <div class="mt-2">
        <h2 class="text-lg font-bold">Available Streams</h2>
        <!-- Search Bar -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search streams..."
          class="w-full p-3 mb-4 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          v-on:keyup="setPlaylist"
        />
    </div>
    <div class="vjs-playlist"></div>
    
     </div>
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
import '@silvermine/videojs-airplay'
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'videojs-contrib-ads/dist/videojs-contrib-ads.css'
import 'videojs-ima/dist/videojs.ima.css'
import { onMounted } from 'vue'
useHead({
  script: [
    { src: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js' }
  ]
})
const player = () => useState('player', () => null)
const streams = () => useState('streams', () => [])
const searchQuery = ref('') // Search query state

const filteredStreams = computed(() => {
  // Filter streams based on the search query
  return streams.value.filter((stream) =>
    (stream.channel || stream.url)
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
  
})
const setPlaylist = () => {
    console.log(filteredStreams.value)
    player.value.playlist.add(filteredStreams.value.map(stream => ({
    sources: [
      {
        src: stream.url, // Assuming each stream has a 'url' property
        type: 'application/x-mpegURL'
      }
    ],
    name: stream.channel  ? stream.channel : stream.url, // Assuming each stream has a 'name' property
    poster: "https://shaketv.jcompsolu.com/default.svg",
    
  })),1) 
}
const setMediaSession = (player) => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Shake TV',
      artist: 'Mastshake08',
      album: 'Live Stream',
      artwork: [
        {
          src: 'https://shaketv.jcompsolu.com/default.svg',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'https://shaketv.jcompsolu.com/default.svg',
          sizes: '128x128',
          type: 'image/png'
        }
      ]
    })
  }


  navigator.mediaSession.setActionHandler("play", () => {
    /* Code excerpted. */
    player.play() // Start playback
    
    // Update the media session state to playing
    navigator.mediaSession.playbackState = 'playing'
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    /* Code excerpted. */
    player.pause() // Pause playback
    // Update the media session state to paused
    navigator.mediaSession.playbackState = 'paused'
  });
  navigator.mediaSession.setActionHandler("stop", () => {
    /* Code excerpted. */
    player.pause() // Pause playback
    player.currentTime(0) // Reset playback to the beginning
    navigator.mediaSession.playbackState = 'paused'
  });
  navigator.mediaSession.setActionHandler("seekbackward", () => {
    /* Code excerpted. */
    const currentTime = player.currentTime() // Get the current playback time
    const newTime = Math.max(currentTime - 10, 0) // Subtract 10 seconds, ensuring it doesn't go below 0
    player.currentTime(newTime) // Set the new playback time
    // Update the media session state to reflect the new time           
  });
  navigator.mediaSession.setActionHandler("seekforward", () => {
    /* Code excerpted. */
    const currentTime = player.currentTime() // Get the current playback time
    const duration = player.duration() // Get the total duration of the media
    const newTime = Math.min(currentTime + 10, duration) // Add 10 seconds, ensuring it doesn't exceed the duration
    player.currentTime(newTime) // Set the new playback time
  });
  navigator.mediaSession.setActionHandler("seekto", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    /* Code excerpted. */
    player.playlist.previous() // Go back to the previous item in the playlist
    if (player.playlist.currentItem() === null) {
      // If there are no more items, stop playback
      player.pause()
    }
    const list = player.playlist()
    const currentItem = list[player.playlist.currentItem()]// Get the current item in the playlist

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentItem.name || 'Unknown Stream', // Use the name of the current item or a default
      artist: 'Mastshake08',
      album: 'Live Stream',
      artwork: [
        {
          src: 'https://shaketv.jcompsolu.com/default.svg',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'https://shaketv.jcompsolu.com/default.svg',
          sizes: '128x128',
          type: 'image/png'
        }
      ]
    })

  });
  navigator.mediaSession.setActionHandler("nexttrack", () => {
    /* Code excerpted. */
    player.playlist.next() // Advance to the next item in the playlist
    if (player.playlist.currentItem() === null) {
      // If there are no more items, stop playback
      player.pause()
    }
    const list = player.playlist()
    const currentItem = list[player.playlist.currentItem()]// Get the current item in the playlist

    // Get the current item in the playlist
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentItem.name || 'Unknown Stream', // Use the name of the current item or a default
      artist: 'Mastshake08',
      album: 'Live Stream',
      artwork: [
        {
          src: 'https://shaketv.jcompsolu.com/default.svg',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'https://shaketv.jcompsolu.com/default.svg',
          sizes: '128x128',
          type: 'image/png'
        }
      ]
    })
  })
}
onMounted(async () => {
    // Initialize the streams state
  const res = await fetch('https://iptv-org.github.io/api/streams.json')
  streams.value = await res.json()

  
//   // Initialize video.js player
player.value = videojs('front-player', {
    controls: true,
    autoplay: false,
    preload: 'auto',
    controlBar: {
        skipButtons: {
        forward: 10,
        backward: 10
        }
    },
    plugins: {
        // vjsdownload:{
        // beforeElement: 'playbackRateMenuButton',
        // textControl: 'Download video',
        // name: 'downloadButton',
        // //downloadURL: 'https://video_url.mp4' //optional if you need a different download url than the source
        // }
    }
  })
  player.value.playlist({
    sources: [
        {
            src:'https://adultswim-vodlive.cdn.turner.com/live/rick-and-morty/stream.m3u8',
            type: 'application/x-mpegURL'
        }
    ],
    name: 'Rick and Morty', // Adding a default entry
    poster: "https://shaketv.jcompsolu.com/default.svg",
    
  })
  player.value.playlist.add({
    sources: [
        {
            src:'https://adultswim-vodlive.cdn.turner.com/live/rick-and-morty/stream.m3u8',
            type: 'application/x-mpegURL'
        }
    ],
    name: 'Rick and Morty', // Adding a default entry
    poster: "https://shaketv.jcompsolu.com/default.svg",
    
  },0)

//   console.log('Streams initialized:', streams.value)
  streams.value = streams.value.filter(stream => stream.url.startsWith('https://')) // Filter out invalid streams
  player.value.playlist.add(streams.value.map(stream => ({
    sources: [
      {
        src: stream.url, // Assuming each stream has a 'url' property
        type: 'application/x-mpegURL'
      }
    ],
    name: stream.channel  ? stream.channel : stream.url, // Assuming each stream has a 'name' property
    poster: "https://shaketv.jcompsolu.com/default.svg",
    
  })),1)  
  player.value.playlist.autoadvance(0) // Disable auto-advance to the next item
  player.value.playlistUi();
  player.value.qualityMenu();
  setMediaSession(player.value) // Set up the media session for playback controls
  // Dispose of the player when the component is unmounted
  
})
</script>