/* ================================================================
   BOOKING.JS – High-Fidelity Detail & Search Bar Integration
   ================================================================ */

// --- DATA ---
const roomData = [
    {
        id: "room-vg-1",
        name: "Biệt thự hướng vườn (Garden View Villa)",
        image: "./assets/booking/hotel-5-1.png",
        capacity: "4 Người",
        size: "60 m²",
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
        image: "./assets/booking/hotel-5-2.png",
        capacity: "4 Người",
        size: "134 m²",
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
    }
];

/* --- SEARCH BAR STATE --- */
let currentRoomCount = 1;
let roomDataArray = [{ adults: 1, children: 0, infants: 0 }];
let expandedRoomId = null;
let selectedRoom = null;
let selectedPackage = null;
let searchSession = null;

// --- INITIALIZE ---
function init() {
    loadSession();
    renderRooms();
    updateSidebar();
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
    }
}

/* ================================================================
   GUEST DROPDOWN LOGIC (Syncced with Home.html)
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

    // Apply scroll if > 2 rooms
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

    if (!checkin || !checkout) {
        alert('Vui lòng chọn ngày nhận và trả phòng');
        return;
    }

    const searchData = {
        hotel: "Vinpearl Luxury Nha Trang",
        checkin,
        checkout,
        roomData: roomDataArray
    };

    localStorage.setItem('vp_search_data', JSON.stringify(searchData));
    
    // Refresh page to apply new search parameters
    window.location.reload();
}

/* ================================================================
   ROOM & PACKAGE LISTING LOGIC
   ================================================================ */

function renderRooms() {
    const container = document.getElementById('roomContainer');
    if (!container) return;

    container.innerHTML = roomData.map((room) => {
        const isExpanded = expandedRoomId === room.id;
        return `
            <div class="room-card-main">
                <div class="room-top-info">
                    <img src="${room.image}" class="room-img-thumb" alt="Room">
                    <div class="room-desc-right">
                        <h4 class="room-name-title">${room.name}</h4>
                        <div class="room-specs-line mt-2 mb-3">
                            <span><i class="fa-solid fa-user"></i> ${room.capacity}</span>
                            <span class="ms-3"><i class="fa-solid fa-maximize"></i> ${room.size}</span>
                        </div>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <div>
                                <div class="small text-muted">Giá mỗi đêm từ</div>
                                <div class="h4 fw-bold mb-0" style="color: var(--color-navy);">${formatMoney(room.packages[0].price)} ₫</div>
                            </div>
                            <button class="btn btn-primary px-4 py-2 ${isExpanded ? 'active' : ''}" 
                                    onclick="togglePackages('${room.id}')">
                                ${isExpanded ? 'ĐÓNG' : 'CHỌN'}
                                <i class="fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} ms-2" style="font-size: 0.7rem;"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="package-dropdown-area ${isExpanded ? 'active' : ''}">
                    <div class="small fw-bold px-4 pt-3 text-muted opacity-75">Gói tiêu chuẩn</div>
                    ${room.packages.map(pkg => {
                        const isSelected = selectedPackage && selectedPackage.id === pkg.id;
                        return `
                        <div class="package-item ${isSelected ? 'selected' : ''}" onclick="handleSelectPackage('${room.id}', '${pkg.id}')">
                            <div class="pkg-info">
                                <div class="pkg-title">${pkg.name}</div>
                                <div class="pkg-amenities">
                                    ${pkg.amenities.map(a => `<span><i class="fa-solid fa-circle-check"></i> ${a}</span>`).join('')}
                                </div>
                            </div>
                            <div class="pkg-pricing">
                                <div class="pkg-price-orig">${formatMoney(pkg.origPrice)} ₫</div>
                                <div class="pkg-price-member">${formatMoney(pkg.price)} ₫ <i class="fa-solid fa-circle-info text-muted ms-1" style="font-size:0.8rem;"></i></div>
                                <div class="small text-muted" style="font-size: 0.7rem;">Giá thành viên / Đêm</div>
                            </div>
                            <div class="pkg-select-indicator"></div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function togglePackages(roomId) {
    expandedRoomId = (expandedRoomId === roomId) ? null : roomId;
    renderRooms();
}

function handleSelectPackage(roomId, pkgId) {
    selectedRoom = roomData.find(r => r.id === roomId);
    selectedPackage = selectedRoom.packages.find(p => p.id === pkgId);
    
    renderRooms();
    updateSidebar();
}

function updateSidebar() {
    const sideInfo = document.getElementById('selectedPackageSection');
    const sidePkgName = document.getElementById('side-pkg-name');
    const sideTotal = document.getElementById('side-total');
    const btnContinue = document.getElementById('btnContinue');

    if (selectedRoom && selectedPackage) {
        sideInfo.style.display = 'block';
        sidePkgName.innerHTML = `<span class="fw-bold">${selectedRoom.name}</span><br><span class="small text-muted">${selectedPackage.name}</span>`;
        
        const nights = searchSession ? searchSession.nights : 1;
        const total = selectedPackage.price * nights;
        sideTotal.innerText = `${formatMoney(total)} ₫`;
        
        btnContinue.disabled = false;
        btnContinue.style.background = '#f28b27';
    } else {
        sideInfo.style.display = 'none';
        sideTotal.innerText = '0 ₫';
        btnContinue.disabled = true;
        btnContinue.style.background = '#dee2e6';
    }
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

// Run init
window.addEventListener('load', init);
