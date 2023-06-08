$( document ).ready(function() {
    console.log( "ready!" );
    $.ajax({
        type: "get",
        url: "https://api.bookfon.com/api/business/update/",
        data: {
            myLuckyNumber: 13
        },
        success: function(response) {
            console.log(response);
        }
    });
});

$("#boton").on("click", function(e) {
    $("#categorias")
    e.preventDefault();
    $.ajax({
        url: '../controllers/prueba.php',
        type: 'GET',
        success: function(result){
            let categorias;
            let rows = '';

            if (result !== 0){
                categorias = JSON.parse(result);
                console.log(categorias);
                
                const prom = new Promise((resolve) => {
                    for (let i = 0; i < categorias.length; i++) {
                        rows += `<tr>
                                    <td>${categorias[i].id}</td>
                                    <td>${categorias[i].nombrecat}</td>
                                 </tr>`;
                    }

                    resolve(rows);
                });

                prom.then(() => {
                    const html = `
                    <table style="width: 100%">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                `;
                    $('#categorias').html(html);
                })
            }
            else{
                categorias = false;
                console.log(categorias);
            }
        },
        error: function(error){
            alert('Hubo un error en la peticion');
            console.log(error);
        }

    })
});


