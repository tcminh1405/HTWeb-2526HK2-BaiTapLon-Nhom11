// Set default booking dates
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);

document.getElementById('checkinDate').valueAsDate = tomorrow;
document.getElementById('checkoutDate').valueAsDate = dayAfter;

// Guest Selection Dropdown Logic
// Guest Selection Dropdown Logic
// --- GUEST SELECTION LOGIC (Multiple Rooms) ---
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
        const val = roomData[roomIdx][type === 'adult' ? 'adults' : type === 'child' ? 'children' : 'infants'];
        if (type === 'adult' && val + delta < 1) return;
        if ((type === 'child' || type === 'infant') && val + delta < 0) return;
        if (val + delta > 9) return;

        if (type === 'adult') roomData[roomIdx].adults += delta;
        else if (type === 'child') roomData[roomIdx].children += delta;
        else roomData[roomIdx].infants += delta;
    }

    renderRoomRows();
    updateGuestSummary();
    saveSearchToLocal();
}

function renderRoomRows() {
    const container = document.getElementById('roomRowsContainer');
    container.innerHTML = roomData.map((room, idx) => `
                <div class="mb-4">
                    <div class="fw-medium text-secondary mb-3 d-flex justify-content-between" style="font-size: 0.95rem;">
                        <span>Phòng ${idx + 1}</span>
                    </div>
                    <div class="row text-center g-2">
                        <div class="col-4">
                            <div class="text-muted mb-2" style="font-size: 0.8rem;">Người lớn</div>
                            <div class="d-flex justify-content-center align-items-center gap-2">
                                <button type="button" class="guest-qty-btn" onclick="updateGuestCount('adult', -1, ${idx})"><i class="fa-solid fa-minus"></i></button>
                                <span class="fw-medium text-dark" style="min-width: 14px;">${room.adults}</span>
                                <button type="button" class="guest-qty-btn" onclick="updateGuestCount('adult', 1, ${idx})"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-muted mb-2" style="font-size: 0.8rem;">Trẻ em</div>
                            <div class="d-flex justify-content-center align-items-center gap-2">
                                <button type="button" class="guest-qty-btn" onclick="updateGuestCount('child', -1, ${idx})"><i class="fa-solid fa-minus"></i></button>
                                <span class="fw-medium text-dark" style="min-width: 14px;">${room.children}</span>
                                <button type="button" class="guest-qty-btn" onclick="updateGuestCount('child', 1, ${idx})"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-muted mb-2" style="font-size: 0.8rem;">Em bé</div>
                            <div class="d-flex justify-content-center align-items-center gap-2">
                                <button type="button" class="guest-qty-btn" onclick="updateGuestCount('infant', -1, ${idx})"><i class="fa-solid fa-minus"></i></button>
                                <span class="fw-medium text-dark" style="min-width: 14px;">${room.infants}</span>
                                <button type="button" class="guest-qty-btn" onclick="updateGuestCount('infant', 1, ${idx})"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                ${idx < roomData.length - 1 ? '<hr class="text-muted opacity-10 my-3">' : ''}
            `).join('');

    // Apply scroll if > 2 rooms
    container.style.overflowY = roomData.length > 2 ? 'auto' : 'hidden';
}

function updateGuestSummary() {
    const totalRooms = roomData.length;
    const totalAdults = roomData.reduce((sum, r) => sum + r.adults, 0);
    const totalChildren = roomData.reduce((sum, r) => sum + r.children, 0);
    const totalInfants = roomData.reduce((sum, r) => sum + r.infants, 0);

    let summary = totalRooms + ' Phòng - ' + totalAdults + ' Người lớn';
    if (totalChildren > 0 || totalInfants > 0) {
        summary += ' ...';
    }
    document.getElementById('guestSummaryText').innerText = summary;
}

function saveSearchToLocal() {
    const searchData = {
        hotel: "Vinpearl Luxury Nha Trang",
        checkin: document.getElementById('checkinDate').value,
        checkout: document.getElementById('checkoutDate').value,
        roomData: roomData // Save the full array
    };
    localStorage.setItem('vp_search_data', JSON.stringify(searchData));
}

function saveAndSearch() {
    saveSearchToLocal();
    window.location.href = './search-results.html';
}

// Initialize from local storage if available
window.addEventListener('load', () => {
    const saved = localStorage.getItem('vp_search_data');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.checkin) document.getElementById('checkinDate').value = data.checkin;
        if (data.checkout) document.getElementById('checkoutDate').value = data.checkout;

        if (data.roomData && Array.isArray(data.roomData)) {
            roomData = data.roomData;
        } else if (data.rooms) {
            // Fallback for old format
            roomData = [];
            const rCount = parseInt(data.rooms) || 1;
            const aCount = parseInt(data.adults) || 1;
            const cCount = parseInt(data.children) || 0;
            const iCount = parseInt(data.infants) || 0;
            for (let i = 0; i < rCount; i++) {
                roomData.push({ adults: i === 0 ? aCount : 1, children: i === 0 ? cCount : 0, infants: i === 0 ? iCount : 0 });
            }
        }

        document.getElementById('val-room').innerText = roomData.length;
        renderRoomRows();
        updateGuestSummary();
    } else {
        renderRoomRows();
    }
});