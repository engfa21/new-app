// Authentication functions

function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden")
  document.getElementById("signupForm").classList.add("hidden")
  clearMessages()
}

function showSignup() {
  document.getElementById("loginForm").classList.add("hidden")
  document.getElementById("signupForm").classList.remove("hidden")
  clearMessages()
}

function clearMessages() {
  document.getElementById("loginError").classList.add("hidden")
  document.getElementById("signupError").classList.add("hidden")
  document.getElementById("signupSuccess").classList.add("hidden")
}

function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // Find user
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(user))

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  } else {
    const errorDiv = document.getElementById("loginError")
    errorDiv.textContent = "Invalid email or password"
    errorDiv.classList.remove("hidden")
  }
}

function handleSignup(event) {
  event.preventDefault()

  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value

  // Get existing users
  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    const errorDiv = document.getElementById("signupError")
    errorDiv.textContent = "An account with this email already exists"
    errorDiv.classList.remove("hidden")
    return
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    purchasedVideos: [],
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))

  // Show success message
  const successDiv = document.getElementById("signupSuccess")
  successDiv.textContent = "Account created successfully! You can now sign in."
  successDiv.classList.remove("hidden")

  // Clear form
  document.getElementById("signupName").value = ""
  document.getElementById("signupEmail").value = ""
  document.getElementById("signupPassword").value = ""

  // Switch to login after 2 seconds
  setTimeout(() => {
    showLogin()
  }, 2000)
}

// Check if user is already logged in
window.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser")
  if (currentUser && window.location.pathname.includes("index.html")) {
    window.location.href = "dashboard.html"
  }
})
