// Simple client-side app using localStorage to simulate backend
// Provides: books, members, loans; basic CRUD and loan/return logic

const storage = {
    booksKey: 'simpus_books',
    membersKey: 'simpus_members',
    loansKey: 'simpus_loans',

    get(key){
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    },
    set(key, val){
        localStorage.setItem(key, JSON.stringify(val));
    }
};

function initSampleData(){
    if(!storage.get(storage.booksKey)){
        const books = [
            {id: 'b1', title:'Laskar Pelangi', author:'Andrea Hirata', year:2005, stock:4},
            {id: 'b2', title:'Bumi Manusia', author:'Pramoedya Ananta Toer', year:1980, stock:2},
            {id: 'b3', title:'Negeri 5 Menara', author:'Ahmad Fuadi', year:2009, stock:0}
        ];
        storage.set(storage.booksKey, books);
    }
    if(!storage.get(storage.membersKey)){
        const members = [
            {id:'A001', name:'Siti Aminah', address:'Malang', phone:'0812xxxx'},
            {id:'A002', name:'Budi Santoso', address:'Batu', phone:'0813xxxx'}
        ];
        storage.set(storage.membersKey, members);
    }
    if(!storage.get(storage.loansKey)){
        storage.set(storage.loansKey, []);
    }
}

function byId(id){ return document.getElementById(id); }

// Books
function renderBooks(){
    const tbody = byId('books-tbody');
    if(!tbody) return;
    const books = storage.get(storage.booksKey) || [];
    tbody.innerHTML = '';
    for(const b of books){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(b.title)}</td>
            <td>${escapeHtml(b.author)}</td>
            <td>${b.year}</td>
            <td>${b.stock}</td>
            <td>
                <button class="btn edit" data-id="${b.id}">Edit</button>
                <button class="btn detail" data-id="${b.id}">Detail</button>
                <button class="btn pinjam" data-id="${b.id}">Pinjam</button>
                <button class="btn danger delete" data-id="${b.id}">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
    tbody.querySelectorAll('button.delete').forEach(btn=>btn.addEventListener('click', onDeleteBook));
    tbody.querySelectorAll('button.pinjam').forEach(btn=>btn.addEventListener('click', onPinjam));
    tbody.querySelectorAll('button.detail').forEach(btn=>btn.addEventListener('click', onDetail));
}

function onDeleteBook(e){
    const id = e.target.dataset.id;
    let books = storage.get(storage.booksKey) || [];
    books = books.filter(b=>b.id!==id);
    storage.set(storage.booksKey, books);
    renderBooks();
}

function onDetail(e){
    const id = e.target.dataset.id;
    const books = storage.get(storage.booksKey) || [];
    const b = books.find(x=>x.id===id);
    if(b) alert(`Judul: ${b.title}\nPengarang: ${b.author}\nTahun: ${b.year}\nStok: ${b.stock}`);
}

function onPinjam(e){
    const id = e.target.dataset.id;
    const books = storage.get(storage.booksKey) || [];
    const b = books.find(x=>x.id===id);
    if(!b) return alert('Buku tidak ditemukan');
    if(b.stock<=0) return alert('Stok buku habis');
    const members = storage.get(storage.membersKey) || [];
    if(members.length===0) return alert('Belum ada anggota terdaftar');
    const list = members.map(m=>`${m.id} — ${m.name}`).join('\n');
    const memberId = prompt('Pilih anggota (masukkan No. Anggota)\n\n'+list);
    if(!memberId) return;
    const member = members.find(m=>m.id===memberId.trim());
    if(!member) return alert('No. anggota tidak ditemukan');
    // check duplicate active loan
    const loans = storage.get(storage.loansKey) || [];
    const dup = loans.find(l=>l.memberId===member.id && l.bookId===b.id && !l.returned);
    if(dup) return alert('Transaksi duplikat: anggota ini sudah meminjam buku yang sama.');
    // create loan
    const loan = {id:'L'+Date.now(), memberId:member.id, bookId:b.id, date:new Date().toISOString(), returned:false};
    loans.push(loan);
    storage.set(storage.loansKey, loans);
    // decrement stock
    b.stock = Math.max(0, b.stock-1);
    const books2 = storage.get(storage.booksKey).map(x=> x.id===b.id ? b : x);
    storage.set(storage.booksKey, books2);
    alert('Peminjaman berhasil.');
    renderBooks();
}

