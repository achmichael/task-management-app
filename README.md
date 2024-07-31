# Task Management Application

## Deskripsi Proyek

Aplikasi Task Management ini adalah solusi komprehensif untuk pengelolaan tugas yang menggabungkan frontend React.js yang responsif dengan backend Node.js yang kuat. Aplikasi ini dirancang untuk membantu pengguna mengorganisir, melacak, dan mengelola tugas-tugas mereka secara efisien.

## Fitur Utama

- Autentikasi pengguna (login, registrasi, reset password)
- Dashboard personal dengan ringkasan tugas
- Manajemen tugas (CRUD operations)
- Kalender interaktif untuk visualisasi tugas
- Integrasi dengan Google OAuth
- Pengiriman email untuk verifikasi dan notifikasi
- RESTful API untuk komunikasi frontend-backend
- Keamanan tingkat lanjut (enkripsi password, rate limiting, CORS)

## Teknologi yang Digunakan

### Frontend
- React.js
- React Router
- Axios
- Bootstrap
- @react-oauth/google
- react-calendar
- SweetAlert2
- Moment.js

### Backend
- Node.js
- Express.js
- Prisma ORM
- JSON Web Tokens (JWT)
- Bcrypt
- Nodemailer
- Express Rate Limit

## Instalasi dan Pengaturan

### Prasyarat
- Node.js (v14 atau lebih baru)
- npm
- Database (PostgreSQL, MySQL, atau SQLite)

### Langkah-langkah

1. Clone repositori

```
git clone https://github.com/achmichael/task-management-app.git
```

2. Masuk Direktori

```
cd task-management-app
```

3. Setup Backend

- Masuk Direktori Backend

```
cd back-end
```
- Install Dependensi

```
npm install
```

Edit File .env sesuai konfigurasi database anda

- Jalankan Migrasi Database dengan prisma

```
npx prisma migrate dev --name name-migrations
```

- Jalankan Server

```
npm run start
```

4. Setup front-end

- Masuk Direktori Frontend

```
cd ../front-end
```

- Install Dependensi

```
npm install
```

Edit File .env jika diperlukan

- Jalankan Aplikasi

```
npm run dev
```

5. Akses Aplikasi di browser : http://localhost:5173

## Konfigurasi

### Backend
Konfigurasi backend dapat diatur melalui file `.env` di folder backend:
- `DATABASE_URL`: URL koneksi database
- `JWT_SECRET`: Secret key untuk JWT
- `EMAIL_USER` : Email Untuk Pengiriman Alamat Email ke user
- `PASSWORD_USER` : Password Aplikasi untuk pihak ketiga

### Frontend
Konfigurasi frontend dapat diatur melalui file `.env` di folder frontend:
- `VITE_GOOGLE_CLIENT_ID`: Googlee Client ID digunakan untuk menggunakan fitur google OAuth 
- `VITE_GOOGLE_CLIENT_SECRET`: Google Client Secret untuk integrasi Google OAuth

## API Endpoints
`BASE URL` : http://localhost:3000/api
- `POST /register`: Registrasi pengguna baru
- `POST /auth/login`: Login pengguna
- `POST /auth/logout`: Logout pengguna
- `POST /user/forgot-password`: Request Reset Password
- `GET /tasks`: Mendapatkan semua daftar tugas
- `POST /tasks`: Membuat tugas baru
- `PUT /user/tasks/:task_id`: Mengupdate tugas user
- `DELETE /api/tasks/:task_id`: Menghapus tugas user
- `patch /user/tasks/:task_id` : Mengedit Sebagian Field Tugas

- `GET /user/events`: Mendapatkan daftar acara user

- `GET /user/events/notifications` : Mendapatkan Notifikasi Event yang akan datang atau sudah tiba waktunya/

- `GET /user/events/:event_id` : Mendapatkan Event user dengan id tertentu

- `PUT /user/events/:event_id` : Mengupdate Sebagian field pada event

-  `DELETE /user/events/:event_id` : Menghapus event berdasarkan id

## Keamanan

- Enkripsi password menggunakan bcrypt
- Autentikasi menggunakan JSON Web Tokens
- Rate limiting untuk mencegah brute-force attacks
- CORS dikonfigurasi untuk membatasi akses dari domain yang tidak diizinkan