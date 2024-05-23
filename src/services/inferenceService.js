const tf = require('@tensorflow/tfjs-node');
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const classes = ['Cancer', 'Non-cancer'];

        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        // const label = classes[classResult];
        let label = classes[classResult];

        if (confidenceScore <= 50) {
            label = "Non-cancer";
        }

        let suggestion;

        if (label === "Cancer") {
            suggestion = "Segera konsultasi dengan dokter dikarenakan ini termasuk Cancer";
        }

        if (label === "Non-cancer") {
            suggestion = "Tidak perlu khawatir, ini bukan termasuk Cancer";
        }

        return { label, suggestion };
    } catch (error) {
        throw new InputError("Terjadi kesalahan dalam melakukan prediksi", 400);
    } 
}

module.exports = predictClassification;