
public class Main {

    public static void main(String[] args) {
        Double posicaoInicial = -40.0   ;
        Double velocidade = 6.0;
        Double tempo = 12.0;

        final Double area = 50.0;

        Double posicaoFinal = posicaoInicial + velocidade * tempo;

        Boolean estaAvancando = velocidade > 0;
        Boolean estaDentroDaArea = posicaoFinal <= area  && posicaoFinal >= - area;

        System.out.println("Posição final: "+ posicaoFinal);
        System.out.println("Limite de área: "+ area);

        if(estaAvancando && estaDentroDaArea){
            System.out.println("Cruzeiro seguro");
        }else{
            System.out.println("Atençao necessaria");
        }

        /*

        * DESAFIO EXTRA
        *
        *Leia sobre avaliação em curto-circuito na documentação oficial da Oracle
        * e escreva, como comentário no seu código,
        * por que velocidade != 0 && (100 / velocidade) > 5 nunca lança um erro
        * de divisão por zero, e o que aconteceria se você invertesse
        * a ordem das duas condições.
        *
        *   Resposta: pq ele não irá aceitar nenhuma velocidade com valor igual a zero e um valor maior que cinco
            caso o valor da velocidade dividida por 100 chegasse a ser menor ou igual a 5. Assim, evitando
            um erro de código de compilação.
        *
        */

    }
}

