import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card} from '../../components';
import {USER_GET_ADMIN_INFO} from '../../helpers/firebase';
import {Typo} from '../../styles';

const MenuScreen = ({navigation, route}) => {
  const [adminData, setAdminData] = React.useState();
  const KEY = route?.params?.key;

  React.useEffect(() => {
    getAdminData();
  }, []);

  async function getAdminData() {
    const data = await USER_GET_ADMIN_INFO();

    if (data) {
      setAdminData(data);
    }
  }

  React.useLayoutEffect(() => {
    function _getTitle() {
      switch (KEY) {
        case 'faq':
          return 'FAQ';
          break;
        case 'kebijakanprivasi':
          return 'Kebijakan Privasi';
          break;
        case 'tacs':
          return 'Ketentuan dan Kebijakan Layanan';
          break;
        case 'kontak':
          return 'Kontak';
          break;
        default:
          return '';
          break;
      }
    }

    navigation.setOptions({
      title: _getTitle(),
    });
  }, []);

  function renderFAQ() {
    const faq = [
      {
        q: 'Saya berada diluar kota apakah bisa daftar?',
        answer:
          'Bisa mendaftar dan akan kami approve, tapi jika ada akhwat yang cocok dan akan nadzor (bertemu calon pasangan) silahkan ke Kota Akhwat.',
      },
      {
        q: 'CV bisa terbaca akhwat dalam bentuk apa?',
        answer:
          'CV hanya bisa dibaca melalui Apps dan untuk keamanan privasi di apps kami buat tidak bisa screenshot CV',
      },
      {
        q: 'Setelah menerima CV bisa apa saja?',
        answer:
          'Pastikan : \n1. Sudah dibaca CV calon pasangan \n2. Foto yang sebelumnya Blur akan Terlihat. \n- Dan Jika setelah liat foto tidak cocok, bisa menolak. Tombol menolak ada dibawah. Dan beri alasan menolak \n- Jika cocok, bersiap melakukan nadzor (bertemu calon pasangan) dengan menghubungi admin taaruf \n3. Kemudian admin akan infokan tanggal yang diminta oleh akhwat untuk nadzor (bertemu calon pasangan)',
      },
      {
        q: 'Bagaimana tahapan setelah memutuskan bersiap untuk nadzor?',
        answer:
          'Setelah bersiap untuk nadzor, Ikhwan menunggu keputusan Akhwat. Tanggal nadzor diajukan oleh Akhwat, lalu admin akan mengkonfirmasi ke Ikhwan untuk tanggal yang diajukan, hingga menemui kesepakatan untuk tanggal nadzor (bertemu calon pasangan)',
      },
      {
        q: 'Apakah ada pembayaran?',
        answer:
          'Ada, Kenapa sih berbayar? Untuk menjaga komitemen dan keseriusan proses taaruf agar aplikasi tidak di gunakan untuk perminan. \ndapat apa saja ?\n bisa mengajukan 5 cv setiap bulan\n cv yang di ajukan tidak hilang selama 3 bulan\n unlimited menerima pengajuan cv\n tidak dikenakan infaq pembayaran di bulan berikutnya\n akun premium akan hangus setelah nadzor\n dapat melihat cv yang memfavoritkan\n pendampingan admin taaruf secara online saat taaruf\nUntuk apa biayanya ?\n akomodasi admin selama proses taaruf\n maintenance server dan pengembangan aplikasi\n operasional tim',
      },
      {
        q: 'Apakah Data saya aman?',
        answer:
          'InsyaAllah Sangat Aman secara teknis dan komitmen dari kami untuk selalu menjaga kerahasiaan Datanya. Foto akan blur dan tidak bisa dilihat oleh oleh lawan jenis jika belum sama-sama menerima CV. KTP hanya untuk tim Admin mempermudah verifikasi data. \nJika setelah mendaftar kemudian akun telah aktif, akun akan bisa di non aktifkan melalui aplikasi.',
      },
      {
        q: 'Bagaimana kita tahu cocok tidaknya calon, jika dilihat dari CV saja?',
        answer:
          "fungsi ta'aruf untuk berkenalan, di aplikasi akan ada tips mengenali calon pasangan. jika tidak cocok setelah ta'aruf beri alasan menolak dan bisa memilih calon pasangan lainnya kembali.",
      },
      {
        q: 'Apakah wajib upload foto?',
        answer:
          "upload foto wajib, tapi tidak bisa dilihat pendaftar lain dan di apps otomatis langsung blur (seperti video alur prosea ta'aruf) Kenapa upload foto wajib? untuk validasi admin approve CV waktu mendaftar,Mitra saat bertemu, dan dilihat calon pasangan yang telah diterima CV dan akan diajak ta'aruf.",
      },
      {
        q: 'CV bisa terbaca  dalam bentuk apa?',
        answer:
          'CV hanya bisa dibaca melalui Apps dan untuk keamanan privasi di apps kami buat tidak bisa screenshot CV',
      },
      {
        q: 'Setelah menerima CV bisa apa saja?',
        answer:
          "Pastikan \n1. Sudah dibaca CV calon pasangan \n2. Jika setelah liat foto tidak cocok, bisa menolak. Tombol menolak ada dibawah. Jika cocok bersiap melakukan nadzor (bertemu calon pasangan)\n3. Memberi tahu orang tua atau wali jika akan melakukan nadzor (bertemu calon pasangan) dengan diperlihatkan CV calon pasangan.\n4. Memberikan alamat rumah akhwat dan titik lokasi via whatsapp admin ta'aruf\n5. Menentukan tanggal ta'aruf. Biasanya hari sabtu/minggu\n6. Jangan lupa liat video kajian tentang nadzor.",
      },
      {
        q: 'Berapa lama baiknya setelah nadzor ke proses khitbah?',
        answer:
          'Disarankan waktu pernikahan jangan terlalu lama, karena khawatir was was syetan dapat mengubah perasaan yang sudah mantap. Baiknya paling lama 3 bulan. Lebih cepat lebih baik.',
      },
      {
        q: 'Berapa lama memutuskan bersiap untuk nadzor?',
        answer:
          'Paling lama 2 minggu untuk memutuskan bersiap untuk nadzor atau tidak.',
      },
    ];
    return (
      <>
        <Text style={[styles.textSubtitle, {marginBottom: 24}]}>
          Pertanyaan Yang Sering Ditanyakan
        </Text>
        {faq.map((item, index) => {
          return (
            <Card style={{marginBottom: 14}}>
              <Text style={styles.textQ}>{item?.q}</Text>
              <Text style={styles.textA}>{item?.answer}</Text>
            </Card>
          );
        })}
      </>
    );
  }

  function renderKebijakanPrivasi() {
    return (
      <>
        <Text style={styles.textA}>
          <Text style={styles.textQ}>kebijakan dan privasi</Text>
          {'\n\n'}Aplikasi taaruf ini merupakan aplikasi yang berbasis android.
          Halaman ini memberi tahu Anda tentang kebijakan kami mengenai
          pengumpulan, penggunaan, dan pengungkapan data pribadi saat Anda
          menggunakan Layanan kami dan pilihan yang telah Anda kaitkan dengan
          data itu. Kebijakan Privasi kami menggunakan data Anda untuk
          menyediakan dan meningkatkan Layanan. Dengan menggunakan Layanan, Anda
          menyetujui pengumpulan dan penggunaan informasi sesuai dengan
          kebijakan ini. Kecuali dalam Kebijakan Privasi ini, istilah yang
          digunakan dalam Kebijakan Privasi ini memiliki arti yang sama seperti
          dalam Syarat dan Ketentuan kami. {'\n\n'}
          <Text style={styles.textQ}>Penggunaan dan Pengumpulan Informasi</Text>
          {'\n\n'}Kami memberikan perlindungan atas setiap informasi tentang
          data pribadi yang Anda berikan ketika pembuatan CV. Kami tidak
          menampilkan data pribadi Anda seperti nomor hp, alamat serta foto yang
          ditampilkan adalah blur. Kami juga tidak menjual, memberikan data
          pribadi Anda kepada pihak ketiga tanpa ada alasan apapun, kecuali
          diminta oleh pihak berwenang untuk kepentingan hukum dan penyidikan
          dengan membawa surat perintah yang sah. Tujuan utama kami dalam
          mengumpulkan informasi pribadi adalah untuk menyediakan informasi
          tentang profil Anda dengan baik, efisien, dan disesuaikan. Hal ini
          memungkinkan kami untuk menyediakan layanan dan fitur yang paling
          mungkin memenuhi kebutuhan Anda. Anda setuju bahwa untuk membantu
          pengguna kami untuk mencari calon pasangannya kami akan menampilkan
          informasi profil Anda dengan tidak mencantumkan informasi pribadi
          seperti nomor hp, alamat serta foto yang ditampilkan adalah blur.
          {'\n\n'}
          <Text style={styles.textQ}>
            Jenis Data yang Dikumpulkan Data pribadi
          </Text>
          {'\n\n'}Saat menggunakan Layanan kami, kami meminta Anda untuk membuat
          CV yang digunakan sebagai informasi pengenal pribadi yang dapat
          digunakan untuk menghubungi atau mengidentifikasi Anda ("Data
          Pribadi"). Dalam pembuatan CV sebagai Informasi yang dapat
          diidentifikasi secara pribadi dapat mencakup pada: {'\n\n'}• Pilih
          Gender {'\n'}• Upload Foto Wajah, Seluruh Badan, dan KTP {'\n'}• Nama{' '}
          {'\n'}• Tanggal Lahir {'\n'}• Kota Domisili {'\n'}• Alamat Domisili{' '}
          {'\n'}• Kota Domisili Orang Tua {'\n'}• No Whatsapp {'\n'}• Email{' '}
          {'\n'}• Password {'\n'}• Pekerjaan {'\n'}• Pendidikan Terakhir {'\n'}•
          Riwayat Pendidikan {'\n'}• Status {'\n'}• Tinggi Badan {'\n'}• Berat
          Badan {'\n'}• Melakukan Ibadah {'\n'}• Kriteria Yang Diinginkan {'\n'}
          • Deskripsi singkat tentang diri {'\n'}• Hobby {'\n'}• Anak Ke {'\n'}•
          Suku
          {'\n'}• Warna Kulit {'\n'}• Riwayat Penyakit {'\n'}• Organisasi atau
          komunitas yang diikuti {'\n'}• Kelebihan Diri {'\n'}• Kekurangan Diri
          {'\n'}• Aktivitas Harian {'\n'}• Visi Misi Pernikahan {'\n'}•
          Pertanyaan 1 {'\n'}• Pertanyaan 2 {'\n'}• Pertanyaan 3 {'\n\n'}
          <Text style={styles.textQ}>Data Penggunaan</Text>
          {'\n\n'}Kami juga dapat mengumpulkan informasi yang dikirimkan browser
          Anda setiap kali Anda mengunjungi Layanan kami atau ketika Anda
          mengakses Layanan dengan atau melalui perangkat seluler ("Data
          Penggunaan"). Data Penggunaan ini dapat mencakup informasi seperti
          alamat Protokol Internet komputer Anda (mis. Alamat IP), jenis
          browser, versi browser, halaman Layanan kami yang Anda kunjungi, waktu
          dan tanggal kunjungan Anda, waktu yang dihabiskan untuk
          halaman-halaman itu, unik pengidentifikasi perangkat dan data
          diagnostik lainnya. Ketika Anda mengakses Layanan dengan atau melalui
          perangkat seluler, Data Penggunaan ini dapat mencakup informasi
          seperti jenis perangkat seluler yang Anda gunakan, ID unik perangkat
          seluler Anda, alamat IP perangkat seluler Anda, sistem operasi seluler
          Anda, jenis Browser Internet seluler yang Anda gunakan,
          pengidentifikasi perangkat unik, dan data diagnostik lainnya.
          {'\n\n'}
          <Text style={styles.textQ}>Pelacakan & Data Cookie</Text>
          {'\n\n'}Kami menggunakan cookie dan teknologi pelacakan serupa untuk
          melacak aktivitas di Layanan kami dan menyimpan informasi tertentu.
          Cookie adalah file dengan sedikit data yang dapat menyertakan
          pengidentifikasi unik anonim. Cookie dikirim ke browser Anda dari
          situs web dan disimpan di perangkat Anda.Teknologi pelacakan yang juga
          digunakan adalah suar, tag, dan skrip untuk mengumpulkan dan melacak
          informasi dan untuk meningkatkan dan menganalisis Layanan kami. Anda
          dapat menginstruksikan browser Anda untuk menolak semua cookie atau
          untuk menunjukkan kapan cookie dikirim. Namun, jika Anda tidak
          menerima cookie, Anda mungkin tidak dapat menggunakan sebagian Layanan
          kami. {'\n\n'}Contoh Cookie yang kami gunakan: {'\n\n'}• Cookie Sesi.
          Kami menggunakan Cookie Sesi untuk mengoperasikan Layanan kami. {'\n'}
          • Cookie Pilihan. Kami menggunakan Cookie Preferensi untuk mengingat
          preferensi Anda dan berbagai pengaturan. {'\n'}• Cookie Keamanan. Kami
          menggunakan Cookie Keamanan untuk tujuan keamanan. {'\n\n'}
          <Text style={styles.textQ}>Penggunaan Data</Text>
          {'\n\n'}
          Ta’aruf Online Indonesia menggunakan data yang dikumpulkan untuk
          berbagai keperluan: {'\n\n'}• Kelola akun Anda dan berikan Anda
          dukungan pelanggan; melakukan penelitian dan analisi tentang
          penggunaan Anda, atau minat anda terhadap Pengguna lain. {'\n'}•
          Berkomunikasi dengan Pengguna melalui email dan / atau perangan
          seluler lainnya tentang Layanan kami. {'\n'}• Untuk verifikasi
          kelayakan CV yang Anda buat. {'\n'}• Untuk memberitahukan Anda tentang
          perubahan didalam pelayanan kami {'\n'}• Untuk memungkinkan Anda
          berpartisipasi dalam fitur interaktif Layanan kami ketika Anda memilih
          untuk melakukannya. {'\n'}• Untuk memberikan layanan dan dukungan
          pelanggan {'\n'}• Untuk memberikan analisis atau informasi berharga
          sehingga kami dapat meningkatkan Layanan {'\n'}• Untuk memantau
          penggunaan Layanan {'\n'}• Untuk mendeteksi, mencegah dan mengatasi
          masalah teknis {'\n\n'}
          <Text style={styles.textQ}>
            Dengan siapa kami membagikan informasi Anda
          </Text>
          {'\n\n'}Informasi yang Anda berikan akan dibagikan dengan Pengguna
          Lain. Ketika Anda membuat CV sebagai Anggota Ta’aruf Online Indonesia,
          profil anda akan dapat dilihat oleh pengguna Layanan lainnya, tapi
          dengan menampilkan foto dalam bentuk blur. Pengguna lain akan dapat
          melihat informasi yang anda berikan kepada kami, dengan tidak
          menampilkan data pribadi anda seperti nomor Whatsapp dan alamat anda,
          ketika Pengguna menekan profil anda maka akan muncul detail informasi
          tentang anda. {'\n\n'}
          <Text style={styles.textQ}>Keterbukaan Data</Text>
          {'\n\n'}Persyaratan resmi pengelola dapat mengungkapkan Data Pribadi
          Anda dengan itikad baik bahwa tindakan tersebut diperlukan untuk:{' '}
          {'\n\n'}• Untuk mematuhi kewajiban hukum {'\n'}• Untuk melindungi dan
          mempertahankan hak atau properti Ta’aruf Online Indonesia {'\n'}•
          Untuk mencegah atau menyelidiki kesalahan yang mungkin terjadi
          sehubungan dengan Layanan {'\n'}• Untuk melindungi keamanan pribadi
          pengguna Layanan atau publik
          {'\n'}• Untuk melindungi terhadap tanggung jawab hukum {'\n\n'}
          <Text style={styles.textQ}>Keamanan Data</Text>
          {'\n\n'}Keamanan data Anda penting bagi kami, tetapi ingat bahwa tidak
          ada metode transmisi melalui Internet, atau metode penyimpanan
          elektronik yang 100% aman. Meskipun kami berusaha untuk menggunakan
          cara yang dapat diterima secara komersial untuk melindungi Data
          Pribadi Anda, kami tidak dapat menjamin keamanan mutlaknya. {'\n\n'}
          <Text style={styles.textQ}>Penyedia jasa</Text>
          {'\n\n'}Kami dapat mempekerjakan perusahaan pihak ketiga dan individu
          untuk memfasilitasi Layanan kami ("Penyedia Layanan"), untuk
          menyediakan Layanan atas nama kami, untuk melakukan layanan terkait
          Layanan atau untuk membantu kami dalam menganalisis bagaimana Layanan
          kami digunakan. Pihak ketiga ini memiliki akses ke Data Pribadi Anda
          hanya untuk melakukan tugas-tugas ini atas nama kami dan berkewajiban
          untuk tidak mengungkapkan atau menggunakannya untuk tujuan lain apa
          pun. {'\n\n'}
          <Text style={styles.textQ}>Analisis</Text>
          {'\n\n'}Kami dapat menggunakan Penyedia Layanan pihak ketiga untuk
          memantau dan menganalisis penggunaan Layanan kami. {'\n\n'}
          <Text style={styles.textQ}>Firebase</Text>
          {'\n\n'}Firebase adalah layanan analitik yang disediakan oleh Google
          Inc. Anda dapat memilih keluar dari fitur Firebase tertentu melalui
          pengaturan perangkat seluler Anda, seperti pengaturan iklan perangkat
          Anda atau dengan mengikuti instruksi yang diberikan oleh Google dalam
          Kebijakan Privasi mereka:https://policies.google.com/privacy?hl=id
          Kami juga mendorong Anda untuk meninjau kebijakan Google untuk
          melindungi data
          Anda:https://support.google.com/analytics/answer/6004245. Untuk
          informasi lebih lanjut tentang jenis informasi apa yang dikumpulkan
          Firebase, silakan kunjungi silakan kunjungi halaman web Google Privacy
          & Terms:https://policies.google.com/privacy?hl=id {'\n\n'}
          <Text style={styles.textQ}>Tautan ke Situs Lain</Text>
          {'\n\n'}Layanan kami dapat berisi tautan ke situs lain yang tidak
          dioperasikan oleh kami. Jika Anda mengklik tautan pihak ketiga, Anda
          akan diarahkan ke situs pihak ketiga itu. Kami sangat menyarankan Anda
          untuk meninjau Kebijakan Privasi setiap situs yang Anda kunjungi. Kami
          tidak memiliki kendali atas dan tidak bertanggung jawab atas konten,
          kebijakan privasi, atau praktik situs atau layanan pihak ketiga mana
          pun. {'\n\n'}
          <Text style={styles.textQ}>Pembayaran</Text>
          {'\n\n'}Pembayaran dilakukan melalui rekening bank dengan transfer
          manual, pembayaran dilakukan ketika pengguna akan Mengajukan atau
          menerima CV. {'\n\n'}
          <Text style={styles.textQ}>Privasi anak-anak</Text>
          {'\n\n'}
          Layanan kami tidak membahas siapa pun di bawah usia 18 ("Anak-anak").
          Kami tidak secara sadar mengumpulkan informasi yang dapat
          diidentifikasi secara pribadi dari siapa pun yang berusia di bawah 18
          tahun. Jika Anda adalah orang tua atau wali dan Anda mengetahui bahwa
          Anak-anak Anda telah memberikan kepada kami Data Pribadi, silakan
          hubungi kami. Jika kami mengetahui bahwa kami telah mengumpulkan Data
          Pribadi dari anak-anak tanpa verifikasi izin orang tua, kami mengambil
          langkah-langkah untuk menghapus informasi itu dari server kami.
          {'\n\n'}
          <Text style={styles.textQ}>
            Perubahan Terhadap Kebijakan Privasi Ini
          </Text>
          {'\n\n'}Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke
          waktu. Kami akan memberi tahu Anda tentang segala perubahan dengan
          memposting Kebijakan Privasi baru di halaman ini. Kami akan memberi
          tahu Anda melalui email dan / atau pemberitahuan penting pada Layanan
          kami, sebelum perubahan menjadi efektif dan memperbarui "tanggal
          efektif" di bagian atas Kebijakan Privasi ini. Anda disarankan untuk
          meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan.
          Perubahan pada Kebijakan Privasi ini efektif ketika diposkan pada
          halaman ini.
        </Text>
      </>
    );
  }

  function renderTermd() {
    return (
      <>
        <Text style={styles.textA}>
          <Text style={styles.textQ}>Syarat dan Ketentuan</Text>
          {'\n\n'}Informasi tentang cara menggunakan layanan ini dan bagaimana
          tahapan dalam proses ta’aruf silahkan hubungi admin. Untuk mengatasi
          masalah keluhan atas layanan content aplikasi atau jika terdapat
          pertanyaan silahkan hubungi kontak yang tersedia {'\n\n'}
          <Text style={styles.textQ}>Sebelum Pendaftaran</Text>
          {'\n\n'}Bagi pengguna yang akan mendaftar untuk mencari pasangan
          disarankan untuk meluruskan niat dan ikhlaskan menikah adalah ibadah
          semata untuk mencari ridhaNya agar mendapatkan pasangan yang sesuai.
          Selain itu, diharapkan juga untuk dapat membaca dan memahami dengan
          seksama panduan yang ada di dalam aplikasi Ta’aruf Online Indonesia.
          {'\n\n'}
          <Text style={styles.textQ}>1. PENGANTAR </Text>
          {'\n\n'}• Syarat & Ketentuan ini berada di antara kita (“Perusahaan”,
          ”kami”. “Kami”, atau “milik kami”) dan Anda (“Anda”, “milik Anda”,
          atau “diri Anda”). {'\n'}• Kami dengan bangga menyediakan layanan
          personal online bagi Muslim dan Muslimah yang sedang mencari pasangan
          dengan proses Ta’aruf. {'\n'}• Syarat dan Ketentuan ini di
          kombinasikan dengan Kebijakan Privasi kami, membentuk Perjanjian yang
          mengikat secara hukum antara Anda dan Kami (“Perjanjian”). {'\n'}•
          Kami bertanggung jawab atas layanan kontent ini {'\n'}• Perjanjian,
          sebagaiamana dapat diubah dari waktu ke waktu, berlaku untuk semua
          pengguna Layanan kami. {'\n'}• Jika Anda menjadi Anggota untuk Layanan
          kami, anda dapat mengakses Layanan kami sebagaimana peran anda sebagai
          Anggota. Jika Anda memenuhi persyaratan yang diajukan oleh Perusahaan
          kami, maka Perusahaan memiliki pertimbangan membuat profil Anda
          terlihat oleh pengguna Aplikasi kami.
          {'\n'}• Perjanjian ini juga berlaku untuk penggunaan semua fitur,
          widget, plug-in, aplikasi dan / atau layanan lainnya yang Anda: {'\n'}
          • Kami memiliki dan mengendalikan dan menyediakan bagi Anda; atau{' '}
          {'\n'}• Juga memposting tautan ke Perjanjian ini. {'\n'}• Anda
          diingatkan untuk mematuhi semua hukum yang berlaku. Anda juga berjanji
          untuk tidak menggunakan Layanan kami untuk tujuan yang melanggar
          hukum, berbahaya, mengancam, kasar, melecehkan, menyiksa, memfitnah,
          vulgar, cabul, memfitnah, penuh kebencian, atau menyinggung ras atau
          etnis (atau untuk tujuan yang tidak menyenangkan). {'\n'}• Jika Anda
          melanggar Syarat & Ketentuan ini, kami dapat menghentikan akses Anda
          ke Layanan kami. {'\n\n'}
          <Text style={styles.textQ}>2. DEFINISI</Text>
          {'\n\n'} • Dalam Syarat & Ketentuan ini: {'\n'}• " Aplikasi " merujuk,
          secara individual dan kolektif, untuk masing-masing dan semua Aplikasi
          Seluler. {'\n'}• “ Anggota ” berarti setiap orang yang Keanggotaannya
          telah diterima oleh Perusahaan dan yang Keanggotaannya masih berlaku
          untuk saat ini. Istilah 'Anggota' termasuk Anggota yang belum membayar
          dan Anggota yang membayar, sesuai dengan konteksnya. {'\n'}• "
          Keanggotaan " adalah hak Anda untuk satu Layanan atau lebih
          berdasarkan menjadi Anggota. Hak tersebut dapat bervariasi tergantung
          pada apakah Keanggotaannya adalah Keanggotaan berbayar atau
          Keanggotaan tidak berbayar. {'\n'}• “ Aplikasi Seluler ” berarti
          aplikasi Android atau aplikasi perangkat lunak perangkat seluler /
          tablet lainnya yang diterbitkan oleh Perusahaan dan yang dapat
          ditawarkan dari waktu ke waktu. {'\n'}5." Kebijakan Privasi " berarti
          kebijakan privasi yang tersedia pada Layanan Kami yang dikombinasikan
          dengan Syarat & Ketentuan mewakili Perjanjian antara Anda dan
          Perusahaan. {'\n'}6." Layanan " berarti setiap dan semua layanan yang
          disediakan oleh Perusahaan dengan cara apa pun. {'\n'}7. " Syarat &
          Ketentuan " adalah syarat dan ketentuan ini yang, bersama-sama dengan
          Kebijakan Privasi, mewakili Perjanjian antara Anda dan Perusahaan,
          yang bervariasi dan sebagaimana telah diubah oleh Perusahaan dengan
          kebijaksanaan penuh kapan saja dan dipublikasikan langsung ke
          Aplikasi. {'\n'}8. “ Pengguna ” berarti setiap Anggota yang sudah
          terdaftar baik yang berbayar maupun tidak berbayar. {'\n'}9. "
          Pengunjung " berarti setiap orang yang menjelajahi Layanan. {'\n'}10.
          “ Situs web ” berarti, secara individu atau kolektif, situs web yang
          dioperasikan oleh Perusahaan. Sebagai konteks mungkin memerlukan,
          kata-kata dalam bentuk tunggal dapat dibaca sebagai jamak dan jamak
          sebagai tunggal.
          {'\n\n'}
          <Text style={styles.textQ}>
            3. PRIVASI ANDA - KOLEKSI DAN RETENSI INFORMASI PRIBADI
          </Text>
          {'\n\n'}a. Kami menjelaskan apa yang kami lakukan dan tidak lakukan
          dengan data Anda dalam Kebijakan Privasi kami . {'\n'}b. Kami tidak
          mengontrol pesan Anda, tapi kami berhak memantau pesan itu dan konten
          lainnya untuk kepatuhan dengan Syarat & Ketentuan kami (misalnya, di
          mana konten pesan Anda dilaporkan karena melanggar Syarat & Ketentuan
          kami). {'\n\n'}
          <Text style={styles.textQ}>4. AKUN DAN KEAMANAN</Text>
          {'\n\n'}a. Untuk mengakses Layanan, Anda harus memiliki akun. {'\n'}b.
          Anda harus menjaga, dan bertanggung jawab atas, kerahasiaan login dan
          kata sandi Anda. {'\n'}c. Jika diminta, Anda harus membuat CV
          identifikasi untuk memverifikasi identitas Anda. {'\n'}d. Layanan ini
          terbuka untuk semua umat muslim - tergantung pada persetujuan aplikasi
          oleh Perusahaan sesuai dengan Syarat & Ketentuan ini. {'\n'}e.
          Perusahaan mewajibkan semua Pengguna untuk mematuhi Kebijakan Privasi
          dan Syarat & Ketentuan ini, termasuk, khususnya, dengan menyetujui
          Pedoman Perilaku di Bagian 6 di bawah ini. {'\n'}f. Syarat menggunakan
          Layanan kami : {'\n'}1. Untuk menjadi pengguna Layanan kami minimal
          usia Anda adalah 19 tahun. Anak-anak tidak berhak menggunakan Layanan
          kami, dan kami meminta siapa pun yang berusia di bawah 19 tahun tidak
          mengirimkan informasi pribadi apa pun kepada kami. Layanan kami tidak
          ditujukan kepada siapa pun yang berusia di bawah 19 tahun. {'\n'}2.
          Setiap pengguna Layanan kami tidak diperbolehkan mengunggah foto yang
          memperlihatkan aurat. {'\n'}3. Setiap pengguna diharapkan memberikan
          informasi yang benar, tidak memanipulasi data terlebih lagi
          menggunakan identitas palsu/tidak benar dalam melakukan proses
          pembuatan CV. {'\n'}4. Setiap pengguna dilarang melakukan tindakan
          yang melanggar hukum atau peraturan lainnya di dalam konteks
          partisipasi pada pelayanan aplikasi yang disediakan oleh Layanan kami{' '}
          {'\n'}• Setiap pengguna dilarang untuk memakai Layanan kami sebagai
          sarana penyebarluasan pornografi serta yang berhubungan dengan
          kebencian terhadap suatu suku,agama maupun ras tertentu (isu SARA).{' '}
          {'\n'}6.Setiap pengguna bersedia untuk tidak akan menggunakan
          fasilitas Layanan kami untuk tujuan-tujuan yang ilegal, kejahatan,
          tindakan tidak bermoral, atau ketidakjujuran. {'\n'}
          7.Setiap pengguna tidak akan melakukan aktivitas tertentu yang
          menyebabkan gangguan atau menimbulkan kecemasan pada pengguna lainnya.
          {'\n\n'}
          <Text style={styles.textQ}>5. KONDISI PENDAFTARAN</Text>
          {'\n\n'}A. Anda harus menyetujui Syarat & Ketentuan ini untuk
          menggunakan Layanan kami. Mereka mengatur penggunaan Anda atas Layanan
          kami. {'\n'}B. Jika Anda tidak menerima Kebijakan Privasi dan Syarat &
          Ketentuan ini, Anda tidak berhak mengakses Layanan kami. {'\n'}C. Jika
          anda : {'\n'}1. gunakan Layanan kami; {'\n'}2. klik untuk bergabung
          dan / atau masuk; dan / atau {'\n'}3. centang lingkaran untuk
          menunjukkan Anda setuju dengan Syarat & Ketentuan ini, (seperti yang
          mungkin terjadi), kami akan menganggap ini sebagai penerimaan Anda
          terhadap Syarat & Ketentuan ini dan persetujuan Anda untuk konten
          mereka. {'\n'}D. Perusahaan berhak untuk menawarkan masuk ke Layanan
          dengan kebijakan penuh. {'\n'}E. Dengan menggunakan Layanan kami, Anda
          menyatakan dan menjamin bahwa Anda memiliki kapasitas hukum untuk
          memasuki kontrak di wilayah hukum tempat Anda tinggal.{'\n\n'}
          <Text style={styles.textQ}>6. KODE ETIK</Text>
          {'\n\n'}• Setiap pengguna berjanji untuk sepenuhnya mematuhi semua
          hukum dan peraturan yang berlaku, serta dengan Syarat & Ketentuan ini.
          {'\n'}• Setiap Pengguna berjanji untuk menahan diri dari: {'\n'}1.
          Diskriminasi atas dasar nyata atau dugaan Pengguna: usia, ras, warna
          kulit, suku bangsa, asal kebangsaan, orientasi seksual, agama,
          identitas gender, situasi keluarga, kehamilan, penampilan fisik, nama
          keluarga, keadaan kesehatan, cacat fisik, karakteristik genetik,
          pribadi keyakinan, opini politik atau kegiatan serikat; {'\n'}2.
          Menggunakan Layanan untuk tujuan profesional atau komersial, baik
          secara langsung maupun tidak langsung, termasuk menawarkan, meminta
          atau mempromosikan barang atau layanan yang dapat dikenakan biaya atau
          kompensasi finansial. Pelacuran secara resmi dilarang pada Layanan
          kami; {'\n'}3. Terlibat dalam aktivitas ilegal apa pun yang
          menggunakan Layanan kami; {'\n'}4. Memposting konten apa pun atau
          membuat pernyataan apa pun dalam bentuk apa pun yang: {'\n'}(a)
          melanggar, menyalahgunakan, atau melanggar hak paten, hak cipta, merek
          dagang, rahasia dagang, hak dagang, atau hak kekayaan intelektual
          pihak ketiga, atau hak publisitas atau privasi; {'\n'}(b) melanggar,
          atau mendorong setiap tindakan yang akan melanggar, hukum atau
          peraturan yang berlaku atau akan menimbulkan tanggung jawab perdata;
          {'\n'}(c) curang, salah, menyesatkan (secara langsung atau karena
          kelalaian atau kegagalan memperbarui informasi) atau menipu; {'\n'}(d)
          memfitnah, cabul, pornografi, vulgar atau menyinggung;
          {'\n'}(e)mempromosikan diskriminasi, fanatisme, rasisme, kebencian,
          pelecehan atau bahaya terhadap individu atau kelompok apa pun; {'\n'}
          (f) kasar atau mengancam atau mempromosikan kekerasan atau tindakan
          yang mengancam orang lain; {'\n'}(g) mempromosikan kegiatan atau zat
          ilegal atau berbahaya; {'\n'}(h) berisi tautan ke konten apa pun yang
          terkait dengan larangan di atas; dan {'\n'}(i) sebaliknya bertentangan
          dengan hukum dan peraturan yang berlaku; dan {'\n'}1. Menyebarkan
          informasi pribadi apa pun dari Pengguna lain, termasuk perincian
          kontak atau yang serupa, tanpa persetujuan Pengguna. {'\n'}A. Setiap
          Pengguna berjanji untuk melaporkan pelanggaran apa pun kepada
          Perusahaan, serta komentar atau perilaku yang tidak pantas dari
          Pengguna lain. {'\n'}B. Kami melakukan inspeksi rutin terhadap
          penggunaan Layanan kami, termasuk untuk tujuan keamanan dan
          perlindungan penipuan. Kami berhak untuk menghapus Anggota sehingga
          tidak dapat mengakses ke Layanan kami. Apabila pengguna yang tidak
          mematuhi undang-undang atau peraturan yang berlaku, atau yang
          melanggar Syarat & Ketentuan ini. {'\n'}C. Kami dapat menghubungi
          Pengguna mana pun untuk meminta agar Pengguna memperbaiki segala
          ketidakpatuhan dengan hukum atau peraturan yang berlaku, atau Syarat &
          Ketentuan ini. {'\n'}D. Kami dapat mengecualikan atau menghapus
          Pengguna apa pun dari Layanannya atas kebijakan kami sendiri dengan
          alasan apa pun, termasuk, tetapi tidak terbatas pada, setiap
          ketidakpatuhan dengan hukum atau peraturan yang berlaku atau Syarat &
          Ketentuan ini. Setelah penghentian atau penangguhan tersebut, Anda
          tidak akan berhak atas pengembalian uang dari biaya yang tidak
          digunakan untuk pembelian dalam aplikasi.
          {'\n\n'}
          <Text style={styles.textQ}>7. KONDISI AKSES</Text>
          {'\n\n'}A. Anda harus membuat CV saat mendaftar ke Layanan kami.{' '}
          {'\n'}B. Ketika Anda mendaftar, Anda akan menjadi Anggota dari Layanan
          kami. Meskipun Perusahaan atas kebijakannya dapat membuat profil Anda
          terlihat oleh Pengguna lainnya jika Anda memenuhi persyaratan, Anda
          tidak akan menjadi Anggota tanpa registrasi khusus. {'\n'}C. Nomor
          Whatsapp dan kata sandi Anda bersifat pribadi dan rahasia. {'\n'}D.
          Setiap Anggota harus merahasiakannya dan berjanji untuk tidak memberi
          tahu atau mengungkapkannya kepada pihak ketiga atau Anggota lain untuk
          mencegah penipuan atau phishing. {'\n'}E. Semua Pengguna berjanji
          untuk tidak menggunakan nomor Whatsapp atau kata sandi Anggota lain,
          atau informasi pribadi lainnya dari Pengguna lain. {'\n'}F. Setiap
          pelanggaran ketentuan ini dapat menyebabkan pembatalan Keanggotaan
          Anggota, tanpa mengurangi kewajiban yang ditimbulkan oleh Anggota
          terkait karena penggunaan nomor whatsapp dan / atau kata sandi oleh
          Anggota lain atau pihak ketiga. {'\n'}G. Setiap Anggota harus
          berhati-hati untuk tidak mengungkapkan informasi pribadi. {'\n'}H.
          Kami akan mengambil tindakan apa pun yang diperlukan untuk
          menghentikan perilaku penipuan, termasuk untuk mencegah pembagian
          nomor Whatsapp atau kata sandi yang dilarang. {'\n'}I. Kami berhak
          menghapus: {'\n'}1. informasi yang diterbitkan atau disajikan di
          Layanan selama lebih dari 36 bulan; {'\n'}2. akun Anggota yang belum
          digunakan selama lebih dari 36 bulan atau tidak pernah digunakan
          setelah masuk ke Keanggotaan, setelah verifikasi bahwa tidak ada
          langganan yang sedang berlangsung; {'\n'}• akun yang kami anggap
          duplikat ke akun lain di jaringan kami. {'\n'}• Setiap Pengguna
          berjanji untuk tidak melakukan tindakan apa pun yang mungkin
          menghambat pengoperasian Layanan dan berjanji untuk tidak menyebarkan
          atau mengatur penyebaran virus, spam, bom logika, aplikasi perangkat
          lunak, dll.{'\n\n'}
          <Text style={styles.textQ}>8. PEMBAYARAN</Text>
          {'\n\n'}A. Anggota yang akan mengajukan atau menerima CV wajib
          melakukan pembayaran sampe 3 digit terakhir, pembayaran berbeda-beda
          antara masing-masing anggota, karena terdapat nomor unik 3 digit
          terakhir. {'\n'}B. Anggota yang tidak melakukan pembayaran tidak dapat
          mengajukan ataupun menerima CV. {'\n'}C. Pembayaran dilakukan 1X
          selama menggunakan aplikasi.{'\n\n'}
          <Text style={styles.textQ}>9. MITRA</Text>
          {'\n\n'}
          Perantara yang ada di aplikasi, adalah orang-orang yang terpilih dan
          terlatih dalam proses ta'aruf dan juga orang orang yang paham terdapat
          agama Islam. Terpilih disini berarti Timsecara selektif memilih orang
          sebagai mitra (bukan dari rekruitmen terbuka). Terlatih disini sudah
          mengerti tentang SOP kami dan telah lolos uji.{'\n\n'}
          <Text style={styles.textQ}>10. KOTA DOMISILI ORANG TUA</Text>
          {'\n\n'}Bagi orang tua Akhwat yang berdomisili diluar kota, apabila
          ada Ikhwan yang mengajukan CV, maka Ikhwan bersedia untuk menyusul ke
          kota Domisili orang tua Akhwat untuk melakukan pertemuan.
          {'\n\n'}
          <Text style={styles.textQ}>Tentang Pengguna Aplikasi Ta’aruf</Text>
          {'\n\n'}Pengguna dapat diperoleh dengan mendaftarkan diri Anda dengan
          membuat CV terlebih dahulu. Anda baru dapat mengakses aplikasi setelah
          Anda membuat CV di aplikasi dan otomatis berarti Anda menyetujui
          setiap syarat dan ketentuan aplikasi yang ditetapkan oleh Tim Ta’aruf
          kami. Keaktifan Anda di aplikasi ini menandakan bahwa Anda menyetujui
          setiap perubahan ketentuan layanan. {'\n\n'}
          <Text style={styles.textQ}>Syarat-syarat pengguna:</Text>
          {'\n\n'}
          Syarat-syarat pengguna yang harus dipenuhi oleh calon pengguna {'\n'}•
          Untuk menjadi anggota, Anda harus membuat CV dengan mengisi form
          pendaftaran CV yang tersedia . {'\n'}• Harap memasukan informasi nomor
          hp aktif yang digunakan untuk aplikasi Whatsapp, karena nomor tersebut
          yang akan digunakan ketika Anda login ke aplikasi, dan sarana untuk
          berinteraksi kepada Mitra. {'\n'}• Setiap anggota diharapkan patuh
          pada segala ketentuan atau peraturan yang berlaku di Ta’aruf Online
          Indonesia. {'\n\n'}
          <Text style={styles.textQ}>
            Hak kewajiban dan tanggung jawab pengguna:
          </Text>
          {'\n\n'}• Setiap pengguna tidak diperbolehkan mengunggah foto yang
          memperlihatkan aurat. {'\n'}• Setiap pengguna tidak diperbolehkan
          memberikan pertanyaan dengan mencantumkan alamat atau nomer telfon.{' '}
          {'\n'}• Setiap pengguna diperbolehkan mengajukan CV ke calon pasangan
          sebanyak 5X dalam 1 bulan, dan dapat mengajukan kembali di bulan
          berikutnya. {'\n'}• Setiap pengguna diperbolehkan untuk memakai semua
          fasilitas maupun fitur yang telah disediakan oleh Ta’aruf Online
          Indonesia untuk tujuan tersebut diatas. {'\n'}• Setiap pengguna dapat
          mengubah CV maksimal 1 kali dalam seminggu. {'\n'}• Setiap pengguna
          diwajibkan menggunakan bahasa yang baik dan sopan dalam proses
          Ta’aruf. {'\n'}• Setiap pengguna harus melakukan pembayaran untuk
          mengajukan atau menerima CV, sesuai dengan nominal yang tercantum
          dihalaman pembayaran. {'\n'}• Setiap pengguna diharapkan menjunjung
          kode etik dengan tidak melakukan tindakan yang dapat merugikan sesama
          pengguna dan pengelola Ta’aruf Online Indonesia. {'\n'}• Setiap
          pengguna diharapkan memberikan informasi yang benar, tidak
          memanipulasi data terlebih lagi menggunakan identitas palsu/tidak
          benar dalam melakukan proses pembuatan CV. {'\n'}• Setiap pengguna
          tidak akan melakukan aktivitas yang melanggar kerahasiaan dan hak-hak
          pribadi pengguna lainnya. {'\n\n'}
          <Text style={styles.textQ}>
            Hak kewajiban dan tanggung jawab pengelola :
          </Text>
          {'\n\n'}• Pihak pengelola tidak bertanggung jawab dan dibebaskan dari
          tanggung jawab terhadap segala perbuatan yang dilakukan yang dimuat
          oleh para anggota. {'\n'}• Segala perbuatan yang dilakukan oleh para
          pengguna merupakan tanggung jawab dari masing-masing pengguna itu
          sendiri. Dengan demikian setiap anggota bertanggung jawab terhadap
          segala aktivitas yang dilakukan didalam aplikasi ini. {'\n'}• Pihak
          pengelola tidak bertanggung jawab serta dibebaskan dari tanggung jawab
          apabila terjadi sengketa, pertikaian, hubungan yang tidak harmonis
          diantara para pengguna dan akibat-akibat negatif maupun merugikan yang
          diderita para pengguna yang ditimbulkan dari sengketa tersebut. {'\n'}
          • Pengelola berhak untuk menolak setiap perbuatan yang telah dilakukan
          oleh pengguna dan/atau menghentikan penggunaan Anda dengan
          pertimbangan tertentu, seperti karena pelanggaran terhadap syarat dan
          ketentuan yang berlaku dan sebagainya. {'\n'}• Pengelola berhak
          mengirimkan informasi, pemberitahuan, update melalui jalur kontak
          email ataupun media lainya yang Anda sediakan pada saat mendaftar CV.{' '}
          {'\n'}• Anda juga mengakui bahwa kami mempunyai hak tak terbatas
          (namun bukan menjadi kewajiban) untuk menolak keseluruhan atau
          sebagian substansi isi yang dikirimkan, jika dianggap perlu. {'\n'}•
          Pengelola berhak melakukan perubahan terhadap syarat dan ketentuan
          yang berlaku jika dianggap perlu dengan/tanpa pemberitahuan terlebih
          dahulu kepada semua penggun {'\n'}• Kami berhak untuk menolak setiap
          profil atau foto yang tidak sesuai dengan larangan yang ditetapkan
          dalam bagian ini sejauh menurut kebijakannya kami perlu untuk
          melakukannya. {'\n\n'}
          <Text style={styles.textQ}>Penolakan pertanggungjawaban:</Text>
          {'\n\n'}• kami tidak bertanggung jawab atas kerusakan/kerugian pada
          seseorang, yang disebabkan oleh tindakan yang keluar dari penggunaan
          jasa ini. Para pengguna mengetahui bahwa mereka menanggung sendiri
          semua resiko dan tanggung jawab untuk kehilangan atau kerusakan dari
          menggunakan jasa ini. {'\n'}• pengelola tidak memonitor atau
          mengontrol satu per satu dari penggunaan aplikasi oleh para pengguna.
          Sehubungan dengan ini, anda setuju untuk menerima tanggung jawab
          secara pribadi akan tindakan legal anda dibawah semua hukum yang ada.
          {'\n'}• Pengelola tidak menyarankan kegiatan pengguna dan atau
          mengirimkan uang/barang/hadiah kepada sesama pengguna, apabila hal
          tersebut terjadi para pengguna mengetahui bahwa mereka menanggung
          sendiri semua resiko dan tanggung jawab untuk kehilangan atau
          kerusakan yang terjadi dari kegiatan tersebut.
          {'\n\n'}
          <Text style={styles.textQ}>Pengaduan:</Text>
          {'\n\n'}Untuk mengatasi keluhan mengenai Layanan, silahkan hubungi
          kontak yang tersedia
        </Text>
      </>
    );
  }

  function renderKontak() {
    return (
      <>
        <Card>
          <Text style={styles.textQ}>Email : {adminData?.email}</Text>
          <Text style={styles.textQ}>WA : {adminData?.wa}</Text>
          <Text style={styles.textQ}>Alamat : {adminData?.alamat} </Text>
          <Text style={styles.textQ}>Instagram : {adminData?.instagram}</Text>
        </Card>
      </>
    );
  }

  function selectRender() {
    switch (KEY) {
      case 'faq':
        return renderFAQ();
        break;
      case 'kebijakanprivasi':
        return renderKebijakanPrivasi();
        break;
      case 'tacs':
        return renderTermd();
        break;
      case 'kontak':
        return renderKontak();
        break;

      default:
        return null;
        break;
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 60}}
      style={styles.container}>
      {selectRender()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  textSubtitle: {
    ...Typo.TextLargeBold,
  },

  textQ: {
    ...Typo.TextMediumBold,
    marginBottom: 8,
  },

  textA: {
    ...Typo.TextNormalRegular,
  },
});

export default MenuScreen;
