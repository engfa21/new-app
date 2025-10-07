// Video player functionality

let player
let videoId
let watchStartTime
let analyticsInterval

// Declare YT variable or import it before using
const YT = window.YT

function checkAccess() {
  const urlParams = new URLSearchParams(window.location.search)
  videoId = urlParams.get("v")

  // Check for admin bypass
  const adminBypass = urlParams.get("admin")
  if (adminBypass === "true") {
    return true
  }

  const currentUser = localStorage.getItem("currentUser")
  if (!currentUser) {
    window.location.href = "index.html"
    return false
  }

  const user = JSON.parse(currentUser)

  if (!videoId || !user.purchasedVideos.includes(videoId)) {
    document.getElementById("accessDenied").classList.remove("hidden")
    return false
  }

  return true
}

function loadVideoData() {
  const videos = JSON.parse(localStorage.getItem("videos"))
  const video = videos.find((v) => v.id === videoId)

  if (!video) {
    window.location.href = "dashboard.html"
    return
  }

  document.getElementById("videoTitle").textContent = video.title
  document.getElementById("videoDuration").textContent = video.duration
  document.getElementById("videoDescription").textContent = video.description

  // Load analytics
  updateAnalytics()

  // Update analytics every 5 seconds
  analyticsInterval = setInterval(updateAnalytics, 5000)
}

function updateAnalytics() {
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")
  const videoPurchases = purchases.filter((p) => p.videoId === videoId)
  const activeViewers = videoPurchases.filter((p) => p.isWatching).length

  document.getElementById("totalPurchases").textContent = videoPurchases.length
  document.getElementById("activeViewers").textContent = activeViewers
  document.getElementById("viewerCount").textContent = activeViewers

  // Calculate watch time
  if (watchStartTime) {
    const watchTime = Math.floor((Date.now() - watchStartTime) / 60000)
    document.getElementById("watchTime").textContent = `${watchTime}m`
  }
}

function markAsWatching(isWatching) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")

  const purchaseIndex = purchases.findIndex((p) => p.userId === currentUser.id && p.videoId === videoId)

  if (purchaseIndex !== -1) {
    purchases[purchaseIndex].isWatching = isWatching
    localStorage.setItem("purchases", JSON.stringify(purchases))
  }
}

// YouTube IFrame API
function onYouTubeIframeAPIReady() {
  if (!checkAccess()) return

  document.getElementById("videoContent").classList.remove("hidden")
  loadVideoData()

  player = new YT.Player("player", {
    height: "100%",
    width: "100%",
    videoId: videoId,
    playerVars: {
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
    },
    events: {
      onStateChange: onPlayerStateChange,
    },
  })
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    if (!watchStartTime) {
      watchStartTime = Date.now()
    }
    markAsWatching(true)
  } else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
    markAsWatching(false)
  }
}

// Clean up when leaving page
window.addEventListener("beforeunload", () => {
  markAsWatching(false)
  if (analyticsInterval) {
    clearInterval(analyticsInterval)
  }
})

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  if (!window.YT) {
    // API will call onYouTubeIframeAPIReady when ready
  } else {
    onYouTubeIframeAPIReady()
  }
})
