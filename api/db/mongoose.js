const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/next-js-auth",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on('error', (e) => {
    console.error(e.toString(), true);
    console.error(e.stack, true);
});

db.once('open', async function () {
    console.info('DB Connected Successfully');
});

module.exports = mongoose;