// Dashboard functionality

// Sample video data
const videos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Exclusive Concert Experience",
    description:
      "Watch the most anticipated live performance of the year. Premium quality streaming with behind-the-scenes access.",
    price: 29.99,
    duration: "Live Stream",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "jNQXAC9IVRw",
    title: "Championship Finals 2024",
    description:
      "The ultimate showdown. Experience every moment of this historic championship match in crystal clear quality.",
    price: 49.99,
    duration: "3h 45m",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
  },
  {
    id: "M7lc1UVf-VE",
    title: "Masterclass: Advanced Techniques",
    description:
      "Learn from the best in this comprehensive masterclass. Exclusive content not available anywhere else.",
    price: 39.99,
    duration: "2h 30m",
    thumbnail: "https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
  },
  {
    id: "9bZkp7q19f0",
    title: "Documentary: Behind the Scenes",
    description: "An intimate look at the making of a phenomenon. Exclusive interviews and never-before-seen footage.",
    price: 24.99,
    duration: "1h 55m",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Tech Summit Keynote 2024",
    description:
      "The most important tech announcements of the year. Get exclusive access to the full keynote presentation.",
    price: 19.99,
    duration: "1h 20m",
    thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
  },
  {
    id: "ZZ5LpwO-An4",
    title: "Comedy Special: Unfiltered",
    description: "The hottest comedy special of the season. Laugh-out-loud moments you won't want to miss.",
    price: 34.99,
    duration: "1h 45m",
    thumbnail: "https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg",
  },
]

// Initialize videos in localStorage if not exists
if (!localStorage.getItem("videos")) {
  localStorage.setItem("videos", JSON.stringify(videos))
}

function checkAuth() {
  const currentUser = localStorage.getItem("currentUser")
  if (!currentUser) {
    window.location.href = "index.html"
    return null
  }
  return JSON.parse(currentUser)
}

function handleLogout() {
  localStorage.removeItem("currentUser")
  window.location.href = "index.html"
}

function loadVideos() {
  const user = checkAuth()
  if (!user) return

  document.getElementById("userName").textContent = user.name

  const videoGrid = document.getElementById("videoGrid")
  const storedVideos = JSON.parse(localStorage.getItem("videos"))

  videoGrid.innerHTML = storedVideos
    .map((video) => {
      const isPurchased = user.purchasedVideos.includes(video.id)

      return `
            <div class="video-card" onclick="handleVideoClick('${video.id}', ${isPurchased})">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}" onerror="this.style.display='none'">
                    <div class="play-icon"></div>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                    <div class="video-meta">
                        <span class="video-price">$${video.price}</span>
                        <span class="video-duration">${video.duration}</span>
                    </div>
                    <span class="video-status ${isPurchased ? "status-purchased" : "status-locked"}">
                        ${isPurchased ? "✓ Purchased" : "🔒 Locked"}
                    </span>
                    <button class="btn-watch ${isPurchased ? "btn-watch-now" : "btn-purchase"}" onclick="event.stopPropagation(); ${isPurchased ? `watchVideo('${video.id}')` : `purchaseVideo('${video.id}')`}">
                        ${isPurchased ? "Watch Now" : "Purchase Access"}
                    </button>
                </div>
            </div>
        `
    })
    .join("")
}

function handleVideoClick(videoId, isPurchased) {
  if (isPurchased) {
    watchVideo(videoId)
  } else {
    purchaseVideo(videoId)
  }
}

function purchaseVideo(videoId) {
  const user = checkAuth()
  if (!user) return

  const videos = JSON.parse(localStorage.getItem("videos"))
  const video = videos.find((v) => v.id === videoId)

  if (!video) return

  // Simulate payment process
  const confirmed = confirm(
    `Purchase "${video.title}" for $${video.price}?\n\nNote: This is a simulated payment. No real transaction will occur.`,
  )

  if (confirmed) {
    // Add video to user's purchased videos
    user.purchasedVideos.push(videoId)

    // Update current user
    localStorage.setItem("currentUser", JSON.stringify(user))

    // Update users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userIndex = users.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = user
      localStorage.setItem("users", JSON.stringify(users))
    }

    // Record purchase
    const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")
    purchases.push({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      videoId: videoId,
      videoTitle: video.title,
      amount: video.price,
      date: new Date().toISOString(),
      isWatching: false,
    })
    localStorage.setItem("purchases", JSON.stringify(purchases))

    alert("Purchase successful! You can now watch this video.")
    loadVideos()
  }
}

function watchVideo(videoId) {
  window.location.href = `player.html?v=${videoId}`
}

// Load videos on page load
window.addEventListener("DOMContentLoaded", loadVideos)
