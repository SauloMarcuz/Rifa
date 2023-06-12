const  formEntrada  =  documento . getElementById ( 'nome' ) ;
const  numberContainer  =  documento . querySelector ( '.numbers-container' ) ;
const  participanteLista  =  documento . getElementById ( 'lista de participantes' ) ;

 números  const =  Array . from ( {  comprimento : 100  } ,  ( _ ,  i )  =>  i  +  1 ) ;
deixe  Números selecionados  =  [ ] ;
deixe  os participantes  =  [ ] ;

// Função para atualizar a lista de números selecionados
function  updateSelectedNumbers ( )  {
  numberContainer . innerHTML  =  '' ;

  números . forCada ( número  =>  {
    const  numeroElemento  =  documento . createElement ( 'div' ) ;
    númeroElemento . classList . adicionar ( 'número' ) ;
    númeroElemento . textoConteúdo  =  número ;

    if  ( números selecionados . inclui ( número )  ||  isNumberTaken ( número ) )  {
      númeroElemento . classList . add ( 'selecionado' ) ;
      númeroElemento . setAttribute ( 'desabilitado' ,  verdadeiro ) ;
    }

    númeroElemento . addEventListener ( 'clique' ,  ( )  =>  {
      if  ( ! numberElement . classList . contém ( 'selecionado' ) )  {
        númeroElemento . classList . add ( 'selecionado' ) ;
        Números selecionados . empurre ( número ) ;
      }  senão  {
        númeroElemento . classList . remover ( 'selecionado' ) ;
        números selecionados  =  números selecionados . filtro ( n  =>  n  !==  número ) ;
      }
    } ) ;

    numberContainer . appendChild ( númeroElemento ) ;
  } ) ;
}

// Função para verificar se um número já foi selecionado por outro participante
função  éNumberTaken ( número )  {
  for  ( const  participante  de  participantes )  {
    if  ( participante . números . inclui ( número ) )  {
      retorna  verdadeiro ;
    }
  }
  retorna  falso ;
}

// Função para atualizar a lista de participantes
function  updateParticipantList ( )  {
  lista de participantes . innerHTML  =  '' ;

  participantes . forCada ( participante  =>  {
    const  itemlista  =  documento . criarElemento ( 'li' ) ;
    listaItem . classList . add ( 'lista-item' ) ;
    listaItem . textContent  =  ` ${ participante . nome } - Números: ${ participante . números . join ( ', ' ) } ` ;

    lista de participantes . appendChild ( listItem ) ;
  } ) ;
}

// Função para confirmar uma participação
função  enviarRaffleForm ( )  {
  const  nome  =  formInput . valor . aparar ( ) ;

  if  ( nome  &&  números selecionados . comprimento  >  0 )  {
     participante  constante =  {
      nome : nome ,
      números : números selecionados
    } ;

    participantes . empurrar ( participante ) ;
    formInput . valor  =  '' ;
    Números selecionados  =  [ ] ;

    atualizarNúmerosSelecionados ( ) ;
    atualizarParticipantList ( ) ;

    // Salvar os participantes no arquivo answers.json using a API do GitHub
    const  jsonData  =  JSON . stringify ( participantes ) ;
    const  githubApiUrl  =  'https://api.github.com/repos/SauloMarcuz/rifa-isis/contents/answers.json' ;
    const  githubToken  =  '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' ;

    buscar ( githubApiUrl ,  {
      método : 'PUT' ,
      cabeçalhos : {
        Autorização : `Bearer ${ githubToken } ` ,
        Aceitar : 'application/vnd.github.v3+json' ,
        'Tipo de conteúdo' : 'aplicativo/json' ,
      } ,
      corpo : JSON . stringify ( {
        message : 'Atualizar arquivo answers.json' ,
        conteúdo : btoa ( jsonData ) ,
        ramificação : 'principal' ,
      } ) ,
    } )
      . então ( resposta  =>  resposta . json ( ) )
      . então ( dados  =>  {
        console . log ( 'Dados salvos com sucesso!' ) ;
      } )
      . pegar ( erro  =>  {
        console . error ( 'Erro ao salvar os dados:' ,  error ) ;
      } ) ;
  }  senão  {
    alert ( 'Por favor, preencha o nome e selecione pelo menos um número.' ) ;
  }
}

// Inicialização da página
atualizarNúmerosSelecionados ( ) ;
atualizarParticipantList ( ) ;
