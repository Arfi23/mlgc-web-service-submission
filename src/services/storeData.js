const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, data) {
  const db = new Firestore();
  const predictCollection = db.collection("predictions");

  try {
    await predictCollection.doc(id).set(data);
    return { success: true, message: 'Data berhasil disimpan' };
  } catch (error) {
    console.error('Error saat menyimpan data:', error);
    throw new Error('Gagal menyimpan data');
  }
}

module.exports = storeData;