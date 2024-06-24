"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const config_js_1 = require("./config/config.js");
const index_js_1 = require("./db/index.js");
// connecting to mongoDB
(0, index_js_1.connectDB)()
    .then(() => {
    app_js_1.app.on('error', (error) => {
        console.log('ERRRRRRRR: ', error);
        throw error;
    });
    app_js_1.app.listen(config_js_1.config.PORT, () => {
        console.log(`Server is running at port `, process.env.PORT);
    });
})
    .catch((err) => {
    console.log('Mongo DB connection failed !!', err.message);
});
