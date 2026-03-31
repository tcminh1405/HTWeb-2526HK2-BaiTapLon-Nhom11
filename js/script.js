/*!
 * Custom Script for Vinpearl Luxury Nha Trang
 * Handles animations, navbar behavior and interactive elements.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect
  const navbar = document.getElementById("mainNav");
  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };
  // Initial check
  onScroll();
  window.addEventListener("scroll", onScroll);

  // 2. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    });
  });

  // 3. Scroll Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll(".fade-in-up");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Optional: animate only once
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));

  // 4. Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitButton");
  const successMsg = document.getElementById("submitSuccessMessage");

  if (contactForm) {
    contactForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (contactForm.checkValidity()) {
          // Mock API call or successful submission
          submitBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';
          submitBtn.disabled = true;

          setTimeout(() => {
            contactForm.classList.remove("was-validated");
            contactForm.reset();
            submitBtn.innerText = "Gửi Yêu Cầu";
            submitBtn.disabled = false;

            successMsg.classList.remove("d-none");
            setTimeout(() => {
              successMsg.classList.add("d-none");
            }, 5000);
          }, 1500);
        } else {
          contactForm.classList.add("was-validated");
        }
      },
      false,
    );
  }
  /* ================================================================
     5. Global Search Overlay Logic
    ================================================================ */

  const searchTriggers = document.querySelectorAll(".search-trigger-btn");
  const searchOverlay = document.getElementById("globalSearchOverlay");
  const closeSearch = document.getElementById("closeSearchOverlay");
  const searchInput = document.getElementById("globalSearchInput");
  const searchDropdown = document.getElementById("globalSearchDropdown");

  if (searchOverlay && searchInput) {
    // --- DATA SOURCE ---
    const hotels = [
      {
        name: "Vinpearl Luxury Nha Trang",
        type: "Khách sạn",
        url: "./booking.html",
      },
      {
        name: "Melia Vinpearl Empire Nha Trang",
        type: "Khách sạn",
        url: "./search-results.html",
      },
      {
        name: "Vinpearl Beachfront Nha Trang",
        type: "Khách sạn",
        url: "./search-results.html",
      },
      {
        name: "Hòn Tằm Resort",
        type: "Khách sạn",
        url: "./search-results.html",
      },
      {
        name: "Vinpearl Resort Nha Trang",
        type: "Khách sạn",
        url: "./search-results.html",
      },
    ];

    const rooms = [
      {
        name: "Biệt thự hướng vườn (Garden View Villa)",
        type: "Hạng phòng",
        hotel: "Vinpearl Luxury Nha Trang",
      },
      {
        name: "Biệt thự 2 tầng lớn (Grand 2-Story Villa)",
        type: "Hạng phòng",
        hotel: "Vinpearl Luxury Nha Trang",
      },
      {
        name: "Beach Front Villa",
        type: "Hạng phòng",
        hotel: "Vinpearl Luxury Nha Trang",
      },
      {
        name: "Presidential Suite",
        type: "Hạng phòng",
        hotel: "Vinpearl Luxury Nha Trang",
      },
    ];

    const searchData = [...hotels, ...rooms];

    // --- TOGGLE OVERLAY ---
    searchTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        searchOverlay.classList.add("active");
        searchInput.focus();
        renderHistoryAndSuggestions();
      });
    });

    if (closeSearch) {
      closeSearch.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
        searchInput.value = "";
      });
    }

    // Close on backdrop click (standard modal behavior)
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
        searchInput.value = "";
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
        searchOverlay.classList.remove("active");
      }
    });

    // --- SEARCH LOGIC ---
    searchInput.addEventListener("input", () => {
      renderHistoryAndSuggestions();
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          saveHistory(query);
          performSearch(query);
        }
      }
    });

    function performSearch(query) {
      window.location.href = `./search-results.html?q=${encodeURIComponent(query)}`;
    }

    function saveHistory(query) {
      let history = JSON.parse(
        localStorage.getItem("vp_search_history") || "[]",
      );
      history = history.filter(
        (item) => item.toLowerCase() !== query.toLowerCase(),
      );
      history.unshift(query);
      history = history.slice(0, 5);
      localStorage.setItem("vp_search_history", JSON.stringify(history));
    }

    function removeHistory(e, item) {
      e.stopPropagation();
      let history = JSON.parse(
        localStorage.getItem("vp_search_history") || "[]",
      );
      history = history.filter((h) => h !== item);
      localStorage.setItem("vp_search_history", JSON.stringify(history));
      renderHistoryAndSuggestions();
    }

    function renderHistoryAndSuggestions() {
      const query = searchInput.value.trim().toLowerCase();
      searchDropdown.innerHTML = "";

      if (query === "") {
        const history = JSON.parse(
          localStorage.getItem("vp_search_history") || "[]",
        );
        if (history.length > 0) {
          const historySection = document.createElement("div");
          historySection.className = "search-section";
          historySection.innerHTML =
            '<div class="search-section-title">Lịch sử tìm kiếm</div>';

          history.forEach((item) => {
            const itemEl = document.createElement("div");
            itemEl.className = "history-item";
            itemEl.innerHTML = `
                            <div class="history-content">
                                <i class="fa-regular fa-clock"></i>
                                <span>${item}</span>
                            </div>
                            <i class="fa-solid fa-xmark remove-history"></i>
                        `;
            itemEl.querySelector(".history-content").onclick = () => {
              searchInput.value = item;
              performSearch(item);
            };
            itemEl.querySelector(".remove-history").onclick = (e) =>
              removeHistory(e, item);
            historySection.appendChild(itemEl);
          });
          searchDropdown.appendChild(historySection);
        }

        const popularSection = document.createElement("div");
        popularSection.className = "search-section";
        popularSection.innerHTML =
          '<div class="search-section-title">Gợi ý phổ biến</div>';
        const popularItems = [
          "Vinpearl Luxury Nha Trang",
          "Presidential Suite",
          "Spa",
          "Nhà hàng",
        ];
        popularItems.forEach((item) => {
          const itemEl = document.createElement("div");
          itemEl.className = "suggestion-item";
          itemEl.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i><span>${item}</span>`;
          itemEl.onclick = () => performSearch(item);
          popularSection.appendChild(itemEl);
        });
        searchDropdown.appendChild(popularSection);
      } else {
        const filtered = searchData.filter((item) =>
          item.name.toLowerCase().includes(query),
        );

        if (filtered.length > 0) {
          const suggestionSection = document.createElement("div");
          suggestionSection.className = "search-section";
          suggestionSection.innerHTML =
            '<div class="search-section-title">Kết quả gợi ý</div>';

          filtered.forEach((item) => {
            const itemEl = document.createElement("div");
            itemEl.className = "suggestion-item";
            itemEl.innerHTML = `
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <span>${item.name}</span>
                            <span class="type-badge">${item.type}</span>
                        `;
            itemEl.onclick = () => {
              saveHistory(item.name);
              performSearch(item.name);
            };
            suggestionSection.appendChild(itemEl);
          });
          suggestionSection.appendChild(document.createElement("div")); // Small spacing
          searchDropdown.appendChild(suggestionSection);
        } else {
          searchDropdown.innerHTML =
            '<div class="text-center py-4 text-muted">Không tìm thấy kết quả phù hợp</div>';
        }
      }
    }
  }
});
