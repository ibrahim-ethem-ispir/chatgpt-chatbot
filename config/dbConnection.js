import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Veritabanına Başarıyla Bağlanıldı');
    })
    .catch((err) => {
      console.log('Veritabanına Bağlanırken Hata Çıktı === ' + err);
    });
};

dbConnection();