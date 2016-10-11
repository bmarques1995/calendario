function verificaBissexto(ano) {
    if (ano % 4 != 0)
        return false;
    else if (ano % 100 == 0 && ano % 400 != 0)
        return false;
    else
        return true;
}

function avancoRetrocesso(controle) {
    var ano = parseInt(document.querySelector('.ano').innerHTML);
    var mes = parseInt(document.querySelector('.mes').innerHTML);
    if (controle == '0') {
        if (--mes == -1) {
            ano--;
            mes = 11;
        }
    } else {
        if (++mes == 12) {
            ano++;
            mes = 0;
        }
    }
    document.querySelector('.ano').innerHTML = ano;
    document.querySelector('.mes').innerHTML = mes;
    constroiCalendario();
}

function avancoRetrocessoRapido(controle) {
    var ano = parseInt(document.querySelector('.ano').innerHTML);
    if (controle == '1') {
        ano++;
    } else {
        ano--;
    }
    document.querySelector('.ano').innerHTML = ano;
    constroiCalendario();
}

function leData() {
    var x = new Date();
    document.querySelector('.ano').innerHTML = x.getFullYear();
    document.querySelector('.mes').innerHTML = x.getMonth();
    constroiCalendario();
}

function trataString() {
    var mes = parseInt(document.querySelector('.mes').innerHTML) + 1;
    if (mes < 10)
        mes = '0' + mes;
    return mes + '-01-' + document.querySelector('.ano').innerHTML + ' 08:00';
}

function constroiCalendario() {
    var data = new Date(trataString());
    var mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.querySelector('.mes-ano p').innerHTML = mes[data.getMonth()] + ' ' + data.getFullYear();
    destroiTabela();
    constroiTabela(data);
    /*Funcionando Corretamente*/
}
function destroiTabela() {
   var corpo = document.createElement('tbody');
   corpo.setAttribute('class','dias');
   document.querySelector('.cale').removeChild(document.querySelector('.dias'));
   document.querySelector('.cale').appendChild(corpo);
}
function constroiTabela(data) {
    var tab = document.querySelector('.dias'),
    fim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (verificaBissexto(data.getFullYear()))
        fim[1] = 29;
    var num_linhas = fim[data.getMonth()] + data.getDay();
    num_linhas /= 7;
    num_linhas = parseInt(num_linhas);
    if ((fim[data.getMonth()] + data.getDay()) % 7 != 0)
        ++num_linhas;
    criaLinhas(num_linhas);
    if (data.getMonth() == 0)
        constroiColunas(data, fim[data.getMonth()], 31);
    else
        constroiColunas(data, fim[data.getMonth()], fim[(data.getMonth()) - 1]);
}

function criaLinhas(tam) {
    for (var i = 0; i < tam; ++i)
        document.querySelector('.dias').appendChild(document.createElement('tr'));
    var col = document.querySelectorAll('.dias tr');
    for (var i = 0; i < col.length; ++i) {
        for (var j = 0; j < 7; ++j)
            col[i].appendChild(document.createElement('td'));
    }
}

function constroiColunas(data, fim, fim_anterior) {
    var dias = document.querySelectorAll('.dias tr td');
    var ini = data.getDay();
    for (var i = 0; i < ini; ++i) {
        dias[i].innerHTML = fim_anterior - ini + 1 + i;
        dias[i].setAttribute("class", "forasteiro");
    }
    for (var i = ini; i < ini + fim; ++i){
        dias[i].innerHTML = i - ini + 1;
        dias[i].setAttribute('class','pertencente');
    }
    for (var i = ini + fim; i < dias.length; ++i) {
        dias[i].innerHTML = i - ini - fim + 1;
        dias[i].setAttribute("class", "forasteiro");
    }
}
