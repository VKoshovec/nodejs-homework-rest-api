const Jimp = require('jimp');

function jimpOtimizer (file) {

    Jimp.read(file, (err, avatar) => {

        if(err) throw err;

        avatar
        .resize(250, 250);

        console.log(avatar);
    });

};

module.exports = jimpOtimizer;