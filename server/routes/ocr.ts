import express from "express";
import multer from "multer"
import {ImageAnnotatorClient} from '@google-cloud/vision'

const upload = multer({ storage: multer.memoryStorage() })
const googleVision = new ImageAnnotatorClient({
    keyFilename: './server/config/googleVisionCredentials.json'
})

const router: express.Router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No image file was uploaded.' });
    }
    let detectedText: string
    try {
        const request = {
            image: { content: req.file.buffer },
        };
        console.log('Sending image to Google Vision API...');
        const [result] = await googleVision.textDetection(request);
        const detections = result.textAnnotations;

        if (detections && detections.length > 0) {
            detectedText = detections[0]!.description ?? 'No text found.';
        } else {
            detectedText = 'No text found.';
        }
        res.status(200).send(detectedText);
    } catch (error) {
        res.status(500).send({error: 'Failed to process image with Vision API'});
    }
})

export default router;