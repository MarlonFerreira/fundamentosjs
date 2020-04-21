function onLoad() {
    //console.log('Carregou!!', TelaJogoMemoria, JogoMemoria)
    // const heroi = {
    //     img: './arquivos/batman.png',
    //     nome: 'batman'
    // }
    dependencias = {
        telaJogoMemoria: TelaJogoMemoria,
        util: Util 
    }

    // TelaJogoMemoria.atualizarImagens([
    //     heroi, heroi, heroi
    // ])

    // const codigoHtml = TelaJogoMemoria.obterCodigoHtml(heroi)
    // console.log(codigoHtml)
    // TelaJogoMemoria.alterarConteudoHtml(codigoHtml)

    const jogoMemoria = new JogoMemoria( dependencias )
    jogoMemoria.inicializar()
}

window.onload = onLoad