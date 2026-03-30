/* ================================================================
   BOOKING.JS – Integrated Image Carousel (search-results style)
   ================================================================ */

// --- DATA ---
const roomData = [
    {
        id: "room-vg-1",
        name: "Biệt thự hướng vườn (Garden View Villa)",
        images: [
            "./assets/images/booking/room_garden_villa-1.png",
            "./assets/images/booking/room_garden_villa-2.png",
            "./assets/images/booking/room_garden_villa-3.png"
        ],
        capacity: "4 Người",
        size: "60 m²",
        view: "View vườn",
        bedType: "1 giường lớn (King)",
        remainingRooms: 2,
        description: "Với diện tích 60 m², biệt thự có thiết kế sang trọng, rộng rãi, tích hợp đầy đủ tiện nghi cho kỳ lưu trú của bạn. Tầm nhìn hướng vườn tươi xanh, Biệt thự là lựa chọn lý tưởng dành cho các cặp đôi đi du lịch nghỉ dưỡng hoặc chuyến công tác 2 người.",
        fullAmenities: [
            { icon: "fa-weight-scale", text: "Cân sức khỏe" },
            { icon: "fa-phone", text: "Điện thoại" },
            { icon: "fa-shower", text: "Vòi sen" },
            { icon: "fa-tv", text: "TV" },
            { icon: "fa-socks", text: "Dép đi trong nhà" },
            { icon: "fa-wind", text: "Máy sấy tóc" },
            { icon: "fa-signal", text: "Mạng tốc độ cao" },
            { icon: "fa-wifi", text: "Wifi" },
            { icon: "fa-briefcase", text: "Bàn làm việc" },
            { icon: "fa-vest", text: "Tủ quần áo" },
            { icon: "fa-hot-tub-person", text: "Ấm điện" },
            { icon: "fa-bath", text: "Bồn tắm" },
            { icon: "fa-wine-glass", text: "Minibar" },
            { icon: "fa-snowflake", text: "Điều hoà" },
            { icon: "fa-swimming-pool", text: "Bể bơi riêng" },
            { icon: "fa-shirt", text: "Áo choàng tắm" },
            { icon: "fa-key", text: "Két sắt" },
            { icon: "fa-mug-hot", text: "Trà & Cafe" }
        ],
        packages: [
            {
                id: "pkg-std-1",
                name: "Giá công bố tốt nhất (Best Available Rate)",
                price: 5310000,
                origPrice: 5900000,
                amenities: ["Bữa sáng", "Ưu đãi 20% ẩm thực", "Sử dụng Gym & Hồ bơi"]
            },
            {
                id: "pkg-vw-1",
                name: "Gói phòng & VinWonders (Room & Theme Park)",
                price: 7250000,
                origPrice: 8100000,
                amenities: ["Bữa sáng", "Vui chơi VinWonders không giới hạn", "Đưa đón sân bay"]
            }
        ]
    },
    {
        id: "room-vv-2",
        name: "Biệt thự 2 tầng lớn (Grand 2-Story Villa)",
        images: [
            "./assets/images/booking/room_grand_duplex-1.png",
            "./assets/images/booking/room_grand_duplex-2.png",
            "./assets/images/booking/room_grand_duplex-3.png"
        ],
        capacity: "4 Người",
        size: "134 m²",
        view: "Hướng vườn & Hồ bơi",
        bedType: "2 giường đơn (Twin)",
        remainingRooms: 10,
        description: "Biệt thự 2 tầng với diện tích 134 m² rộng rãi, thiết kế tinh tế với đầy đủ tiện nghi hiện đại. Tận hưởng không gian sống sang trọng cùng hồ bơi riêng biệt lập, phòng khách lớn và phòng ngủ ấm cúng.",
        fullAmenities: [
            { icon: "fa-weight-scale", text: "Cân sức khỏe" },
            { icon: "fa-phone", text: "Điện thoại" },
            { icon: "fa-shower", text: "Vòi sen" },
            { icon: "fa-tv", text: "TV" },
            { icon: "fa-socks", text: "Dép đi trong nhà" },
            { icon: "fa-wind", text: "Máy sấy tóc" },
            { icon: "fa-signal", text: "Mạng tốc độ cao" },
            { icon: "fa-wifi", text: "Wifi" },
            { icon: "fa-briefcase", text: "Bàn làm việc" },
            { icon: "fa-vest", text: "Tủ quần áo" },
            { icon: "fa-house", text: "Phòng khách lớn" },
            { icon: "fa-bath", text: "Bồn tắm" },
            { icon: "fa-wine-glass", text: "Minibar" },
            { icon: "fa-snowflake", text: "Điều hoà" },
            { icon: "fa-swimming-pool", text: "Bể bơi riêng" },
            { icon: "fa-shirt", text: "Áo choàng tắm" },
            { icon: "fa-key", text: "Két sắt" },
            { icon: "fa-mug-hot", text: "Trà & Cafe" }
        ],
        packages: [
            {
                id: "pkg-std-2",
                name: "Giá ưu đãi thành viên",
                price: 10430000,
                origPrice: 11500000,
                amenities: ["Bữa sáng", "Ưu đãi 20% ẩm thực", "Phòng chờ VIP"]
            },
            {
                id: "pkg-all-2",
                name: "Trọn gói Ăn uống & Vui chơi",
                price: 13200000,
                origPrice: 15000000,
                amenities: ["3 Bữa ăn (Sáng, Trưa, Tối)", "Vui chơi VinWonders", "Sân Golf"]
            }
        ]
    },
];

/* --- SEARCH BAR STATE --- */
let currentRoomCount = 1;
let roomDataArray = [{ adults: 1, children: 0, infants: 0 }];
let expandedRoomId = null;

// Multi-room Selection State
let currentSelectingRoomIndex = 0; // 0-based
let selectedRoomSelections = [];   // Array of { room, package }
let currentBookingStep = 1;        // 1: Chọn phòng, 2: Dịch vụ, 3: Thanh toán

// Service Data
const serviceData = [
    {
        id: "svc-dinner",
        name: "Bữa tối lãng mạn bên bờ biển",
        price: 3500000,
        image: "./assets/images/booking/service_dinner.png",
        desc: "Thưởng thức bữa tối 5 món cao cấp dưới ánh nến và tiếng sóng vỗ rì rào."
    },
    {
        id: "svc-transfer",
        name: "Xe điện đưa đón Sân bay Xanh SM - Khứ hồi",
        price: 760000,
        image: "./assets/images/booking/service_car.png",
        desc: "Dịch vụ đưa đón tận nơi bằng xe điện VinFast sang trọng, êm ái."
    },
    {
        id: "svc-massage",
        name: "Body Massage 60 phút",
        price: 1120000,
        image: "./assets/images/booking/service_massage.png",
        desc: "Thư giãn hoàn toàn với liệu trình massage toàn thân tại Akoya Spa."
    }
];

let selectedServices = {}; // { roomIndex: [serviceId, ...] }
let searchSession = null;

/* ================================================================
   6-MINUTE BOOKING TIMER
   ================================================================ */
