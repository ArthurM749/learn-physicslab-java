
public class Main {
    public static void main(String[] args) {
        double posicaoInicial = -12.0;
        double velocidade = 2.75;

        double tempo1 = 5.0;
        double tempo2 = 10.0;
        double tempo3 = 20.0;

        double posicaoEmT1 = posicaoInicial + velocidade * tempo1;
        double posicaoEmT2 = posicaoInicial + velocidade * tempo2;
        double posicaoEmT3 = posicaoInicial + velocidade * tempo3;

        System.out.println("\nPosição em t=5s: " + posicaoEmT1 + " m");
        System.out.println("Posição em t=10s: " + posicaoEmT2 + " m");
        System.out.println("Posição em t=20s: " + posicaoEmT3 + " m");

        double deslocamento = posicaoEmT3 - posicaoEmT1;
        System.out.println("Deslocamento entre t=5s e t=20s: " + deslocamento + " m");


    }
}

