// Admin panel functionality

function loadAdminData() {
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")
  const videos = JSON.parse(localStorage.getItem("videos") || "[]")

  // Calculate total revenue
  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0)
  document.getElementById("totalRevenue").textContent = `$${totalRevenue.toFixed(2)}`

  // Total users
  document.getElementById("totalUsers").textContent = users.length

  // Total purchases
  document.getElementById("totalPurchases").textContent = purchases.length

  // Active viewers
  const activeViewers = purchases.filter((p) => p.isWatching).length
  document.getElementById("activeViewers").textContent = activeViewers

  // Load videos table
  loadVideosTable(videos, purchases)

  // Load purchases table
  loadPurchasesTable(purchases)
}

function loadVideosTable(videos, purchases) {
  const tbody = document.getElementById("videosTable")

  tbody.innerHTML = videos
    .map((video) => {
      const videoPurchases = purchases.filter((p) => p.videoId === video.id)
      const activeViewers = videoPurchases.filter((p) => p.isWatching).length

      return `
            <tr>
                <td class="video-title-cell">${video.title}</td>
                <td>$${video.price}</td>
                <td>${videoPurchases.length}</td>
                <td>${activeViewers}</td>
                <td><span class="status-badge status-active">Active</span></td>
                <td>
                    <a href="player.html?v=${video.id}&admin=true" class="btn-watch">
                        Watch (Bypass)
                    </a>
                </td>
            </tr>
        `
    })
    .join("")
}

function loadPurchasesTable(purchases) {
  const tbody = document.getElementById("purchasesTable")

  // Sort by date (most recent first)
  const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date) - new Date(a.date))

  tbody.innerHTML = sortedPurchases
    .slice(0, 20)
    .map((purchase) => {
      const date = new Date(purchase.date)
      const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString()

      return `
            <tr>
                <td class="video-title-cell">${purchase.userName}</td>
                <td class="user-email">${purchase.userEmail}</td>
                <td>${purchase.videoTitle}</td>
                <td>$${purchase.amount.toFixed(2)}</td>
                <td>${formattedDate}</td>
                <td>${purchase.isWatching ? "👁️ Watching" : "—"}</td>
            </tr>
        `
    })
    .join("")
}

// Refresh data every 3 seconds
setInterval(loadAdminData, 3000)

// Load data on page load
window.addEventListener("DOMContentLoaded", loadAdminData)
