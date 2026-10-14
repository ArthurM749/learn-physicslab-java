
public class Main {

    /*
    Uma partícula começa em x₀ = 10 m e se move com velocidade
    constante de -2 m/s. Use dt = 1 s e duração de 5 s. Escreva
    um programa com while que imprima o tempo e a posição em todos
    os instantes de 0 a 5 s. A área de observação é de -15 m a +15 m
     e o programa deve parar caso a partícula saia dela.
     */

    public static void main(String[] args) {
        double posicaoInicial = 10.0;       //metros
        double velocidade = -2.0;           //metros/seg
        double dt = 1.0;                    //segundos entre passos
        double duracao = 5.0;               //duração maxima entre seg
        double areaLimite = 15.0;           //area entre -15m e 15m

        double tempo = 0.0;

        System.out.println("\nIniciando simulação do PhysicsLab\n");

        while(tempo <= duracao){
            double posicao = posicaoInicial + (velocidade * tempo);
            System.out.printf("t = %.1f s | x = %.2f m%n", tempo, posicao);

            // posicaoInicial + velocidade * tempo

            if(posicao > areaLimite || posicao < -areaLimite){
                System.out.println("Status: partícula fora da área de observação");
                break;
            }

            tempo = tempo + dt;

        }

        System.out.println("\n-=-=-=-Teste Finalizado-=-=-=-\n");

    }
}