// Members
function renderMembers(){
    const tbody = byId('members-tbody');
    if(!tbody) return;
    const members = storage.get(storage.membersKey) || [];
    tbody.innerHTML = '';
    for(const m of members){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(m.id)}</td>
            <td>${escapeHtml(m.name)}</td>
            <td>${escapeHtml(m.address||'')}</td>
            <td>${escapeHtml(m.phone||'')}</td>
            <td>
                <button class="btn edit" data-id="${m.id}">Edit</button>
                <button class="btn danger delete" data-id="${m.id}">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
    tbody.querySelectorAll('button.delete').forEach(btn=>btn.addEventListener('click', onDeleteMember));
}

function onDeleteMember(e){
    const id = e.target.dataset.id;
    let members = storage.get(storage.membersKey) || [];
    members = members.filter(m=>m.id!==id);
    storage.set(storage.membersKey, members);
    renderMembers();
}

// Forms
function setupBookForm(){
    const form = byId('book-form');
    if(!form) return;
    form.addEventListener('submit', function(ev){
        ev.preventDefault();
        const title = form.querySelector('#judul').value.trim();
        const author = form.querySelector('#pengarang').value.trim();
        const year = parseInt(form.querySelector('#tahun').value,10)||0;
        const isbn = form.querySelector('#isbn').value.trim();
        const stock = parseInt(form.querySelector('#stok').value,10)||0;
        const kategori = form.querySelector('#kategori').value;
        const books = storage.get(storage.booksKey) || [];
        const id = 'b'+(Date.now());
        books.push({id,title,author,year,isbn,stock,kategori});
        storage.set(storage.booksKey, books);
        alert('Buku disimpan');
        window.location.href = 'list.html';
    });
}

function setupMemberForm(){
    const form = byId('member-form');
    if(!form) return;
    form.addEventListener('submit', function(ev){
        ev.preventDefault();
        const name = form.querySelector('#nama').value.trim();
        const no = form.querySelector('#no_anggota').value.trim();
        const address = form.querySelector('#alamat').value.trim();
        const phone = form.querySelector('#no_hp').value.trim();
        const members = storage.get(storage.membersKey) || [];
        if(members.find(m=>m.id===no)) return alert('No. anggota sudah ada');
        members.push({id:no,name,address,phone});
        storage.set(storage.membersKey, members);
        alert('Anggota disimpan');
        window.location.href = 'list.html';
    });
}

// Utils
function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/[&<>\"']/g, function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
    });
}

function init(){
    initSampleData();
    renderBooks();
    renderMembers();
    setupBookForm();
    setupMemberForm();
    setupMobileMenu();
}

document.addEventListener('DOMContentLoaded', init);

// Mobile menu overlay: clone header nav links and show as overlay when hamburger clicked
function setupMobileMenu(){
    const label = document.querySelector('.nav-toggle-label');
    if(!label) return;
    // create overlay element
    let overlay = document.querySelector('.mobile-menu-overlay');
    if(!overlay){
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        const menu = document.createElement('div');
        menu.className = 'menu';
        overlay.appendChild(menu);
        document.body.appendChild(overlay);
    }

    // function to populate menu from header nav (keeps relative links)
    function populateMenu(){
        const menu = overlay.querySelector('.menu');
        menu.innerHTML = '';
        const nav = document.querySelector('header nav');
        if(!nav) return;
        const links = nav.querySelectorAll('a');
        links.forEach(a=>{
            const a2 = document.createElement('a');
            a2.href = a.getAttribute('href');
            a2.textContent = a.textContent.trim();
            a2.addEventListener('click', ()=> overlay.classList.remove('show'));
            menu.appendChild(a2);
        });
    }

    populateMenu();

    // toggle overlay on label click
    label.addEventListener('click', function(ev){
        // prevent double toggles when checkbox handling exists
        ev.preventDefault();
        overlay.classList.toggle('show');
    });

    // close when clicking outside menu
    overlay.addEventListener('click', function(ev){
        if(ev.target === overlay) overlay.classList.remove('show');
    });
}
