const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(cors()); 

app.get('/api', async (req, res) => {
    res.send('upload image api');
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.originalname}`;
        console.log('Image uploaded:', req.file.originalname);
        res.json({ message: 'Image uploaded successfully!', fileUrl: fileUrl});
    } else {
        res.status(400).json({ message: 'No image uploaded' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during upload.' });
  }
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
