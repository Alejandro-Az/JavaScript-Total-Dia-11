let datoBanco = document.getElementById("banco");
let datoSucursal = document.getElementById("sucursal");
let datoTitular = document.getElementById("titular");
let datoNroCuenta = document.getElementById("nro_cuenta");
let datoSaldoDolares = document.getElementById("saldoDolares");
let datoSaldoEuros = document.getElementById("saldoEuros");
let datoCbu = document.getElementById("cbu");
let datoApertura = document.getElementById("fechaApertura");

let banco = "";
let sucursal = "";
let titular = "";
let nro_cuenta = "";
let saldo = [];
let cbu = "";
let fechaApertura = "";

function leer() {
    let datosJson;

    fetch('./resumen.json')
    .then(respuesta => respuesta.json())
    .then((salida) => {
        datosJson = salida;
        banco = datosJson.banco;
        sucursal = datosJson.sucursal;
        titular = datosJson.titular;
        nro_cuenta = datosJson.nro_cuenta;
        saldo = datosJson.saldo;
        cbu = datosJson.cbu;
        fechaApertura = datosJson.abierto;
        
        datoBanco.textContent = banco;
        datoSucursal.textContent = sucursal;
        datoTitular.textContent = titular;
        datoNroCuenta.textContent = "Nro cuenta: " + nro_cuenta;
        datoSaldoDolares.textContent = saldo[0].monto + " " + saldo[0].moneda;
        datoSaldoEuros.textContent = saldo[1].monto + " " + saldo[1].moneda;
        datoCbu.textContent = "CBU: " + cbu;
        datoApertura.textContent = "Abierta: " + fechaApertura;
        
    }).catch(function(error){alert(error)})
}

/*
Formato en el que debe imprimirse la información
--------------------------------
Banco de Springfield
Springfield, IL
[Nombre del cliente]
Nro cuenta: [numero de cuenta]
[monto dólres] USD
[monto euros] EUR
CBU: [Número CBU]
Abierta:[fecha de apertura]
--------------------------------
 
*/

function leerXML() {
    let jsonDatos;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "./resumen2.json"), true;
    xhr.responseType = "json";

    xhr.onload = function() {
        if(xhr.status === 200) {
            jsonDatos = xhr.response;

            datoBanco.textContent = jsonDatos.banco;
            datoSucursal.textContent = jsonDatos.sucursal;
            datoTitular.textContent = jsonDatos.titular;
            datoNroCuenta.textContent = "Nro cuenta: " + jsonDatos.nro_cuenta;
            datoSaldoDolares.textContent = jsonDatos.saldo[0].monto + " " + jsonDatos.saldo[0].moneda;
            datoSaldoEuros.textContent = jsonDatos.saldo[1].monto + " " + jsonDatos.saldo[1].moneda;
            datoCbu.textContent = "CBU: " + jsonDatos.cbu;
            datoApertura.textContent = "Abierta: " + jsonDatos.abierto;
        } else {
            console.log("error");
        }
    }

    xhr.send();
}