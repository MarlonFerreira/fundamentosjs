class JogoMemoria {
    constructor({ telaJogoMemoria, util }) {
        this.tela = telaJogoMemoria
        this.util = util

        this.heroisInicias = [
            { img: './arquivos/batman.png', nome: 'batman' },
            { img: './arquivos/frank.png', nome: 'frank' },
            { img: './arquivos/groot.png', nome: 'groot' },
            { img: './arquivos/homem aranha.png', nome: 'homem aranha' }
        ]

        this.iconePadrao = './arquivos/padrao.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []

    }

    inicializar() {
        this.tela.atualizarImagens(this.heroisInicias)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }

    esconderHerois(herois) {
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarImagens(heroisOcultos)
        this.heroisEscondidos = heroisOcultos
    }

    exibirHerois(nomeDoHeroi){
        const { img } = this.heroisInicias.find(({ nome }) =>  nomeDoHeroi === nome)
        this.tela.exibirHerois(nomeDoHeroi, img)
    }

    verificarSelecao(id, nome) {
        const item = { id, nome }
        const heroisSelecionados = this.heroisSelecionados.length
        switch (heroisSelecionados) {
            case 0:
                this.heroisSelecionados.push(item)
                break;
            case 1:
                const [opcao1] = this.heroisSelecionados
                this.heroisSelecionados = []
                if (opcao1.nome === item.nome && opcao1.id !== item.id) {
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return;
                }
                this.tela.exibirMensagem(false)
                //alert('Combinacao incorreta!')
                break;
        }
    }

    mostrarHeroisEscondidos() {
        const heroisEscondidos = this.heroisEscondidos
        for (const heroi of heroisEscondidos) {
            const { img } = this.heroisInicias.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    async embaralhar() {
        const copias = this.heroisInicias
            .concat(this.heroisInicias)
            .map((item) => {
                return Object.assign({}, item, { id: Math.random() / 0.5 })
            })
            .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()

        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)

        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
    }

    jogar() {
        this.embaralhar()
    }

}
