var app = new Vue({
  el: "#app",
  data: {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    pengirimanList: [
      { kode: "REG", nama: "Reguler (3-5 hari)" },
      { kode: "EXP", nama: "Ekspres (1-2 hari)" },
    ],
    paket: [
      {
        kode: "PAKET-UT-001",
        nama: "PAKET IPS Dasar",
        isi: ["EKMA4116", "EKMA4115"],
        harga: 120000,
      },
      {
        kode: "PAKET-UT-002",
        nama: "PAKET IPA Dasar",
        isi: ["BIOL4201", "FISIP4001"],
        harga: 140000,
      },
    ],
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
    tracking: {
      "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          {
            waktu: "2025-08-25 10:12:20",
            keterangan: "Penerimaan di Loket: TANGSEL",
          },
          {
            waktu: "2025-08-25 14:07:56",
            keterangan: "Tiba di Hub: JAKSEL",
          },
          {
            waktu: "2025-08-26 08:44:01",
            keterangan: "Diteruskan ke Kantor Tujuan",
          },
        ],
      },
    },

    selectedPaketKode: "",
    trackingList: [],
    sequence: 2,
    form: {
      nomorDO: "",
      nim: "",
      nama: "",
      ekspedisi: "",
      tanggalKirim: "",
    },
  },

  computed: {
    selectedPaket() {
      return this.paket.find((item) => item.kode === this.selectedPaketKode);
    },
    totalHarga() {
      if (this.selectedPaket) {
        return this.selectedPaket.harga;
      }
      return 0;
    },
  },

  methods: {
    generateNomorDO() {
      const tahun = new Date().getFullYear();
      const nomor = String(this.sequence).padStart(4, "0");
      return `DO${tahun}-${nomor}`;
    },
    tambahDO() {
      if (
        !this.form.nim ||
        !this.form.nama ||
        !this.form.ekspedisi ||
        !this.selectedPaketKode ||
        !this.form.tanggalKirim
      ) {
        alert("Semua data harus diisi");
        return;
      }
      this.trackingList.push({
        nomorDO: this.form.nomorDO,
        nim: this.form.nim,
        nama: this.form.nama,
        ekspedisi: this.form.ekspedisi,
        paket: this.selectedPaket.kode,
        tanggalKirim: this.form.tanggalKirim,
        total: this.totalHarga,
        status: "Diproses",
      });
      this.sequence++;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        nomorDO: this.generateNomorDO(),
        nim: "",
        nama: "",
        ekspedisi: "",
        tanggalKirim: new Date().toISOString().split("T")[0],
      };
      this.selectedPaketKode = "";
    },

    loadTrackingDummy() {
      for (const key in this.tracking) {
        this.trackingList.push({
          nomorDO: key,
          nim: this.tracking[key].nim,
          nama: this.tracking[key].nama,
          ekspedisi: this.tracking[key].ekspedisi,
          paket: this.tracking[key].paket,
          tanggalKirim: this.tracking[key].tanggalKirim,
          total: this.tracking[key].total,
          status: this.tracking[key].status,
        });
      }
    },
  },

  mounted() {
    this.form.nomorDO = this.generateNomorDO();
    this.form.tanggalKirim = new Date().toISOString().split("T")[0];
    this.loadTrackingDummy();
  },
});
