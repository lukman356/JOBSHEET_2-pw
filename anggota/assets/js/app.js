// app.js - Mengelola data Buku dan Anggota menggunakan localStorage
// Halaman yang didukung:
// - buku/daftar.html (render daftar buku, edit, hapus)
// - buku/tambah.html (tambah/edit buku)
// - anggota/daftar.html (render daftar anggota, edit, hapus)
// - anggota/tambah.html (tambah/edit anggota)

(function(){
    // Helpers
    const qs = s => document.querySelector(s);
    const qsa = s => Array.from(document.querySelectorAll(s));

    // LocalStorage keys
    const BOOKS_KEY = 'simpus_books';
    const MEMBERS_KEY = 'simpus_members';

    // Default seed data
    const defaultBooks = [
        {judul: 'Laskar Pelangi', pengarang: 'Andrea Hirata', tahun: 2005, stok: 4, isbn: '', kategori: 'fiksi'},
        {judul: 'Bumi Manusia', pengarang: 'Pramoedya Ananta Toer', tahun: 1980, stok: 2, isbn: '', kategori: 'fiksi'},
        {judul: 'Negeri 5 Menara', pengarang: 'Ahmad Fuadi', tahun: 2009, stok: 0, isbn: '', kategori: 'fiksi'},
        {judul: 'Filosofi Teras', pengarang: 'Henry Manampiring', tahun: 2018, stok: 5, isbn: '', kategori: 'non-fiksi'},
        {judul: 'Ronggeng Dukuh Paruk', pengarang: 'Ahmad Tohari', tahun: 1982, stok: 1, isbn: '', kategori: 'fiksi'}
    ];

    const defaultMembers = [
        {no: 'A001', nama: 'Siti Aminah', alamat: 'Malang', hp: '0812xxxx'},
        {no: 'A002', nama: 'Budi Santoso', alamat: 'Batu', hp: '0813xxxx'}
    ];

    // Storage helpers
    function load(key, fallback){
        const raw = localStorage.getItem(key);
        if(!raw){
            localStorage.setItem(key, JSON.stringify(fallback || []));
            return JSON.parse(JSON.stringify(fallback || []));
        }
        try { return JSON.parse(raw); } catch(e){ return fallback || []; }
    }
    function save(key, data){ localStorage.setItem(key, JSON.stringify(data)); }

    // BOOKS
    function renderBooks(){
        const tbody = qs('#books-tbody');
        if(!tbody) return;
        const books = load(BOOKS_KEY, defaultBooks);
        tbody.innerHTML = '';
        books.forEach((b, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(b.judul)}</td>
                <td>${escapeHtml(b.pengarang)}</td>
                <td>${b.tahun}</td>
                <td>${b.stok}</td>
                <td>
                    <button data-edit="${i}" class="edit">Edit</button>
                    <button data-detail="${i}" class="detail">Detail</button>
                    <button data-del="${i}" class="del">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Attach handlers
        qsa('button[data-edit]').forEach(btn => btn.addEventListener('click', e => {
            const i = e.target.dataset.edit; // index
            location.href = `tambah.html?edit=${i}`;
        }));
        qsa('button[data-detail]').forEach(btn => btn.addEventListener('click', e => {
            const i = Number(e.target.dataset.detail);
            const books = load(BOOKS_KEY, defaultBooks);
            const b = books[i];
            if(!b) return alert('Data tidak ditemukan');
            alert(`Judul: ${b.judul}\nPengarang: ${b.pengarang}\nTahun: ${b.tahun}\nStok: ${b.stok}\nISBN: ${b.isbn || '-'}\nKategori: ${b.kategori}`);
        }));
        qsa('button[data-del]').forEach(btn => btn.addEventListener('click', e => {
            const i = Number(e.target.dataset.del);
            if(!confirm('Hapus data buku ini?')) return;
            const books = load(BOOKS_KEY, defaultBooks);
            books.splice(i,1);
            save(BOOKS_KEY, books);
            renderBooks();
        }));
    }

    function handleBookForm(){
        const form = qs('#book-form');
        if(!form) return;
        const params = new URLSearchParams(location.search);
        const editIndex = params.has('edit') ? Number(params.get('edit')) : null;
        const books = load(BOOKS_KEY, defaultBooks);
        if(editIndex !== null && books[editIndex]){
            // populate
            form.judul.value = books[editIndex].judul;
            form.pengarang.value = books[editIndex].pengarang;
            form.tahun.value = books[editIndex].tahun;
            form.isbn.value = books[editIndex].isbn || '';
            form.stok.value = books[editIndex].stok;
            form.kategori.value = books[editIndex].kategori || 'fiksi';
            qs('button[type="submit"]').textContent = 'Perbarui';
        }

        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = {
                judul: form.judul.value.trim(),
                pengarang: form.pengarang.value.trim(),
                tahun: Number(form.tahun.value) || 0,
                isbn: form.isbn.value.trim(),
                stok: Number(form.stok.value) || 0,
                kategori: form.kategori.value
            };
            if(editIndex !== null && books[editIndex]){
                books[editIndex] = data;
            } else {
                books.push(data);
            }
            save(BOOKS_KEY, books);
            location.href = 'daftar.html';
        });
    }

    // MEMBERS
    function renderMembers(){
        const tbody = qs('#members-tbody');
        if(!tbody) return;
        const members = load(MEMBERS_KEY, defaultMembers);
        tbody.innerHTML = '';
        members.forEach((m, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(m.no)}</td>
                <td>${escapeHtml(m.nama)}</td>
                <td>${escapeHtml(m.alamat)}</td>
                <td>${escapeHtml(m.hp)}</td>
                <td>
                    <button data-edit="${i}" class="edit">Edit</button>
                    <button data-del="${i}" class="del">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        qsa('button[data-edit]').forEach(btn => btn.addEventListener('click', e => {
            const i = e.target.dataset.edit;
            location.href = `tambah.html?edit=${i}`;
        }));
        qsa('button[data-del]').forEach(btn => btn.addEventListener('click', e => {
            const i = Number(e.target.dataset.del);
            if(!confirm('Hapus data anggota ini?')) return;
            const mem = load(MEMBERS_KEY, defaultMembers);
            mem.splice(i,1);
            save(MEMBERS_KEY, mem);
            renderMembers();
        }));
    }

    function handleMemberForm(){
        const form = qs('#member-form');
        if(!form) return;
        const params = new URLSearchParams(location.search);
        const editIndex = params.has('edit') ? Number(params.get('edit')) : null;
        const mems = load(MEMBERS_KEY, defaultMembers);
        if(editIndex !== null && mems[editIndex]){
            form.no_anggota.value = mems[editIndex].no;
            form.nama.value = mems[editIndex].nama;
            form.alamat.value = mems[editIndex].alamat;
            form.no_hp.value = mems[editIndex].hp;
            qs('button[type="submit"]').textContent = 'Perbarui';
        }
        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = {
                no: form.no_anggota.value.trim(),
                nama: form.nama.value.trim(),
                alamat: form.alamat.value.trim(),
                hp: form.no_hp.value.trim()
            };
            if(editIndex !== null && mems[editIndex]){
                mems[editIndex] = data;
            } else {
                mems.push(data);
            }
            save(MEMBERS_KEY, mems);
            location.href = 'daftar.html';
        });
    }

    // Util
    function escapeHtml(s){
        if(!s && s !== 0) return '';
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // Init
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize storage if empty
        load(BOOKS_KEY, defaultBooks);
        load(MEMBERS_KEY, defaultMembers);

        // Books pages
        if(qs('#books-tbody')){
            renderBooks();
        }
        if(qs('#book-form')){
            handleBookForm();
        }
        // Members pages
        if(qs('#members-tbody')){
            renderMembers();
        }
        if(qs('#member-form')){
            handleMemberForm();
        }
    });
})();
