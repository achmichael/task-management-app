# Dokumentasi Frontend Aplikasi Task Management

## Gambaran Umum

Aplikasi ini adalah sistem manajemen tugas (task management) yang dibangun menggunakan React.js. Aplikasi ini menyediakan antarmuka pengguna yang interaktif untuk mengelola tugas-tugas, melihat kalender, dan menangani autentikasi pengguna. Dengan memanfaatkan berbagai library modern, aplikasi ini menawarkan pengalaman pengguna yang mulus dan responsif.

## Teknologi yang Digunakan

1. **@react-oauth/google** (^0.12.1)
   - Deskripsi: Library untuk implementasi OAuth dengan Google dalam aplikasi React.
   - [Dokumentasi @react-oauth/google](https://github.com/MomenSherif/react-oauth)

2. **axios** (^1.7.2)
   - Deskripsi: Client HTTP berbasis promise untuk browser dan node.js.
   - [Dokumentasi Axios](https://axios-http.com/docs/intro)

3. **bootstrap** (^5.3.3)
   - Deskripsi: Framework CSS populer untuk membangun antarmuka yang responsif.
   - [Dokumentasi Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

4. **dotenv** (^16.4.5)
   - Deskripsi: Modul untuk memuat variabel lingkungan dari file .env ke process.env.
   - [Dokumentasi dotenv](https://github.com/motdotla/dotenv#readme)

5. **feather-icons** (^4.29.2)
   - Deskripsi: Kumpulan ikon SVG open source yang simpel dan elegan.
   - [Dokumentasi Feather Icons](https://feathericons.com/)

6. **jwt-decode** (^4.0.0)
   - Deskripsi: Library untuk men-decode JSON Web Tokens.
   - [Dokumentasi jwt-decode](https://github.com/auth0/jwt-decode#readme)

7. **moment** (^2.30.1)
   - Deskripsi: Library untuk parsing, validasi, manipulasi, dan formatting tanggal.
   - [Dokumentasi Moment.js](https://momentjs.com/docs/)

8. **react** (^18.3.1)
   - Deskripsi: Library JavaScript untuk membangun antarmuka pengguna.
   - [Dokumentasi React](https://react.dev/docs/getting-started)

9. **react-calendar** (^5.0.0)
   - Deskripsi: Komponen kalender fleksibel untuk React.
   - [Dokumentasi react-calendar](https://github.com/wojtekmaj/react-calendar#readme)

10. **react-dom** (^18.3.1)
    - Deskripsi: Entrypoint untuk DOM dan server renderer untuk React.
    - [Dokumentasi React DOM](https://react.dev/reference/react-dom)

11. **react-router-dom** (^6.25.1)
    - Deskripsi: Bindings DOM untuk React Router.
    - [Dokumentasi React Router](https://reactrouter.com/en/main)

12. **sweetalert2** (^11.12.3)
    - Deskripsi: Library untuk membuat popup alert yang menarik dan responsif.
    - [Dokumentasi SweetAlert2](https://sweetalert2.github.io/)

13. **xlsx** (^0.18.5)
    - Deskripsi: Parser dan penulis untuk berbagai format spreadsheet.
    - [Dokumentasi SheetJS](https://docs.sheetjs.com/)

## Struktur Routing

Aplikasi menggunakan `react-router-dom` untuk manajemen routing. Berikut adalah rute-rute yang didefinisikan:

1. **Landing Page** (`/`)
   - Halaman utama aplikasi yang ditampilkan kepada pengguna yang belum login.

2. **Login Page** (`/auth/login`)
   - Halaman untuk pengguna melakukan login ke dalam aplikasi.

3. **Register Page** (`/register`)
   - Halaman untuk pengguna baru mendaftar ke aplikasi.

4. **Dashboard** (`/dashboard`)
   - Halaman utama setelah pengguna berhasil login, menampilkan ringkasan tugas dan informasi penting lainnya.

5. **Calendar Page** (`/calendar`)
   - Halaman yang menampilkan kalender dan memungkinkan pengguna melihat tugas berdasarkan tanggal.

6. **Forgot Password** (`/forgot-password`)
   - Halaman untuk pengguna yang lupa password dan ingin mereset.

7. **Reset Password** (`/reset-password`)
   - Halaman untuk pengguna memasukkan password baru setelah menerima link reset.

8. **Resend Verification Code** (`/resend-verification-code`)
   - Halaman untuk pengguna meminta pengiriman ulang kode verifikasi.

## Fitur Utama

1. **Manajemen Tugas**
   - Membuat, mengedit, dan menghapus tugas.
   - Melihat tugas dalam tampilan Tabel.
   - Bisa mengedit status tugas sesuai kondisi.

2. **Autentikasi Pengguna**
   - Registrasi pengguna baru.
   - Login dengan email dan password.
   - Integrasi login dengan Google OAuth.
   - Fitur lupa password dan reset password.
   - Fitur Kirim Ulang Kode Verifikasi

3. **Kalender Interaktif**
   - Melihat acara dalam tampilan kalender.
   - Menambah dan mengedit acara langsung dari kalender.
   - Jika acara sudah dekat, atau sudah mencapai waktunya, maka akan di lakukan pengiriman alamat email notifikasi ke alamat email pengguna

4. **Dashboard Personalisasi**
   - Ringkasan tugas yang harus diselesaikan.
   - Tabel aktivitas pengguna.

5. **Responsivitas**
   - Desain responsif yang bekerja di berbagai ukuran layar.

## Panduan Pengembangan

1. **Persiapan Lingkungan**
   - Pastikan Node.js dan npm terinstal di sistem Anda.
   - Clone repositori proyek dari version control system.

    ```
    git clone https://github.com/achmichael/task-management-app/front-end
    ```

    - Masuk Direktori

    ```
    cd front-end
    ```
    
2. **Instalasi Dependensi**

```
npm install
```

3. **Konfigurasi Environment**
- Salin file `.env.example` menjadi `.env`
- Sesuaikan variabel lingkungan yang diperlukan.

4. **Menjalankan Aplikasi dalam Mode Development**

```
npm run dev
```

5. **Building untuk Production**

```
npm run build
```

## Best Practices

- Gunakan hooks React untuk manajemen state dan efek samping.
- Terapkan pemisahan concerns dengan memisahkan logika bisnis dari komponen UI.
- Manfaatkan lazy loading untuk optimasi performa.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

1. Clone repositori
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## Kontak

Instagram - [@ahmdmichael](https://www.instagram.com/ahmdmichael?igsh=NXdqcmoycGVyZHF4)

Project Link: [https://github.com/achmichael/task-management-app/front-end](https://github.com/achmichael/task-management-app/front-end)