let bookingTimerInterval = null;
let bookingTimeRemaining = 360; // 6 minutes in seconds

function startBookingTimer() {
    if (bookingTimerInterval) return; // already started

    bookingTimeRemaining = 360;

    // We update the timer display immediately (now in sidebar)
    updateSidebarTimerDisplay();

    bookingTimerInterval = setInterval(() => {
        bookingTimeRemaining--;
        updateSidebarTimerDisplay();

        if (bookingTimeRemaining <= 0) {
            clearInterval(bookingTimerInterval);
            handleTimerExpired();
        }
    }, 1000);
}

function updateSidebarTimerDisplay() {
    const min = Math.floor(bookingTimeRemaining / 60).toString().padStart(2, '0');
    const sec = (bookingTimeRemaining % 60).toString().padStart(2, '0');

    // Update top timer
    const topTimerText = document.getElementById('booking-timer-text');
    if (topTimerText) topTimerText.innerText = `${min}:${sec}`;

    // Update sidebar timer
    const sbTimerText = document.getElementById('sidebar-timer-text');
    if (sbTimerText) sbTimerText.innerText = `${min}:${sec}`;
}

function handleTimerExpired() {
    alert("Đã hết thời gian giữ phòng. Hệ thống sẽ hủy các phòng đang giữ và tải lại trang.");
    selectedRoomSelections = [];
    selectedServices = {};
    window.location.reload();
}

// --- INITIALIZE ---
function init() {
    loadSession();
    renderRooms();
    updateSidebar();
    updateSelectionTitle();

    // Attach listener to Continue button
    const btnContinue = document.getElementById('btnContinue');
    if (btnContinue) {
        btnContinue.onclick = handleMainContinue;
    }
}

function loadSession() {
    const saved = localStorage.getItem('vp_search_data');
    if (saved) {
        searchSession = JSON.parse(saved);

        // 1. Populate search bar inputs
        if (searchSession.checkin) document.getElementById('checkinDate').value = searchSession.checkin;
        if (searchSession.checkout) document.getElementById('checkoutDate').value = searchSession.checkout;

        if (searchSession.roomData) {
            roomDataArray = searchSession.roomData;
            currentRoomCount = roomDataArray.length;
            document.getElementById('val-room').innerText = currentRoomCount;
        }

        // 2. Sidebar summary
        const cinFull = formatFullDate(searchSession.checkin);
        const coutFull = formatFullDate(searchSession.checkout);
        document.getElementById('side-dates').innerText = `${cinFull} ➔ ${coutFull}`;

        const nights = calculateNights(searchSession.checkin, searchSession.checkout);
        const nightsText = nights < 10 ? `0${nights} Đêm` : `${nights} Đêm`;
        document.getElementById('side-duration').innerText = nightsText;
        searchSession.nights = nights;

        // 3. Render Search Bar Components
        renderRoomRows();
        updateGuestSummary();
        updateSelectionTitle();
    } else {
        renderRoomRows();
        updateGuestSummary();
        updateSelectionTitle();
    }
}

function updateSelectionTitle() {
    const titleEl = document.getElementById('room-selection-title');
    if (titleEl) {
        titleEl.innerText = `Chọn phòng ${currentSelectingRoomIndex + 1}/${currentRoomCount}`;
    }
}

/* ================================================================
   STEP NAVIGATION LOGIC
   ================================================================ */

let maxReachedStep = 1;

