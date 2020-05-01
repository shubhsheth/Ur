import './css/style.css';

Promise.all([
    connect(),
    downloadAssets(),
]).then(() => {
    console.log("from index.js");
});