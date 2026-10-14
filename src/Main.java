
public class Main {
    public static double formula(Double posicao, Double velocidade, Double tempo){
        return posicao + velocidade * tempo;
    }
    public static void main(String[] args) {

        System.out.println("\n::Posição final das particulas::::::::::::::");
        System.out.println("Partícula 1: " + formula(1.0,10.0,2.0));
        System.out.println("Particula 2: " + formula(2.0,1.0,2.0));
        System.out.println("Particula 3: " + formula(0.0,10.0,5.0));
    }
}