function goToStep(step) {
    // Only allow going forward if it has been reached via 'Continue'
    if (step > maxReachedStep) return;

    currentBookingStep = step;

    // Toggle Content Sections
    document.getElementById('step1-content').style.display = (step === 1) ? 'block' : 'none';
    document.getElementById('step2-content').style.display = (step === 2) ? 'block' : 'none';
    document.getElementById('step3-content').style.display = (step === 3) ? 'block' : 'none';

    // Update Nav UI
    document.querySelectorAll('.step-nav-item').forEach((item, idx) => {
        const itemStep = idx + 1;
        item.classList.remove('active', 'completed');

        if (itemStep === step) {
            item.classList.add('active');
        } else if (itemStep < step) {
            item.classList.add('completed');
        }

        // Handle pointer events based on reachability
        item.style.opacity = (itemStep <= maxReachedStep) ? '1' : '0.5';
        item.style.cursor = (itemStep <= maxReachedStep) ? 'pointer' : 'default';
    });

    if (step === 2) renderStep2Services();
    if (step === 3) renderStep3Payment();

    updateSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleMainContinue() {
    if (currentBookingStep === 1) {
        if (selectedRoomSelections[currentSelectingRoomIndex]) {
            if (currentSelectingRoomIndex < currentRoomCount - 1) {
                currentSelectingRoomIndex++;
                expandedRoomId = null;
                renderRooms();
                updateSelectionTitle();
                updateSidebar();
                const container = document.querySelector('.col-lg-8');
                if (container) container.scrollIntoView({ behavior: 'smooth' });
            } else {
                if (selectedRoomSelections.filter(Boolean).length === currentRoomCount) {
                    if (maxReachedStep < 2) maxReachedStep = 2;
                    goToStep(2);
                }
            }
        }
    } else if (currentBookingStep === 2) {
        if (maxReachedStep < 3) maxReachedStep = 3;
        goToStep(3);
    }
}

/* ================================================================
   GUEST DROPDOWN LOGIC (Sync with Search-results style)
   ================================================================ */

function updateGuestCount(type, delta) {
    if (type === 'room') {
        const newVal = currentRoomCount + delta;
        if (newVal < 1 || newVal > 9) return;

        currentRoomCount = newVal;
        document.getElementById('val-room').innerText = currentRoomCount;

        if (delta > 0) {
            while (roomDataArray.length < currentRoomCount) {
                roomDataArray.push({ adults: 1, children: 0, infants: 0 });
            }
        } else {
            roomDataArray = roomDataArray.slice(0, currentRoomCount);
        }
    }
    renderRoomRows();
    updateGuestSummary();
}

function updateRoomMember(index, type, delta) {
    const room = roomDataArray[index];
    if (type === 'adults') {
        if (room.adults + delta < 1 || room.adults + delta > 9) return;
        room.adults += delta;
    } else if (type === 'children') {
        if (room.children + delta < 0 || room.children + delta > 9) return;
        room.children += delta;
    } else if (type === 'infants') {
        if (room.infants + delta < 0 || room.infants + delta > 9) return;
        room.infants += delta;
    }

    renderRoomRows();
    updateGuestSummary();
}

function renderRoomRows() {
    const container = document.getElementById('roomRowsContainer');
    if (!container) return;

    container.innerHTML = roomDataArray.map((room, idx) => `
        <div class="mb-4">
            <div class="fw-medium text-secondary mb-3 d-flex justify-content-between" style="font-size: 0.95rem;">
                <span>Phòng ${idx + 1}</span>
            </div>
            <div class="row text-center g-2">
                <div class="col-4">
                    <div class="text-muted mb-2" style="font-size: 0.8rem;">Người lớn</div>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="button" class="guest-qty-btn" onclick="updateRoomMember(${idx}, 'adults', -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="fw-medium text-dark" style="min-width: 14px;">${room.adults}</span>
                        <button type="button" class="guest-qty-btn" onclick="updateRoomMember(${idx}, 'adults', 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-muted mb-2" style="font-size: 0.8rem;">Trẻ em</div>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="button" class="guest-qty-btn" onclick="updateRoomMember(${idx}, 'children', -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="fw-medium text-dark" style="min-width: 14px;">${room.children}</span>
                        <button type="button" class="guest-qty-btn" onclick="updateRoomMember(${idx}, 'children', 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-muted mb-2" style="font-size: 0.8rem;">Em bé</div>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="button" class="guest-qty-btn" onclick="updateRoomMember(${idx}, 'infants', -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="fw-medium text-dark" style="min-width: 14px;">${room.infants}</span>
                        <button type="button" class="guest-qty-btn" onclick="updateRoomMember(${idx}, 'infants', 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
        </div>
        ${idx < roomDataArray.length - 1 ? '<hr class="text-muted opacity-10 my-3">' : ''}
    `).join('');

    container.style.overflowY = roomDataArray.length > 2 ? 'auto' : 'hidden';
}

function updateGuestSummary() {
    const totalRooms = roomDataArray.length;
    const totalAdults = roomDataArray.reduce((sum, r) => sum + r.adults, 0);
    const totalChildren = roomDataArray.reduce((sum, r) => sum + r.children, 0);
    const totalInfants = roomDataArray.reduce((sum, r) => sum + r.infants, 0);

    let summary = totalRooms + ' Phòng - ' + totalAdults + ' Người lớn';
    if (totalChildren > 0 || totalInfants > 0) {
        summary += ' ...';
    }

    const summaryEl = document.getElementById('guestSummaryText');
    if (summaryEl) summaryEl.innerText = summary;
}

function saveAndSearch() {
    const checkin = document.getElementById('checkinDate').value;
    const checkout = document.getElementById('checkoutDate').value;
    if (!checkin || !checkout) { alert('Vui lòng chọn ngày nhận và trả phòng'); return; }

    const searchData = {
        hotel: "Vinpearl Luxury Nha Trang",
        checkin, checkout,
        roomData: roomDataArray
    };
    localStorage.setItem('vp_search_data', JSON.stringify(searchData));
    window.location.reload();
}

/* ================================================================
   ROOM & PACKAGE LISTING LOGIC (With Image Carousel)
   ================================================================ */

function getAvailableRooms(roomId) {
    const room = roomData.find(r => r.id === roomId);
    if (!room || typeof room.remainingRooms === 'undefined') return Infinity;

    let usedCount = 0;
    for (let i = 0; i < currentRoomCount; i++) {
        if (i !== currentSelectingRoomIndex && selectedRoomSelections[i] && selectedRoomSelections[i].room.id === roomId) {
            usedCount++;
        }
    }
    return room.remainingRooms - usedCount;
}

function renderRooms() {
    const container = document.getElementById('roomContainer');
    if (!container) return;

    container.innerHTML = roomData.map((room, i) => {
        const isExpanded = expandedRoomId === room.id;
        const availableCount = getAvailableRooms(room.id);
        const isSoldOut = availableCount <= 0;

        return `
            <div class="room-card-main hotel-card">
                <div class="room-top-info">
                    <!-- Carousel Section -->
                    <div class="room-img-wrapper" style="width: 320px; height: 200px; flex-shrink: 0;">
                        <div id="carouselRoom${i}" class="carousel slide h-100" data-bs-ride="false" data-bs-interval="false">
                            <div class="carousel-inner h-100" style="border-radius: 8px;">
                                ${room.images.map((img, idx) => `
                                    <div class="carousel-item ${idx === 0 ? 'active' : ''} h-100">
                                        <img src="${img}" class="d-block w-100 h-100" alt="Room Photo" style="object-fit: cover;">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselRoom${i}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselRoom${i}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>

                    <div class="room-desc-right">
                        <div class="d-flex justify-content-between align-items-start">
                            <h4 class="room-name-title font-garamond" style="font-size: 1.4rem; color: var(--color-navy); margin-bottom: 0;">${room.name}</h4>
                            ${isSoldOut
                ? `<span class="room-remaining-tag" style="background:#e0e0e0; color:#555; border-color:#ccc;">Hết phòng</span>`
                : (typeof room.remainingRooms !== 'undefined'
                    ? (availableCount <= 5
                        ? `<span class="room-remaining-tag">Chỉ còn ${availableCount} phòng!</span>`
                        : `<span class="room-count-tag">Còn ${availableCount} phòng</span>`)
                    : '')
            }
                        </div>
                        <div class="room-specs-line mt-2 mb-3">
                            <span class="small text-muted"><i class="fa-solid fa-user me-1"></i> ${room.capacity}</span>
                            <span class="small text-muted ms-3"><i class="fa-solid fa-maximize me-1"></i> ${room.size}</span>
                        </div>
                        ${isExpanded ? `
                            <div class="room-full-desc mt-1 mb-3">
                                <p class="small text-muted mb-2" style="line-height: 1.6;">${room.description || ''}</p>
                                <a href="javascript:void(0)" class="small text-primary text-decoration-none fw-bold" onclick="showRoomDetail('${room.id}')">Xem phòng <i class="fa-solid fa-chevron-right ms-1" style="font-size: 0.75rem;"></i></a>
                            </div>
                        ` : ''}
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <div>
                                <div class="small text-muted" style="font-size: 0.75rem;">Giá mỗi đêm từ</div>
                                <div class="h4 fw-bold mb-0 text-navy">${formatMoney(room.packages[0].price)} ₫</div>
                            </div>
                            ${isSoldOut
                ? `<button class="btn btn-pill-primary px-4 py-2" disabled style="background:#ccc; border:none; color:#666">Hết phòng</button>`
                : `<button class="btn btn-pill-primary px-4 py-2 ${isExpanded ? 'active' : ''}" onclick="togglePackages('${room.id}')">${isExpanded ? 'Đóng' : 'Chọn'}</button>`
            }
                        </div>
                    </div>
                </div>

                <div class="package-dropdown-area ${isExpanded ? 'active' : ''}">
                    <div class="package-group-header">
                        <div class="package-group-title">Gói tiêu chuẩn (0${room.packages.length})</div>
                    </div>
                    ${room.packages.map(pkg => {
                const currentSelection = selectedRoomSelections[currentSelectingRoomIndex];
                const isSelected = currentSelection && currentSelection.room.id === room.id && currentSelection.pkg.id === pkg.id;
                const hasVinWonders = pkg.name.includes('VinWonders');
                return `
                        <div class="package-item ${isSelected ? 'selected' : ''}" onclick="handleSelectPackage('${room.id}', '${pkg.id}', event)">
                            ${hasVinWonders ? '<div class="pkg-ribbon-vinwonders">Bao gồm VinWonders</div>' : ''}
                            <div class="pkg-select-indicator me-3">${isSelected ? '<i class="fa-solid fa-check"></i>' : ''}</div>
                            <div class="pkg-info" style="flex: 1;">
                                <div class="pkg-title fw-bold" style="color: #333; font-size: 1.1rem; margin-bottom: 12px;">${pkg.name}</div>
                                <div class="pkg-amenities-list">
                                    <div class="pkg-amenity-item"><i class="fa-solid fa-utensils"></i> Bữa sáng</div>
                                    ${pkg.amenities.filter(a => a !== 'Bữa sáng').map(a => `
                                        <div class="pkg-amenity-item">
                                            <i class="fa-solid ${a.includes('20%') ? 'fa-percentage' : a.includes('VinWonders') ? 'fa-ticket' : a.includes('sân bay') ? 'fa-plane' : 'fa-circle-check'}"></i> 
                                            ${a}
                                        </div>`).join('')}
                                    <div class="pkg-amenity-item"><i class="fa-solid fa-calendar-xmark"></i> Không hoàn/ hủy</div>
                                </div>
                            </div>
                            <div class="pkg-pricing text-end" style="min-width: 180px;">
                                <div class="pkg-price-row">
                                    <span class="pkg-price-label">Giá công bố</span>
                                    <span class="text-muted" style="text-decoration: line-through; font-size: 0.85rem;">${formatMoney(pkg.origPrice)} đ</span>
                                </div>
                                <div class="pkg-price-row">
                                    <i class="fa-solid fa-circle-info text-muted me-2" style="font-size: 0.8rem;"></i>
                                    <span class="pkg-price-label" style="font-weight: 500; color: #444;">Giá thành viên</span>
                                    <span class="pkg-price-member">${formatMoney(pkg.price)} đ</span>
                                </div>
                                <div class="small text-muted" style="font-size: 0.75rem;">/đêm</div>
                                <a href="#" class="pkg-condition-link"><i class="fa-solid fa-circle-info"></i> Điều kiện gói</a>
                            </div>
                        </div>
                        `;
            }).join('')}
                </div>
            </div>
        `;
    }).join('');

    // Explicitly initialize each carousel
    roomData.forEach((_, i) => {
        const el = document.getElementById('carouselRoom' + i);
        if (el) {
            new bootstrap.Carousel(el, {
                interval: false,
                ride: false,
                wrap: true
            });
        }
    });
}

function togglePackages(roomId) {
    if (getAvailableRooms(roomId) <= 0) return;
    if (expandedRoomId === roomId) {
        expandedRoomId = null;
    } else {
        expandedRoomId = roomId;
    }
    renderRooms();
}

function handleSelectPackage(roomId, pkgId, event) {
    if (event && event.stopPropagation) event.stopPropagation();

    const room = roomData.find(r => r.id === roomId);
    const pkg = room.packages.find(p => p.id === pkgId);

    // Save selection for current index
    selectedRoomSelections[currentSelectingRoomIndex] = { room, pkg };

    // Start timer on first selection
    startBookingTimer();

    // Do NOT auto-advance to the next room anymore.
    // Re-render to show the selection, let user click 'Tiếp tục' to advance
    renderRooms();
    updateSidebar();
}

function editRoomSelection(index) {
    currentSelectingRoomIndex = index;
    expandedRoomId = null;
    selectedRoom = null;
    selectedPackage = null;

    renderRooms();
    updateSelectionTitle();
    updateSidebar();

    const container = document.querySelector('.col-lg-8');
    if (container) container.scrollIntoView({ behavior: 'smooth' });
}

function updateSidebar() {
    const sideInfo = document.getElementById('selectedPackageSection');
    const sidePkgName = document.getElementById('side-pkg-name');
    const sideTotal = document.getElementById('side-total');
    const btnContinue = document.getElementById('btnContinue');
    const sidebarBody = document.querySelector('.sidebar-body');

    if (selectedRoomSelections.length > 0) {
        if (sideInfo) sideInfo.style.display = 'block';

        const topTimer = document.getElementById('booking-timer-wrapper');
        const sidebarHeader = document.querySelector('.sidebar-header');

        // --- TIMER HEADER (Step 2 and 3) ---
        if (currentBookingStep >= 2) {
            const min = Math.floor(bookingTimeRemaining / 60).toString().padStart(2, '0');
            const sec = (bookingTimeRemaining % 60).toString().padStart(2, '0');

            // Move the timer into the sidebar header for Steps 2 & 3
            if (sidebarHeader) {
                sidebarHeader.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <h5 class="sidebar-title mb-0">Chuyến đi</h5>
                        <div id="sidebar-timer-text" class="fw-bold fs-5" style="color: #e8952f; font-family: monospace;">${min}:${sec}</div>
                    </div>
                `;
            }
            if (topTimer) topTimer.style.display = 'none';
        } else {
            // Restore "Chuyến đi" header if in Step 1
            if (sidebarHeader) {
                sidebarHeader.innerHTML = `<h5 class="sidebar-title">Chuyến đi</h5>`;
            }
            if (topTimer && bookingTimerInterval) topTimer.style.display = 'block';
        }

        // --- ROOM LISTING ---
        const roomsHtml = selectedRoomSelections.map((sel, idx) => {
            const guests = searchSession && searchSession.roomData && searchSession.roomData[idx]
                ? searchSession.roomData[idx]
                : { adults: 1, children: 0, infants: 0 };

            const guestParts = [];
            if (guests.adults > 0) guestParts.push(`${guests.adults} Người lớn`);
            if (guests.children > 0) guestParts.push(`${guests.children} Trẻ em`);
            if (guests.infants > 0) guestParts.push(`${guests.infants} Em bé`);

            const roomServices = selectedServices[idx] || [];
            let serviceHtml = '';

            if (roomServices.length > 0) {
                const itemsHtml = roomServices.map(sid => {
                    const s = serviceData.find(item => item.id === sid);
                    return `
                        <div class="d-flex justify-content-between align-items-center mt-1" style="font-size: 0.72rem; color: #b89152;">
                            <span class="text-truncate pe-2">• ${s.name} x 1</span>
                            <span class="fw-bold">${formatMoney(s.price)} đ</span>
                        </div>
                    `;
                }).join('');

                serviceHtml = `
                    <div class="sidebar-services-container mt-2">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="small fw-medium text-muted" style="font-size: 0.75rem;">Dịch vụ mua thêm:</span>
                            ${currentBookingStep < 3 ? `<span class="small text-primary cursor-pointer fw-medium" onclick="toggleSidebarServices(${idx})" id="toggle-text-${idx}" style="font-size: 0.7rem;">Thu gọn <i class="fa-solid fa-chevron-up ms-1"></i></span>` : ''}
                        </div>
                        <div id="services-toggle-${idx}" class="service-highlights-sidebar" style="display: block;">
                            ${itemsHtml}
                        </div>
                    </div>
                `;
            }

            return `
                <div class="room-selection-entry mb-3 ${currentBookingStep === 3 ? 'border-bottom pb-3' : ''}">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold text-dark" style="font-size: 0.9rem;">Phòng ${idx + 1}</span>
                        ${currentBookingStep < 3 ? `<a href="javascript:void(0)" class="small text-primary text-decoration-none" onclick="goToStep(1); editRoomSelection(${idx})" style="font-size: 0.7rem;">Chỉnh sửa</a>` : ''}
                        <span class="fw-bold text-dark" style="font-size: 0.95rem; ">${formatMoney(sel.pkg.price * (searchSession ? searchSession.nights : 1))} đ</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-start">
                        <span class="small text-muted mb-1" style="flex: 1;">x1 ${sel.room.name}</span>
                    </div>
                    <div class="small text-muted mb-1" style="font-size: 0.75rem;">
                        ${guestParts.join(', ')}
                    </div>
                    ${serviceHtml}
                </div>
            `;
        }).join(currentBookingStep === 3 ? '' : '<hr class="my-3 opacity-5">');

        if (sidePkgName) {
            sidePkgName.innerHTML = roomsHtml;
        }

        // Calculate Grand Total
        const nights = searchSession ? searchSession.nights : 1;
        let total = selectedRoomSelections.reduce((acc, curr) => acc + (curr.pkg.price * nights), 0);

        // Add Service Prices
        Object.values(selectedServices).forEach(sids => {
            sids.forEach(sid => {
                const s = serviceData.find(item => item.id === sid);
                total += s.price;
            });
        });

        if (sideTotal) sideTotal.innerText = `${formatMoney(total)} đ`;

        if (btnContinue) {
            btnContinue.style.display = currentBookingStep === 3 ? 'none' : 'block';

            // "Tiếp tục" logic
            if (currentBookingStep === 1) {
                const currentRoomSelected = !!selectedRoomSelections[currentSelectingRoomIndex];
                btnContinue.disabled = !currentRoomSelected;
                btnContinue.style.background = currentRoomSelected ? '#e8952f' : '#ccc';
                btnContinue.innerText = 'Tiếp tục';
            } else if (currentBookingStep === 2) {
                btnContinue.disabled = false;
                btnContinue.style.background = '#e8952f';
                btnContinue.innerText = 'Tiếp tục';
            } else {
                btnContinue.innerText = 'Thanh toán';
            }
        }

        // Add Promo Banners if not present
        if (sidebarBody && !document.querySelector('.sidebar-promo-banner')) {
            const promoHtml = `
                <div class="sidebar-promo-banner">
                    <span class="close-btn">&times;</span>
                    Click “Tiếp tục” <i class="fa-solid fa-hand-pointer"></i> để khám phá ưu đãi đến <br>
                    <strong style="font-size: 1.1rem;">30%</strong> các dịch vụ trải nghiệm
                </div>
                <div class="sidebar-vinclub-box">
                    <ul class="list-unstyled mb-0">
                        <li><i class="fa-solid fa-minus me-2"></i> Tích điểm VinClub lên đến 2% giá trị đơn hàng</li>
                        <li><i class="fa-solid fa-minus me-2"></i> Tiêu điểm và tận hưởng đặc quyền ưu đãi trên hệ sinh thái Vingroup</li>
                    </ul>
                </div>
            `;
            sidebarBody.insertAdjacentHTML('beforeend', promoHtml);
        }
    } else {
        if (sideInfo) sideInfo.style.display = 'none';
        if (sideTotal) sideTotal.innerText = '0 đ';
        if (btnContinue) {
            btnContinue.disabled = true;
            btnContinue.style.background = '#dee2e6';
        }
        // Remove banners if unselected
        const promo = document.querySelector('.sidebar-promo-banner');
        const vinclub = document.querySelector('.sidebar-vinclub-box');
        if (promo) promo.remove();
        if (vinclub) vinclub.remove();
    }
}

