var app = new Vue({
  el: "#app",
  data: {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    stok: [
      {
        kode: "EKMA4116",
        judul: "Pengantar Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A3",
        harga: 65000,
        qty: 28,
        safety: 20,
        catatanHTML: "<em>Edisi 2024, cetak ulang</em>",
      },
      {
        kode: "EKMA4115",
        judul: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A4",
        harga: 60000,
        qty: 7,
        safety: 15,
        catatanHTML: "<strong>Cover baru</strong>",
      },
      {
        kode: "BIOL4201",
        judul: "Biologi Umum (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasiRak: "R3-B2",
        harga: 80000,
        qty: 12,
        safety: 10,
        catatanHTML: "Butuh <u>pendingin</u> untuk kit basah",
      },
      {
        kode: "FISIP4001",
        judul: "Dasar-Dasar Sosiologi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R2-C1",
        harga: 55000,
        qty: 2,
        safety: 8,
        catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder",
      },
    ],

    // FIlter untuk mencari modul
    selectedUPBJJ: "",
    selectedKategori: "",
    reorderOnly: false,
    sortBy: "",

    // Modul
    showTambahModul: false,
    showEditModul: false,

    // fitur edit
    editIndex: null,
    editData: {
      qty: 0,
      safety: 0,
    },

    // Form untuk tambah data
    formTambah: {
      kode: "",
      judul: "",
      kategori: "",
      upbjj: "",
      lokasiRak: "",
      harga: 0,
      qty: 0,
      safety: 0,
      catatanHTML: "",
    },
  },

  computed: {
    filteredStok() {
      let hasil = [...this.stok];
      hasil = hasil.filter((item) => {
        const cocokUPBJJ =
          !this.selectedUPBJJ || item.upbjj === this.selectedUPBJJ;
        const cocokKategori =
          !this.selectedKategori || item.kategori === this.selectedKategori;
        const reorder =
          !this.reorderOnly || item.qty < item.safety || item.qty === 0;
        return cocokUPBJJ && cocokKategori && reorder;
      });

      // fitur Sort
      if (this.sortBy === "judul") {
        hasil.sort((a, b) => a.judul.localeCompare(b.judul));
      }
      if (this.sortBy === "stock") {
        hasil.sort((a, b) => a.qty - b.qty);
      }
      if (this.sortBy === "harga") {
        hasil.sort((a, b) => a.harga - b.harga);
      }
      return hasil;
    },

    // DEPENDENT DROPDOWN
    kategoriFiltered() {
      if (!this.selectedUPBJJ) {
        return [];
      }
      return [
        ...new Set(
          this.stok
            .filter((item) => item.upbjj === this.selectedUPBJJ)
            .map((item) => item.kategori),
        ),
      ];
    },
  },

  methods: {
    getStatus(item) {
      if (item.qty === 0) {
        return "Kosong";
      }
      if (item.qty < item.safety) {
        return "Menipis";
      }
      return "Aman";
    },

    resetFilter() {
      this.selectedUPBJJ = "";
      this.selectedKategori = "";
      this.reorderOnly = false;
      this.sortBy = "";
    },

    tambahData() {
      if (
        !this.formTambah.kode ||
        !this.formTambah.judul ||
        !this.formTambah.kategori ||
        !this.formTambah.upbjj
      ) {
        alert("Data belum lengkap");
        return;
      }

      this.stok.push({
        ...this.formTambah,
      });

      this.formTambah = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: "",
      };
      this.showTambahModul = false;
    },

    openEditModul(index) {
      this.editIndex = index;
      this.editData = {
        qty: this.stok[index].qty,
        safety: this.stok[index].safety,
      };
      this.showEditModul = true;
    },

    simpanEdit() {
      this.stok[this.editIndex].qty = this.editData.qty;
      this.stok[this.editIndex].safety = this.editData.safety;
      this.showEditModul = false;
    },
  },
});
