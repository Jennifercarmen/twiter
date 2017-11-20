window.addEventListener('load', function () {
    
    // Declaro las variables
    var boton = document.getElementById("btn-post");
    var textarea = document.getElementById("box_text");
    var div_buton = document.getElementById("btn_tweet");
    var button = document.createElement("button");
    var numberCounter = document.getElementById("contadorNumeros");
    var box_textarea = document.getElementById("box_post");

    // Desactivo boton al cargar la página
    button.disabled = true;

    // Manejadores de eventos para el tamaño de textarea
    textarea.addEventListener('click', function (event) {
        textarea.classList.add('big');
        div_buton.appendChild(button);
        button.textContent = "Twittear";
        button.classList.add('button_tweet');
    });

    // Manejadores de eventos para el boton twittear
    button.addEventListener('click', function (event) {
        // Trim para validar espacios en blanco
        if (textarea.value.trim() == "")
            alert("debe ingresar un valor en el campo");
        else {
            var paragraph = document.createElement("div");
            var post = document.querySelector(".post");
            // condicionamos a que si no existen nodos dentro de post se agregara un Tweet  
            if (!post.childNodes[0]) {
                var content = post.appendChild(paragraph);
                // caso contrario se inserta incluimos un nuevo Tweet antes que el anterior
            } else {
                var content = post.insertBefore(paragraph, post.childNodes[0]);
            }
            content.innerHTML = textarea.value + '<br><br>' + moment().format('LT');
            paragraph.classList.add('box_tweet');
            textarea.value = '';
        }
    });

    // Función que detecta si se ha hecho click fuera del elemento textarea
    document.addEventListener('click', function (event) {
        var target = event.target;
        do {
            if (textarea == event.target) {
                // El click se ha producido dentro del elemento, no se hace nada.
                return;
            }
            target = target.parentNode;
        } while (target)
        // Se ha clicado fuera del elemento, se añade la clase big al elemento textarea
        // se condiciona a remover la clase solo si el elemento esta vacio
        if (textarea.value === '') {
            textarea.classList.remove('big');
            div_buton.removeChild(button);
            button.disabled = true;
        }
    });

    // Manejadores de evento para escribir en textarea
    // Keydown--Controla eventos del teclado
    textarea.addEventListener("keyup", contador);

    // funcion que permitira contar los caracteres digitados
    function contador() {
        var ncaracteres = 140;
        var longitud = document.getElementById("box_text").value.length;
        numberCounter.textContent = ncaracteres - longitud;
        if (longitud >= 140) {
            numberCounter.style.color = "red";
            button.disabled = true;
        }
        else if (longitud >= 130) {
            numberCounter.style.color = "green";
            button.disabled = false;
        }
        else if (longitud >= 120) {
            numberCounter.style.color = "purple";
            button.disabled = false;
        }
        else if (longitud === 0) {
            numberCounter.style.color = "#186a9c";
            button.disabled = true;
        }
        else {
            numberCounter.style.color = "#186a9c";
            button.disabled = false;
        }
    };

// funcion que permite ajustar textarea al tamaño del texto

var area = document.querySelector('textarea');
area.addEventListener('keydown', autosize);
function autosize() {
    var el = this;
    setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
}
});
