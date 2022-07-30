const pdf = require('html-pdf');

const contenido = `
<h1>Esto es un test de html-pdf</h1>
<p>Estoy generando PDF a partir de este código HTML sencillo</p>
`;

module.exports = generatePDF = () => {
    pdf.create(contenido).toFile('./salida.pdf', function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
}