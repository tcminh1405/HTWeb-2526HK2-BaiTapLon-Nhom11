// --- DATA ---
const hotelData = [

    {
        name: "Melia Vinpearl Empire Nha Trang",
        images: ["./assets/images/search-results/hotel-1-1.png", "./assets/images/search-results/hotel-1-2.png", "./assets/images/search-results/hotel-1-3.png"],
        rating: "5/5", reviews: "1.916",
        address: "44-46 Lê Thánh Tôn, Lộc Thọ, Nha Trang, Khánh Hòa",
        tags: ["Vị trí trung tâm", "Bể bơi vô cực"],
        origPrice: "1.510.000", membPrice: "1.434.500"
    },
    {
        name: "Vinpearl Beachfront Nha Trang",
        images: ["./assets/images/search-results/hotel-2-1.png", "./assets/images/search-results/hotel-2-2.png", "./assets/images/search-results/hotel-2-3.png"],
        rating: "4.9/5", reviews: "2.103",
        address: "78 - 80 Đường Trần Phú, Phường Lộc Thọ, Tp. Nha Trang",
        tags: ["Vị trí sát biển", "Bãi biển riêng"],
        origPrice: "2.190.000", membPrice: "2.080.500"
    },
    {
        name: "Hòn Tằm Resort",
        images: ["./assets/images/search-results/hotel-3-1.png", "./assets/images/search-results/hotel-3-2.png", "./assets/images/search-results/hotel-3-3.png"],
        rating: "4.7/5", reviews: "1.931",
        address: "Đảo Hòn Tằm, Phường Vĩnh Nguyên, Nha Trang",
        tags: ["Bãi biển riêng", "Trải nghiệm tắm bùn"],
        origPrice: "2.620.000", membPrice: "2.489.000"
    },
    {
        name: "Vinpearl Resort Nha Trang",
        images: ["./assets/images/search-results/hotel-4-1.png", "./assets/images/search-results/hotel-4-2.png", "./assets/images/search-results/hotel-4-3.png"],
        rating: "4.6/5", reviews: "3.119",
        address: "Đảo Hòn Tre, Tp. Nha Trang, Tỉnh Khánh Hòa",
        tags: ["Vinpearl Harbour", "Bể bơi rộng nhất"],
        origPrice: "4.370.000", membPrice: "4.151.500"
    },
    {
        name: "Vinpearl Luxury Nha Trang",
        images: ["./assets/images/search-results/hotel-5-1.png", "./assets/images/search-results/hotel-5-2.png", "./assets/images/search-results/hotel-5-3.png"],
        rating: "5/5", reviews: "2.026",
        address: "Đảo Hòn Tre, Tp. Nha Trang, Tỉnh Khánh Hòa, Việt Nam",
        tags: ["Bãi biển riêng", "Bể bơi vô cực"],
        origPrice: "5.310.000", membPrice: "5.044.500"
    },
];

