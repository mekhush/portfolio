// navbar scroll effect start
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
   if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
   } else {
      navbar.classList.remove("scrolled");
      navbar.classList.add("transparent");
   }
});

window.dispatchEvent(new Event('scroll'));
// navbar scroll effect end


// Toggle mobile navigation start
window.toggleMenu = function () {
   document.body.classList.toggle('nav-open'); // <- This class controls everything
};

document.querySelectorAll('#mobile-nav a').forEach(link => {
   link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
   });
});
// Toggle mobile navigation end


//Greeting robot start
function updateSplineAnimation() {
   const heroSection = document.getElementById("home");
   if (!heroSection) return;

   // Remove any existing spline viewers
   const existingSpline = heroSection.querySelector("spline-viewer");
   if (existingSpline) {
      existingSpline.remove();
   }

   const url = window.innerWidth < 768 ?
      "https://prod.spline.design/JCoRsFfPWSmLjSal/scene.splinecode" // mobile
      :
      "https://prod.spline.design/ZBsHB6VBc2xNm4U0/scene.splinecode"; // desktop

   import('https://unpkg.com/@splinetool/viewer@1.10.37/build/spline-viewer.js')
      .then(() => {
         const splineViewer = document.createElement("spline-viewer");
         splineViewer.setAttribute("url", url);
         heroSection.appendChild(splineViewer);
      })
      .catch(err => {
         console.error("Failed to load Spline Viewer module:", err);
      });
}

document.addEventListener("DOMContentLoaded", updateSplineAnimation);
window.addEventListener("resize", () => {
   clearTimeout(window._splineResizeTimeout);
   window._splineResizeTimeout = setTimeout(updateSplineAnimation, 150);
});
// Greeting robot end


// project cards start
document.addEventListener("DOMContentLoaded", () => {
   const observer = new IntersectionObserver(
      (entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               entry.target.classList.add("in-view");
            }
         });
      }, {
         threshold: 0.2
      }
   );

   document.querySelectorAll(".project-card").forEach(card => {
      observer.observe(card);
   });
});
// project cards end


// Skills bar Start
document.addEventListener("DOMContentLoaded", function () {
   const skillsSection = document.getElementById('skills');
   let animationsPlayed = false;

   // Function to animate linear bars
   function animateLinearBars() {
      document.querySelectorAll('.progress-bar').forEach(bar => {
         const progress = bar.getAttribute('data-progress');
         bar.style.width = progress + '%';
         bar.querySelector('span').style.opacity = 1;
      });
   }

   // Intersection Observer to trigger animations when the section is visible
   const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
         if (entry.isIntersecting && !animationsPlayed) {
            animateLinearBars();
            animationsPlayed = true; // Set flag to true so animations only play once
            observer.unobserve(entry.target); // Stop observing once animations have played
         }
      });
   }, {
      threshold: 0.5
   }); // Trigger when 50% of the section is visible

   if (skillsSection) {
      observer.observe(skillsSection);
   }
});
// Skills bar end


// Contact form Start
document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById("contact-form");
   const messageBox = document.getElementById("form-message");

   form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const response = await fetch("https://api.web3forms.com/submit", {
         method: "POST",
         body: formData
      });

      if (response.ok) {
         messageBox.textContent = "✅ Message sent successfully!";
         form.reset(); // clear form fields
      } else {
         messageBox.textContent = "❌ Failed to send message. Please try again.";
      }

      // Optional: auto-hide message after 5 seconds
      setTimeout(() => {
         messageBox.textContent = "";
      }, 5000);
   });
});
// Contact form end