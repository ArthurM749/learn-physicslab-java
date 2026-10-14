public class Formula {
    double posicao = -12.0;
    double velocidade = 2.75;
    double tempo = 0.0;

    public Formula(double tempo, double velocidade, double posicao) {
        this.tempo = tempo;
        this.velocidade = velocidade;
        this.posicao = posicao;
    }

    public void formula(double p, double v, double t) {
        System.out.println(p+(v*t));
    }

}