// --- RENDER & CAROUSEL LOGIC ---
function renderResults(dataToRender = hotelData) {
    const container = document.getElementById('hotelCardContainer');
    if (!container) return;

    if (dataToRender.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fa-solid fa-magnifying-glass fs-1 text-muted mb-3"></i>
                <h4 class="text-muted">Không tìm thấy kết quả phù hợp cho tìm kiếm của bạn</h4>
                <p class="text-muted">Vui lòng thử lại với từ khóa khác</p>
            </div>
        `;
        return;
    }

    container.innerHTML = dataToRender.map((h, i) => `
                <div class="hotel-card">
                    <div class="hotel-img-wrapper">
                        <div id="carouselH${i}" class="carousel slide h-100" data-bs-ride="false" data-bs-interval="false">
                            <div class="carousel-inner h-100">
                                ${h.images.map((img, idx) => `
                                    <div class="carousel-item ${idx === 0 ? 'active' : ''} h-100">
                                        <img src="${img}" class="d-block w-100 h-100" alt="Hotel Photo">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselH${i}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselH${i}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="hotel-info">
                        <h3 class="hotel-name">${h.name}</h3>
                        <div class="hotel-rating"><i class="fa-solid fa-star text-success"></i> <b>${h.rating}</b> <span class="text-muted">(${h.reviews} Đánh giá)</span></div>
                        <div class="hotel-address small text-muted my-2"><i class="fa-solid fa-location-dot"></i> ${h.address}</div>
                        <div class="hotel-tags mt-auto">${h.tags.map(t => `<span class="hotel-tag">${t}</span>`).join('')}</div>
                    </div>
                    <div class="hotel-price-block">
                        <div class="small text-muted text-decoration-line-through">${h.origPrice} ₫</div>
                        <div class="fw-bold text-navy h4 mb-0">${h.membPrice} ₫</div>
                        <div class="small text-muted mb-3">Giá thành viên / Đêm</div>
                        <button class="btn btn-chon" onclick="selectHotel('${h.name}')">Chọn</button>
                    </div>
                </div>
            `).join('');

    // Explicitly initialize each carousel to ensure manual-only and looping
    dataToRender.forEach((h, i) => {
        const el = document.getElementById('carouselH' + i);
        if (el) {
            new bootstrap.Carousel(el, {
                interval: false,
                ride: false,
                wrap: true
            });
        }
    });
}

function selectHotel(name) {
    if (name === "Vinpearl Luxury Nha Trang") {
        window.location.href = "./booking.html";
    } else {
        alert("Tính năng đặt phòng hiện đang được phát triển cho khách sạn này.");
    }
}

// --- SEARCH & LOCAL STORAGE LOGIC ---
// --- SEARCH & LOCAL STORAGE LOGIC ---
let roomData = [{ adults: 1, children: 0, infants: 0 }];

function updateGuestCount(type, delta, roomIdx = 0) {
    if (type === 'room') {
        const newVal = roomData.length + delta;
        if (newVal < 1 || newVal > 9) return;

        if (delta > 0) {
            roomData.push({ adults: 1, children: 0, infants: 0 });
        } else {
            roomData.pop();
        }
        document.getElementById('val-room').innerText = roomData.length;
    } else {
        const room = roomData[roomIdx];
        const key = type === 'adult' ? 'adults' : type === 'child' ? 'children' : 'infants';

        if (type === 'adult' && room.adults + delta < 1) return;
        if (type === 'child' && room.children + delta < 0) return;
        if (type === 'infant' && room.infants + delta < 0) return;

        if (room[key] + delta > 9) return;

        if (type === 'adult') room.adults += delta;
        else if (type === 'child') room.children += delta;
        else room.infants += delta;
    }

    renderRoomRows();
    updateSummaryText();
    saveSearchData();
}

function renderRoomRows() {
    const container = document.getElementById('roomRowsContainer');
    if (!container) return;

    container.innerHTML = roomData.map((room, idx) => `
        <div class="mb-4 text-start">
            <div class="fw-medium text-secondary mb-3 d-flex justify-content-between" style="font-size: 0.95rem;">
                <span>Phòng ${idx + 1}</span>
            </div>
            <div class="row text-center g-2">
                <div class="col-4 text-start">
                    <div class="text-muted mb-2" style="font-size: 0.8rem;">Người lớn</div>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="guest-qty-btn" onclick="updateGuestCount('adult', -1, ${idx})"><i class="fa-solid fa-minus"></i></button>
                        <span class="fw-medium text-dark" style="min-width: 14px; text-align: center;">${room.adults}</span>
                        <button type="button" class="guest-qty-btn" onclick="updateGuestCount('adult', 1, ${idx})"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="col-4 text-start">
                    <div class="text-muted mb-2" style="font-size: 0.8rem;">Trẻ em</div>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="guest-qty-btn" onclick="updateGuestCount('child', -1, ${idx})"><i class="fa-solid fa-minus"></i></button>
                        <span class="fw-medium text-dark" style="min-width: 14px; text-align: center;">${room.children}</span>
                        <button type="button" class="guest-qty-btn" onclick="updateGuestCount('child', 1, ${idx})"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="col-4 text-start">
                    <div class="text-muted mb-2" style="font-size: 0.8rem;">Em bé</div>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="guest-qty-btn" onclick="updateGuestCount('infant', -1, ${idx})"><i class="fa-solid fa-minus"></i></button>
                        <span class="fw-medium text-dark" style="min-width: 14px; text-align: center;">${room.infants}</span>
                        <button type="button" class="guest-qty-btn" onclick="updateGuestCount('infant', 1, ${idx})"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
        </div>
        ${idx < roomData.length - 1 ? '<hr class="text-muted opacity-10 my-3">' : ''}
    `).join('');

    // Apply scroll if > 3 rooms
    container.style.overflowY = roomData.length > 2 ? 'auto' : 'hidden';
}

function updateSummaryText() {
    const totalRooms = roomData.length;
    const totalAdults = roomData.reduce((sum, r) => sum + r.adults, 0);
    const totalChildren = roomData.reduce((sum, r) => sum + r.children, 0);
    const totalInfants = roomData.reduce((sum, r) => sum + r.infants, 0);

    let text = `${totalRooms} Phòng - ${totalAdults} Người lớn`;
    if (totalChildren > 0 || totalInfants > 0) text += ' ...';
    document.getElementById('guestSummaryText').innerText = text;
}

function saveSearchData() {
    const data = {
        checkin: document.getElementById('checkinDate').value,
        checkout: document.getElementById('checkoutDate').value,
        roomData: roomData
    };
    localStorage.setItem('vp_search_data', JSON.stringify(data));
}

function loadSearchData() {
    const saved = localStorage.getItem('vp_search_data');
    if (saved) {
        const d = JSON.parse(saved);
        if (d.checkin) document.getElementById('checkinDate').value = d.checkin;
        if (d.checkout) document.getElementById('checkoutDate').value = d.checkout;

        if (d.roomData && Array.isArray(d.roomData)) {
            roomData = d.roomData;
        } else if (d.rooms) {
            // Fallback for old format
            roomData = [];
            const rCount = parseInt(d.rooms) || 1;
            const aCount = parseInt(d.adults) || 1;
            const cCount = parseInt(d.children) || 0;
            const iCount = parseInt(d.infants) || 0;
            for (let i = 0; i < rCount; i++) {
                roomData.push({ adults: i === 0 ? aCount : 1, children: i === 0 ? cCount : 0, infants: i === 0 ? iCount : 0 });
            }
        }

        document.getElementById('val-room').innerText = roomData.length;
        renderRoomRows();
        updateSummaryText();
    } else {
        renderRoomRows();
    }
}

function saveAndSearch() {
    saveSearchData();
    window.location.reload();
}

function toggleEO() {
    const content = document.getElementById('eoContent');
    const tab = document.getElementById('eoTab');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        tab.style.display = 'none';
    } else {
        content.style.display = 'none';
        tab.style.display = 'block';
    }
}

// --- STICKY GAP FIX & SEARCH INIT ---
window.addEventListener('load', () => {
    loadSearchData();

    // --- Dynamic Search Filtering ---
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const resultTitle = document.querySelector('.result-title');

    if (query) {
        const q = query.toLowerCase().trim();
        
        // Define room-to-hotel mapping for demonstration
        const roomToHotel = {
            "vườn": "Vinpearl Luxury Nha Trang",
            "garden": "Vinpearl Luxury Nha Trang",
            "grand": "Vinpearl Luxury Nha Trang",
            "beach front": "Vinpearl Luxury Nha Trang",
            "presidential": "Vinpearl Luxury Nha Trang",
            "beachfront": "Vinpearl Beachfront Nha Trang",
            "empire": "Melia Vinpearl Empire Nha Trang",
            "tằm": "Hòn Tằm Resort",
            "resort": "Vinpearl Resort Nha Trang"
        };

        // Filter: match hotel name OR keywords in mapping
        const filtered = hotelData.filter(hotel => {
            const nameMatch = hotel.name.toLowerCase().includes(q);
            // Check if any key in mapping exists in query and matches this hotel
            const roomMatch = Object.keys(roomToHotel).some(key => 
                q.includes(key) && roomToHotel[key] === hotel.name
            );
            return nameMatch || roomMatch;
        });

        const count = filtered.length;
        if (resultTitle) {
            resultTitle.innerText = `Có ${count < 10 ? '0' + count : count} kết quả cho "${query}"`;
        }
        renderResults(filtered);
    } else {
        if (resultTitle) {
            resultTitle.innerText = `Có ${hotelData.length < 10 ? '0' + hotelData.length : hotelData.length} kết quả tại/ gần địa điểm "Vinpearl Luxury Nha Trang"`;
        }
        renderResults(hotelData);
    }

    const nav = document.getElementById('mainNav');
    const bar = document.querySelector('.booking-bar-wrapper');

    const adjustTop = () => {
        if (window.scrollY > 20) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', adjustTop);
    window.addEventListener('resize', adjustTop);
    adjustTop();
});
