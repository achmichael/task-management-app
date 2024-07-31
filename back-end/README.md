# Dokumentasi Backend Aplikasi

## Gambaran Umum

Aplikasi backend ini dibangun menggunakan Node.js dengan Express.js sebagai framework utama. Aplikasi ini bertanggung jawab untuk mengelola permintaan (request) dari aplikasi client, memproses data, berinteraksi dengan database, dan mengirimkan respons kembali ke client.

Aplikasi ini menggunakan arsitektur RESTful API untuk berkomunikasi dengan client. Setiap rute (route) yang didefinisikan menangani jenis permintaan tertentu, seperti autentikasi pengguna, manajemen tugas, dan pengelolaan acara.

Backend ini juga menerapkan berbagai fitur keamanan seperti autentikasi JWT, enkripsi password, dan pembatasan laju permintaan (rate limiting) untuk melindungi API dari penyalahgunaan.

## Langkah-langkah Instalasi

Untuk menginstal dan menjalankan API ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1. **Prasyarat**
   - Pastikan Node.js (versi 14 atau lebih baru) dan npm terinstal di sistem Anda.
   - Pastikan Anda memiliki database yang kompatibel dengan Prisma (misalnya PostgreSQL, MySQL, atau SQLite).

2. **Clone Repository**

```
https://github.com/achmichael/task-management/back-end
```

3. **Masuk Folder yang sudah di clone**

```
cd backend
```
4. **Install Dependensi**

```
npm install
```

5. **Konfigurasi Environment**
- Salin file `.env.example` menjadi `.env`
- Isi variabel lingkungan yang diperlukan di file `.env`, termasuk konfigurasi database dan secret key untuk JWT.

6. **Setup Database**
- Jika menggunakan Prisma, jalankan migrasi database:
  ```
  npx prisma migrate dev
  ```

7. **Jalankan Server**
- Untuk mode development:
  ```
  npm run start
  ```

8. **Verifikasi Instalasi**
- Buka browser atau tool API seperti Postman
- Akses `http://localhost:3000` (atau port yang Anda konfigurasi)
- Anda seharusnya melihat pesan yang mengindikasikan server berjalan

## Teknologi yang Digunakan

1. **@prisma/client** (^5.17.0)
- Deskripsi: ORM (Object-Relational Mapping) untuk berinteraksi dengan database.
- [Dokumentasi Prisma](https://www.prisma.io/docs/)

2. **bcrypt** (^5.1.1)
- Deskripsi: Library untuk mengenkripsi password.
- [Dokumentasi bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)

3. **cors** (^2.8.5)
- Deskripsi: Middleware untuk menangani Cross-Origin Resource Sharing (CORS).
- [Dokumentasi cors](https://github.com/expressjs/cors#readme)

4. **crypto** (^1.0.1)
- Deskripsi: Modul bawaan Node.js untuk fungsi kriptografi.
- [Dokumentasi crypto](https://nodejs.org/api/crypto.html)

5. **dotenv** (^16.4.5)
- Deskripsi: Modul untuk memuat variabel lingkungan dari file .env.
- [Dokumentasi dotenv](https://github.com/motdotla/dotenv#readme)

6. **express** (^4.19.2)
- Deskripsi: Framework web untuk Node.js.
- [Dokumentasi Express](https://expressjs.com/)

7. **express-rate-limit** (^7.4.0)
- Deskripsi: Middleware untuk membatasi laju permintaan ke API.
- [Dokumentasi express-rate-limit](https://github.com/nfriedly/express-rate-limit#readme)

8. **jsonwebtoken** (^9.0.2)
- Deskripsi: Implementasi JSON Web Tokens untuk autentikasi.
- [Dokumentasi jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)

9. **moment** (^2.30.1)
- Deskripsi: Library untuk parsing, validasi, manipulasi, dan formatting tanggal.
- [Dokumentasi Moment.js](https://momentjs.com/docs/)

10. **node-cron** (^3.0.3)
 - Deskripsi: Library untuk menjadwalkan tugas menggunakan sintaks cron.
 - [Dokumentasi node-cron](https://github.com/node-cron/node-cron#readme)

11. **nodemailer** (^6.9.14)
 - Deskripsi: Modul untuk mengirim email dari aplikasi Node.js.
 - [Dokumentasi Nodemailer](https://nodemailer.com/)


## Struktur Routing

Aplikasi menggunakan beberapa router untuk mengorganisir endpoint API:

1. **Authentication Router** (`/api/auth/login`) untuk login dan (`/api/register`) untuk registration dan juga (`/api/auth/logout`) untuk logout

- Menangani proses autentikasi pengguna seperti login dan registrasi dan juga logout.

2. **Forgot Password Router** (`/api/user/forgot-password`)
- Menangani proses lupa password, termasuk pengiriman email reset password.

3. **Resend Verification Code Router** (`/api/user/resend-verification-code`)
- Menangani pengiriman ulang kode verifikasi ke alamat email pengguna.

4. **Reset Password Router** (`/api/user/reset-password`)
- Menangani proses reset password setelah pengguna menerima kode verifikasi.

5. **Tasks Router** (`/api/tasks`)
- Mengelola operasi CRUD untuk tugas-tugas umum.

6. **Tasks User Router** (`/api/user/tasks`)
- Mengelola operasi CRUD untuk tugas-tugas spesifik pengguna.

7. **Events User Router** (`/api/user/events`)
- Mengelola operasi CRUD untuk acara-acara pengguna.

## Konfigurasi dan Middleware

- Aplikasi menggunakan `express.json()` untuk parsing body request JSON.
- CORS dikonfigurasi untuk mengizinkan akses dari `http://localhost:5173` (aplikasi client).
- Middleware `errorHandler` digunakan untuk menangani error secara global.
- Aplikasi berjalan di port 3000.

## Keamanan

- Menggunakan CORS untuk membatasi akses dari domain yang tidak diizinkan.
- Implementasi rate limiting untuk mencegah serangan brute-force.
- Enkripsi password menggunakan bcrypt.
- Autentikasi menggunakan JSON Web Tokens (JWT).
- Penggunaan variabel lingkungan melalui dotenv untuk konfigurasi yang aman.
