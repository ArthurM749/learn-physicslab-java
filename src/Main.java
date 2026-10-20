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
        System.out.println(nomesFora.trim() );


    }











}


