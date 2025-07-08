const frm = document.querySelector('form') // seleciona o elemento 'form' do html
const resp1 = document.querySelector('#outResp1') // seleciona o elemento id '#outResp1'
const resp2 = document.querySelector('#outResp2') // seleciona o elemento id '#outResp2'
const resp3 = document.querySelector('#outResp3') // seleciona o elemento id '#outResp3'

frm.addEventListener('submit', (e)=> {
    e.preventDefault() // função para evitar que a página seja recarregada por padrão

    const modelo = frm.inModelo.value // obtém o conteúdo do campo 'inModelo'
    const ano = Number(frm.inAno.value) // conversão da string em número
    const preco = Number(frm.inPreco.value) // obtém o conteúdo do campo 'inPreco'

    const classificacao = classificarVeiculo(ano) 
    if(!classificacao) return

    const entrada = calcularEntrada(preco, classificacao) // retorna as variáveis preço e classificação, agora parâmetros da função
    const parcela = (preco - entrada) / 10 

   // Exibe entradas na tela com conversão para BRL

    resp1.innerText = `${modelo} - ${classificacao}` 
    resp2.innerText = `Entrada ${entrada.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
    resp3.innerText = `Parcelas: 10x de ${parcela.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`  
})

const classificarVeiculo = ano => {
    const anoAtual = new Date().getFullYear() // obter o ano atual
    let classif 
    if(ano === anoAtual) {
        classif = 'Novo'
    } else if (ano === anoAtual - 1 || ano === anoAtual -2) {
        classif = 'Seminovo'
    } else if (ano > anoAtual) {
        classif = alert('Ano inválido! Por favor, digite o ano de fabricação do veículo.') // verificar se é possível usar um alert dessa forma dentro do if de let classif
        return null
    }
    else {
        classif = 'Usado'
    }
    return classif // retorna a classificação
}

const calcularEntrada = (valor, status) => status === 'Novo' ? valor * 0.5 : valor * 0.3 // função recebe valor e status (novo ou não - seminovo/usado) do veículo como parâmetros

