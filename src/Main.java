public class Main {

    public static double calcularPosicao(double posicaoInicial, double velocidade, double tempo){

        return posicaoInicial + velocidade * tempo;
    }

    public static boolean estaDentroDaArea(double posicao, double limite){
        if(posicao > limite || posicao < -limite) return false;
        return true;
    }

    public static void main(String[] args) {
        double posicaoInicial = 12.0;
        double velocidade = -3.0;
        double tempo = 4.0;
        double limiteArea = 50.0;

        double posicao = calcularPosicao(posicaoInicial,-velocidade,tempo);
        boolean dentroArea = estaDentroDaArea(posicao,limiteArea);

        System.out.printf("\nCalculo posicao: " + posicao + "m");
        System.out.println("\nEstá dentro da área: " + dentroArea);

        System.out.println("\n-=-=-=-Teste Finalizado-=-=-=-\n");

    }
}