function toggleSidebarServices(idx) {
    const content = document.getElementById(`services-toggle-${idx}`);
    const toggleText = document.getElementById(`toggle-text-${idx}`);
    if (!content || !toggleText) return;

    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleText.innerHTML = 'Thu gọn <i class="fa-solid fa-chevron-up ms-1"></i>';
    } else {
        content.style.display = 'none';
        toggleText.innerHTML = 'Xem chi tiết <i class="fa-solid fa-chevron-down ms-1"></i>';
    }
}

/* ================================================================
   ROOM DETAIL MODAL LOGIC (NEW 2-COLUMN LAYOUT)
   ================================================================ */

let currentModalImgIndex = 0; // State for modal gallery navigation

function showRoomDetail(roomId) {
    const room = roomData.find(r => r.id === roomId);
    if (!room) return;

    const modal = document.getElementById('roomDetailModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    currentModalImgIndex = 0; // Reset index for new modal

    // Generate Modal HTML
    content.innerHTML = `
        <div class="modal-left-col">
            <div class="modal-main-img-container" id="modalMainImgContainer">
                <img src="${room.images[0]}" id="modalMainImg" alt="${room.name}">
                
                <!-- Gallery Navigation Buttons -->
                <button class="modal-gallery-nav prev" onclick="moveModalImg('${room.id}', -1)"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="modal-gallery-nav next" onclick="moveModalImg('${room.id}', 1)"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
            <div class="modal-thumb-row centered-thumbs">
                ${room.images.map((img, idx) => `
                    <div class="modal-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" onclick="changeModalImgByIndex('${room.id}', ${idx})">
                        <img src="${img}" alt="Thumbnail ${idx + 1}">
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="modal-right-col">
            <button class="vp-modal-close" onclick="closeRoomDetail()"><i class="fa-solid fa-xmark"></i></button>
            
            <h2 class="modal-room-title">${room.name}</h2>
            
            <p class="modal-room-desc mb-4" style="font-size: 0.95rem; color: #666; line-height: 1.7;">${room.description}</p>
            
            <!-- Specs Grid -->
            <div class="modal-specs-grid" style="padding-bottom: 25px; border-bottom: 1px solid #eee; margin-bottom: 25px;">
                <div class="modal-spec-item">
                    <i class="fa-solid fa-maximize"></i>
                    <span>${room.size}</span>
                </div>
                <div class="modal-spec-item">
                    <i class="fa-solid fa-bed"></i>
                    <span>${room.bedType || '1 giường lớn (King)'}</span>
                </div>
                <div class="modal-spec-item">
                    <i class="fa-solid fa-mountain-sun"></i>
                    <span>${room.view || 'Hướng vườn'}</span>
                </div>
                <div class="modal-spec-item">
                    <i class="fa-solid fa-users"></i>
                    <span>Tối đa: ${room.capacity}</span>
                </div>
            </div>

            <!-- Full Amenities Grid (Restored) -->
            <div class="modal-amenities-section" style="margin-bottom: 40px;">
                <h4 class="modal-amenities-title" style="font-weight: 700; font-size: 1rem; color: #111; margin-bottom: 15px;">Tiện ích</h4>
                <div class="modal-amenities-grid-res">
                    ${room.fullAmenities.map(a => `
                        <div class="modal-amenity-item-res">
                            <i class="fa-solid ${a.icon}"></i>
                            <span>${a.text}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Footer -->
            <div class="modal-selection-footer">
                <div class="modal-qty-selector">
                    <button class="modal-qty-btn" onclick="updateModalQty(-1)">-</button>
                    <span class="modal-qty-val" id="modalQtyVal">1</span>
                    <button class="modal-qty-btn" onclick="updateModalQty(1)">+</button>
                </div>
                <button class="btn-modal-choose" onclick="confirmModalSelection('${room.id}')">Chọn phòng</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRoomDetail() {
    const modal = document.getElementById('roomDetailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function moveModalImg(roomId, delta) {
    const room = roomData.find(r => r.id === roomId);
    if (!room) return;

    currentModalImgIndex += delta;
    if (currentModalImgIndex < 0) currentModalImgIndex = room.images.length - 1;
    if (currentModalImgIndex >= room.images.length) currentModalImgIndex = 0;

    changeModalImgByIndex(roomId, currentModalImgIndex);
}

function changeModalImgByIndex(roomId, index) {
    const room = roomData.find(r => r.id === roomId);
    if (!room) return;

    currentModalImgIndex = index;
    const src = room.images[index];

    const mainImg = document.getElementById('modalMainImg');
    if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = '1';
        }, 150);
    }

    // Update active thumb
    document.querySelectorAll('.modal-thumb-item').forEach((thumb, idx) => {
        if (parseInt(thumb.getAttribute('data-index')) === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function updateModalQty(delta) {
    const qtyEl = document.getElementById('modalQtyVal');
    if (qtyEl) {
        let current = parseInt(qtyEl.innerText);
        let next = current + delta;
        if (next < 0) next = 0;
        qtyEl.innerText = next;
    }
}

function confirmModalSelection(roomId) {
    const room = roomData.find(r => r.id === roomId);
    if (!room) return;

    // Logic: Select the first package and close
    handleSelectPackage(room.id, room.packages[0].id, { stopPropagation: () => { } });
    closeRoomDetail();

    // Optional: Scroll to the container or show success
    const card = document.querySelector(`.room-card-main`); // Simplified
    if (card) card.scrollIntoView({ behavior: 'smooth' });
}

/* ================================================================
   STEP 2: ADD-ON SERVICES RENDERING
   ================================================================ */

function renderStep2Services() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    container.innerHTML = selectedRoomSelections.map((sel, idx) => `
        <div class="service-room-group">
            <div class="service-room-header">
                <div>
                    <h5 class="mb-1" style="font-weight:700; color:var(--color-navy);">Phòng ${idx + 1}</h5>
                    <div class="small text-muted">${sel.room.name}</div>
                </div>
                <div class="text-primary small" style="cursor:pointer">Ẩn dịch vụ <i class="fa-solid fa-chevron-up"></i></div>
            </div>
            
            <div class="services-grid">
                ${serviceData.map(svc => {
        const isChecked = (selectedServices[idx] || []).includes(svc.id);
        return `
                    <div class="service-card">
                        <div class="service-img-wrapper">
                            <img src="${svc.image}" alt="${svc.name}">
                        </div>
                        <div class="service-info">
                            <div class="service-title">${svc.name}</div>
                            <div class="service-price-row">
                                <div class="service-price">${formatMoney(svc.price)} đ</div>
                                <div class="service-actions">
                                <label class="service-check-wrapper">
                                <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleService(${idx}, '${svc.id}')">
                                Thêm
                                </label>
                                </div>
                                <button class="service-info-btn" title="Chi tiết"><i class="fa-solid fa-circle-info"></i> Chi tiết</button>
                            </div>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `).join('');
}

function toggleService(roomIdx, serviceId) {
    if (!selectedServices[roomIdx]) selectedServices[roomIdx] = [];

    const index = selectedServices[roomIdx].indexOf(serviceId);
    if (index > -1) {
        selectedServices[roomIdx].splice(index, 1);
    } else {
        selectedServices[roomIdx].push(serviceId);
    }

    updateSidebar();
}

/* ================================================================
   STEP 3: PAYMENT RENDERING
   ================================================================ */

function renderStep3Payment() {
    const container = document.getElementById('paymentContainer');
    if (!container) return;

    // Generate Guest Rooms HTML
    let guestRoomsHtml = '';
    selectedRoomSelections.forEach((sel, idx) => {
        // Vinpearl usually groups this info inside "Tôi là khách lưu trú" logic if needed, 
        // but since we keep it simple, we just have standard names.
        guestRoomsHtml += `
            <div class="mt-3">
                <label class="d-flex align-items-center gap-2 m-0 cursor-pointer mb-2">
                    <input type="checkbox" class="form-check-input mt-0" id="sameAsContact" onchange="copyContactToGuest()">
                    <span class="small fw-medium text-dark">Tôi là khách lưu trú</span>
                </label>
            </div>
        `;
    });

    container.innerHTML = `
        <style>
            .vin-input.is-invalid {
                border-color: #dc3545 !important;
                box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.15) !important;
            }
            .field-error-msg {
                color: #dc3545;
                font-size: 0.78rem;
                margin-top: 4px;
                display: none;
                font-weight: 500;
            }
            .field-error-msg.visible {
                display: block;
            }
        </style>
        <div class="vin-login-prompt mb-4">
            <h5 class="fw-bold mb-1" style="font-size:1rem; color:#111;">Đăng nhập để hưởng thêm đặc quyền dành cho thành viên VinClub</h5>
            <p class="text-muted small mb-3">Giảm tới 10% giá phòng & tích lũy giao dịch để nâng hạng thành viên.</p>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-pill-primary px-4 py-2" style="border-radius:24px; font-weight:600; font-size:0.9rem;">
                    <a href="./login.html" style="color: white; text-decoration: none;">Đăng nhập</a>
                </button>
                <span class="small text-muted">hoặc <a href="./login.html" style="color:#e8952f; font-weight:500; text-decoration:none;">Đăng ký</a></span>
            </div>
        </div>

        <div class="vin-checkout-section mb-4">
            <div class="vin-section-title">Thông tin người đặt chỗ</div>
            <div class="vin-section-body">
                <div class="mb-3 d-flex align-items-center gap-3">
                    <label class="form-label mb-0 fw-medium" style="font-size:0.85rem;">Danh xưng <span class="text-danger">*</span></label>
                    <label class="d-flex align-items-center gap-2 m-0 cursor-pointer fw-normal">
                        <input type="radio" name="title" class="form-check-input mt-0" checked> Ông
                    </label>
                    <label class="d-flex align-items-center gap-2 m-0 cursor-pointer fw-normal">
                        <input type="radio" name="title" class="form-check-input mt-0"> Bà
                    </label>
                    <label class="d-flex align-items-center gap-2 m-0 cursor-pointer fw-normal">
                        <input type="radio" name="title" class="form-check-input mt-0"> Khác
                    </label>
                </div>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label" style="font-size: 0.85rem; color:#666;">Họ <span class="text-danger">*</span></label>
                        <input type="text" class="form-control vin-input" id="checkout-ho" placeholder="VD: NGUYEN" aria-describedby="err-ho">
                        <div class="field-error-msg" id="err-ho">Vui lòng nhập họ của bạn.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" style="font-size: 0.85rem; color:#666;">Tên đệm và tên <span class="text-danger">*</span></label>
                        <input type="text" class="form-control vin-input" id="checkout-ten" placeholder="VD: VAN A" aria-describedby="err-ten">
                        <div class="field-error-msg" id="err-ten">Vui lòng nhập tên đệm và tên của bạn.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" style="font-size: 0.85rem; color:#666;">Email nhận thông tin đơn hàng <span class="text-danger">*</span></label>
                        <input type="email" class="form-control vin-input" id="checkout-email" placeholder="VD: email@example.com" aria-describedby="err-email">
                        <div class="field-error-msg" id="err-email">Vui lòng nhập địa chỉ email hợp lệ.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" style="font-size: 0.85rem; color:#666;">Điện thoại <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <button class="btn btn-outline-secondary dropdown-toggle vin-input" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="border-right: none; background: #eeee; border-color: #ddd; btn:hover:text-color: #000; !important">+84</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">+84 (Việt Nam)</a></li>
                            </ul>
                            <input type="text" class="form-control vin-input" id="checkout-phone" style="border-left: 1px solid #ddd;" aria-describedby="err-phone">
                        </div>
                        <div class="field-error-msg" id="err-phone">Vui lòng nhập số điện thoại hợp lệ (9–11 chữ số).</div>
                    </div>
                    <div class="col-md-6 mb-2">
                        <label class="form-label" style="font-size: 0.85rem; color:#666;">Vùng quốc gia <span class="text-danger">*</span></label>
                        <select class="form-select vin-input" id="checkout-country">
                            <option value="VN">Việt Nam</option>
                            <option value="US">United States</option>
                        </select>
                    </div>
                </div>

                <div class="mt-3">
                     <label class="d-flex align-items-center gap-2 m-0 cursor-pointer mb-2">
                        <input type="checkbox" class="form-check-input mt-0" checked id="checkbox-contact-stay" style="accent-color: #e8952f;">
                        <span class="small fw-medium" style="color:#e8952f;">Tôi là khách lưu trú</span>
                    </label>
                </div>

                <div class="mt-4 pt-3 border-top">
                    <label class="fw-bold mb-2">Yêu cầu đặc biệt</label>
                    <p class="small text-muted mb-3">Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng - tuy nhiên, chúng tôi sẽ cố gắng hết sức để thực hiện.</p>
                    <div class="row g-2 mb-3">
                        <div class="col-md-4">
                            <label class="d-flex align-items-center gap-2 cursor-pointer small"><input type="checkbox" class="form-check-input mt-0"> Tầng cao</label>
                        </div>
                        <div class="col-md-4">
                            <label class="d-flex align-items-center gap-2 cursor-pointer small"><input type="checkbox" class="form-check-input mt-0"> Không hút thuốc</label>
                        </div>
                        <div class="col-md-4">
                            <label class="d-flex align-items-center gap-2 cursor-pointer small"><input type="checkbox" class="form-check-input mt-0"> Hỗ trợ cho người khuyết tật</label>
                        </div>
                        <div class="col-md-4">
                            <label class="d-flex align-items-center gap-2 cursor-pointer small"><input type="checkbox" class="form-check-input mt-0"> Khác</label>
                        </div>
                        <div class="col-md-4">
                            <label class="d-flex align-items-center gap-2 cursor-pointer small"><input type="checkbox" class="form-check-input mt-0"> Thời gian trả phòng linh hoạt</label>
                        </div>
                    </div>
                    <textarea class="form-control vin-input" rows="2" placeholder="Hãy cho chúng tôi biết quý khách cần gì"></textarea>
                </div>
            </div>
        </div>

        <div class="vin-checkout-section mb-4">
            <div class="vin-section-title">Phương thức thanh toán</div>
            <div class="vin-section-body p-0">
                <div class="vin-payment-list">
                    <label class="vin-payment-item">
                        <div class="d-flex align-items-center gap-3">
                            <input type="radio" name="paymentMethod" value="ATM" class="form-check-input mt-0" checked>
                            <span class="small fw-medium">Thẻ/tài khoản ngân hàng (ATM nội địa/quốc tế)</span>
                        </div>
                        <div class="payment-icons">
                            <img src="./assets/images/booking/techcombank.svg" alt="Techcombank" style="height: 16px; object-fit: contain;">
                            <img src="./assets/images/booking/vietcombank.svg" alt="Vietcombank" style="height: 16px; object-fit: contain;">
                            <img src="./assets/images/booking/vietinbank.svg" alt="Vietinbank" style="height: 16px; object-fit: contain;">
                            <img src="./assets/images/booking/msb.svg" alt="MSB" style="height: 16px; object-fit: contain;">
                            <span class="small text-muted fw-bold ms-2">+38</span>
                        </div>
                    </label>

                    <label class="vin-payment-item">
                        <div class="d-flex align-items-center gap-3">
                            <input type="radio" name="paymentMethod" value="CC" class="form-check-input mt-0">
                            <span class="small fw-medium">Thẻ tín dụng/ghi nợ quốc tế (Visa/Master/JCB)</span>
                        </div>
                        <div class="payment-icons">
                            <img src="./assets/images/booking/visa.svg" alt="Visa" style="height: 16px; object-fit: contain;">
                            <img src="./assets/images/booking/mastercard.svg" alt="Mastercard" style="height: 16px; object-fit: contain;">                        </div>
                    </label>

                    <label class="vin-payment-item">
                        <div class="d-flex align-items-center gap-3">
                            <input type="radio" name="paymentMethod" value="QR" class="form-check-input mt-0">
                            <span class="small fw-medium">Thanh toán bằng mã QR</span>
                        </div>
                        <div class="payment-icons">
                            <img src="./assets/images/booking/qr-code.svg" alt="QR Code" style="height: 16px; object-fit: contain;">
                            <img src="./assets/images/booking/Logo_ACB.svg" alt="ACB" style="height: 16px; object-fit: contain;">
                            <img src="./assets/images/booking/Logo_VPBank.svg" alt="VPBank" style="height: 16px; object-fit: contain;">
                            <span class="small text-muted fw-bold ms-2">+42</span>
                        </div>
                    </label>

                    <label class="vin-payment-item">
                        <div class="d-flex align-items-center gap-3">
                            <input type="radio" name="paymentMethod" value="WALLET" class="form-check-input mt-0">
                            <span class="small fw-medium">Thanh toán bằng ví điện tử</span>
                        </div>
                        <div class="payment-icons">
                             <img src="./assets/images/booking/momo.svg" alt="Momo" style="height: 16px; object-fit: contain;">
                             <img src="./assets/images/booking/zlpay.svg" alt="zlpay" style="height: 16px; object-fit: contain; margin-left: 5px;">
                        </div>
                    </label>

                    <label class="vin-payment-item">
                        <div class="d-flex align-items-center gap-3">
                            <input type="radio" name="paymentMethod" value="TRAGOP" class="form-check-input mt-0">
                            <span class="small fw-medium">Thanh toán trả góp</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <div class="mt-4 mb-4">
            <p class="small text-muted" style="line-height: 1.6;">Khi nhấp vào "Thanh toán", bạn đồng ý cung cấp các thông tin trên và đồng ý với các <a href="#" class="text-primary text-decoration-none">điều khoản, điều kiện</a> và <a href="#" class="text-primary text-decoration-none">chính sách quyền riêng tư</a> của Vinpearl.</p>
        </div>
        
        <div class="text-center mt-4">
            <button class="btn px-5 py-3" style="background:#f19b22; color:#fff; font-weight:600; font-size:1.05rem; border-radius:30px; min-width: 250px;" onclick="confirmPayment()"><i class="fa-solid fa-lock me-2"></i>Thanh toán</button>
        </div>
    `;
}

function copyContactToGuest() {
    // Only kept for API compatibility, not explicitly used in new mockup unless dynamically mapping name inputs.
}

function confirmPayment() {
    let isValid = true;

    // --- Helper: set field error state ---
    function setFieldError(inputId, errId, message) {
        const input = document.getElementById(inputId);
        const errEl = document.getElementById(errId);
        if (!input || !errEl) return;
        input.classList.add('is-invalid');
        errEl.textContent = message;
        errEl.classList.add('visible');
        isValid = false;
    }

    function clearFieldError(inputId, errId) {
        const input = document.getElementById(inputId);
        const errEl = document.getElementById(errId);
        if (!input || !errEl) return;
        input.classList.remove('is-invalid');
        errEl.classList.remove('visible');
    }

    // --- Clear all previous errors ---
    ['checkout-ho', 'checkout-ten', 'checkout-email', 'checkout-phone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('is-invalid');
    });
    ['err-ho', 'err-ten', 'err-email', 'err-phone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('visible');
    });

    // --- Validate Họ ---
    const ho = document.getElementById('checkout-ho')?.value?.trim();
    if (!ho) {
        setFieldError('checkout-ho', 'err-ho', 'Vui lòng nhập họ của bạn.');
    } else {
        clearFieldError('checkout-ho', 'err-ho');
    }

    // --- Validate Tên ---
    const ten = document.getElementById('checkout-ten')?.value?.trim();
    if (!ten) {
        setFieldError('checkout-ten', 'err-ten', 'Vui lòng nhập tên đệm và tên của bạn.');
    } else {
        clearFieldError('checkout-ten', 'err-ten');
    }

    // --- Validate Email ---
    const email = document.getElementById('checkout-email')?.value?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        setFieldError('checkout-email', 'err-email', 'Vui lòng nhập địa chỉ email.');
    } else if (!emailRegex.test(email)) {
        setFieldError('checkout-email', 'err-email', 'Địa chỉ email không hợp lệ (VD: example@gmail.com).');
    } else {
        clearFieldError('checkout-email', 'err-email');
    }

    // --- Validate Điện thoại ---
    const phone = document.getElementById('checkout-phone')?.value?.trim();
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phone) {
        setFieldError('checkout-phone', 'err-phone', 'Vui lòng nhập số điện thoại.');
    } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        setFieldError('checkout-phone', 'err-phone', 'Số điện thoại không hợp lệ (9–11 chữ số, VD: 0912345678).');
    } else {
        clearFieldError('checkout-phone', 'err-phone');
    }

    // --- Stop nếu còn lỗi ---
    if (!isValid) {
        // Scroll lên form để user thấy lỗi
        const firstError = document.querySelector('.vin-input.is-invalid');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // --- Thành công ---
    const fullName = `${ho} ${ten}`;

    // --- Save to LocalStorage ---
    const nights = searchSession ? searchSession.nights : 1;
    let totalPrice = selectedRoomSelections.reduce((acc, curr) => acc + (curr.pkg.price * nights), 0);
    Object.values(selectedServices).forEach(sids => {
        sids.forEach(sid => {
            const s = serviceData.find(item => item.id === sid);
            if (s) totalPrice += s.price;
        });
    });

    const bookingRecord = {
        bookingId: "VP" + Date.now().toString().slice(-6),
        bookingDate: new Date().toISOString(),
        customer: {
            ho: ho,
            ten: ten,
            fullName: fullName,
            email: email,
            phone: phone
        },
        trip: searchSession || null,
        rooms: selectedRoomSelections.map(s => ({
            roomId: s.room.id,
            roomName: s.room.name,
            packageId: s.pkg.id,
            packageName: s.pkg.name,
            price: s.pkg.price
        })),
        services: selectedServices,
        totalPrice: totalPrice,
        status: "Thành công"
    };

    let history = JSON.parse(localStorage.getItem('vinpearl_booking_history') || '[]');
    history.push(bookingRecord);
    localStorage.setItem('vinpearl_booking_history', JSON.stringify(history));
    localStorage.setItem('vinpearl_latest_booking', JSON.stringify(bookingRecord));

    const modalHtml = `
    <div id="paymentSuccessModal" class="vp-modal-overlay active" style="z-index: 9999; display: flex; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6);">
        <div class="vp-modal-container" style="background: #fff; border-radius: 12px; padding: 40px; text-align: center; max-width: 450px; width: 90%; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <div style="width: 80px; height: 80px; background: #e0f2e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i class="fa-solid fa-check" style="font-size: 40px; color: #2e7d32;"></i>
            </div>
            <h3 style="color: #2b3b8e; font-weight: 700; font-size: 1.5rem; margin-bottom: 15px;">Thanh toán thành công!</h3>
            <p style="color: #444; font-size: 1rem; margin-bottom: 5px; line-height: 1.5;">Cảm ơn <strong>${fullName}</strong> đã đặt phòng tại Vinpearl Luxury Nha Trang.</p>
            <p style="color: #666; font-size: 0.95rem; margin-bottom: 25px; line-height: 1.5;">Mã đặt phòng của bạn là <strong style="color:var(--color-navy);">${bookingRecord.bookingId}</strong>. Hệ thống sẽ tự động chuyển hướng.</p>
            
            <div style="background: #fdfaf6; border: 1px solid #f9ece0; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <div style="font-size: 0.95rem; color: #555;">Tự động chuyển về trang chủ sau</div>
                <div style="font-size: 1.8rem; font-weight: 700; color: #e8952f; margin: 5px 0;"><span id="redirect-countdown">5</span>s</div>
            </div>
            
            <button onclick="window.location.href='./home.html'" class="btn w-100 py-2" style="background:#f19b22; color:#fff; font-weight:600; border-radius:30px;">Về trang chủ ngay</button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Reset timer
    if (bookingTimerInterval) clearInterval(bookingTimerInterval);

    // Clear selections
    selectedRoomSelections = [];
    selectedServices = {};

    let countdown = 5;
    const countdownEl = document.getElementById('redirect-countdown');
    const interval = setInterval(() => {
        countdown--;
        if (countdownEl) countdownEl.innerText = countdown;
        if (countdown <= 0) {
            clearInterval(interval);
            window.location.href = './home.html';
        }
    }, 1000);
}

// --- HELPERS ---
const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
function formatFullDate(dateStr) {
    if (!dateStr) return '-- / --';
    const d = new Date(dateStr);
    return `${dayNames[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function calculateNights(start, end) {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
}

function formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Ensure init is called
window.addEventListener('load', init);
