// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const sunIcon = themeToggle.querySelector(".sun-icon");
const moonIcon = themeToggle.querySelector(".moon-icon");

// Load saved theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem("dashboard-theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
    updateThemeIcons();
  }
}

// Update theme icons
function updateThemeIcons() {
  const isLightTheme = body.classList.contains("light-theme");
  sunIcon.style.display = isLightTheme ? "none" : "block";
  moonIcon.style.display = isLightTheme ? "block" : "none";
}

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const isLightTheme = body.classList.contains("light-theme");
  localStorage.setItem("dashboard-theme", isLightTheme ? "light" : "dark");
  updateThemeIcons();
});

// Load theme on page load
loadTheme();

// Navigation Item Active State
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Remove active class from all items
    navItems.forEach(navItem => navItem.classList.remove("active"));
    
    // Add active class to clicked item
    item.classList.add("active");
    
    // Optional: You can add page switching logic here
    const label = item.querySelector(".label").textContent;
    console.log(`Navigated to: ${label}`);
  });
});

// Card Menu Interaction
const cardMenus = document.querySelectorAll(".card-menu");

cardMenus.forEach(menu => {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    // You can add a dropdown menu here
    console.log("Card menu clicked");
  });
});

// Search Box Interaction
const searchBox = document.querySelector(".search-box input");

searchBox.addEventListener("input", (e) => {
  const query = e.target.value;
  console.log("Search query:", query);
  // Implement search functionality
});

// Animate stat cards on load
function animateOnScroll() {
  const statCards = document.querySelectorAll(".stat-card");
  const cardElements = document.querySelectorAll(".card");
  const allAnimatedElements = [...statCards, ...cardElements];
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.1
  });
  
  allAnimatedElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.5s ease-out";
    observer.observe(element);
  });
}

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  console.log("Dashboard loaded successfully!");
});

// Help Button interaction
const helpBtn = document.querySelector(".help-btn");
helpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Thank you for reaching out! Our support team will contact you soon.");
});

// Add hover effects to user menu
const userMenu = document.querySelector(".user-menu");
userMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("User menu clicked");
});

// Settings checkbox interaction
const checkboxes = document.querySelectorAll(".setting-item input[type='checkbox']");

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", (e) => {
    const label = e.target.nextElementSibling?.nextElementSibling?.textContent;
    console.log(`Setting "${label}" is now ${e.target.checked ? "enabled" : "disabled"}`);
    // Save settings to localStorage
    localStorage.setItem(`setting-${label}`, e.target.checked);
  });
});

// Simulate real-time data updates
function updateStats() {
  const statValues = document.querySelectorAll(".stat-value");
  const updates = [
    { new: "24,892", change: "+3.1%" },
    { new: "$48,532", change: "+7.2%" },
    { new: "1,456", change: "+2.3%" },
    { new: "82%", change: "+4.1%" }
  ];
  
  statValues.forEach((stat, index) => {
    // Animate number change
    setTimeout(() => {
      stat.style.transition = "all 0.3s ease";
      stat.style.opacity = "0.5";
      setTimeout(() => {
        stat.textContent = updates[index].new;
        stat.style.opacity = "1";
      }, 150);
    }, index * 500);
  });
}

// Optional: Update stats every 30 seconds
setInterval(() => {
  // updateStats(); // Uncomment to enable periodic updates
}, 30000);

// Log some analytics
console.log("Dashboard Initialized");
console.log("Theme:", localStorage.getItem("dashboard-theme") || "dark");
console.log("User Agent:", navigator.userAgent);
