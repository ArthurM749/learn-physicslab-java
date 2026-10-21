public class Main {

    static final double LIMITE_AREA = 40.0;

    static double calcularPosicaoFinal(double posicaoInicial, double velocidade, double tempo) {
        return posicaoInicial + velocidade * tempo;
    }

    static boolean estaDentroDaArea(double posicao, double limite){

        return posicao < limite && posicao > -limite;
    }

    static int contarDentroDaArea(double[] posicoes){
        int count =0 ;
        for (double n : posicoes){
            if( estaDentroDaArea(n, LIMITE_AREA)){
                count++;
            }
        }

        return count;
    }

    static String primeiraParticulaSairArea(double tempo, double[] posicoesIniciais , double[] velocidades){


        for( int t = 0; t < tempo; t++ ){
            for (int i = 0; i < posicoesIniciais.length; i++){
                if( calcularPosicaoFinal(posicoesIniciais[i],velocidades[i],t) > LIMITE_AREA){
                    return "\nTempo: "+ t + " | Particula "+ i + " | Posição final: "+ calcularPosicaoFinal(posicoesIniciais[i],velocidades[i],t);

                }
            }
        }

        return "\nNenhuma particula saiu da área";
    }

    public static void main(String[] args) {

        String[] nomes = {"A","B","C","D","E"};
        double[] posicoesIniciais = {-45.0, 30.0, 0.0, 48.0, -20.0};
        double[] velocidades = {5.0, 4.0, -6.0, 1.0, 0.0};
        double tempo = 10.0;
        double[] posicoesFinais = new double[nomes.length];
        String nomesFora = "";

        // x0 = x + v * t
        System.out.println("\n::Posições finais:::::::");
        for (int i = 0; i < nomes.length;i++){
            posicoesFinais[i] = calcularPosicaoFinal(posicoesIniciais[i],velocidades[i],tempo);
            System.out.println("Posição " + i + ": " + posicoesFinais[i]);
        }

        //contar quantas posicões dentro da área

        int dentroArea = contarDentroDaArea(posicoesFinais);
        System.out.println("\n::Quantidade dentro da área: " + dentroArea);

        //Nomes de fora
        System.out.println("\n::Nomes ficaram de fora: ");
        for (int i =0; i < nomes.length;i++){
            if(!estaDentroDaArea(posicoesFinais[i],LIMITE_AREA)){
                nomesFora = nomesFora + nomes[i] + " ";
            }
        }
        System.out.println(nomesFora.trim());


        //t=3.0 s: partícula D saiu da área (x=51.0 m)

            /*
            para cada instante t, de 0 até 10:
                para cada partícula i:
                    se |posição de i em t| > limite:
                        imprimir t, i, posição
                        terminar tudo          // aqui entra o return (ou break com rótulo)

            imprimir "Nenhuma partícula saiu da área."   // só chega aqui se nada disparou
             */

        System.out.println("\n::Primeiro a sair:::::\n " + primeiraParticulaSairArea(tempo, posicoesIniciais, velocidades));
    }











}


