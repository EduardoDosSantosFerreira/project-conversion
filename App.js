import React,{useState} from 'react';
import { Text, SafeAreaView, StyleSheet,TouchableOpacity,View,TextInput } from 'react-native';

import Api from './components/Api';

export default function App() {

  const[valor,setValor]=useState('');
  const[convert,setConvert]=useState(null);
 
  
  async  function buscarResult(){
    try{
      const response=await Api.get(`https://economia.awesomeapi.com.br/json/last/BRL-USD?api-key=YOUR_API_KEY`);

      if(response.data['BRLUSD'] && response.data['BRLUSD'].high){
        const taxa=response.data['BRLUSD'].high;
        const result = (parseFloat(valor) * taxa).toFixed(2);
        setConvert(result);
      }else{
        setConvert('Erro');
      }
    }catch(erro){
      setConvert('Erro ao Acessar');
    }
    
   
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.bloco}>
      <Text style={styles.label}>
      Digite o valor em Reais:
      </Text>
      <TextInput style={styles.input} value={valor} onChangeText={(value)=>setValor(value)} keyboardType="numeric"/>
      <TouchableOpacity style={styles.btn} onPress={buscarResult}>
      <Text style={styles.btnTxt}>Buscar</Text>
      </TouchableOpacity>
      {convert !== null &&(
       <View style={styles.end}>
       <Text style={styles.label}><br />Valor em Reais: R$ {valor}</Text>
       <Text style={styles.label}><br />Valor em Dolar: $ {convert}</Text>
       </View>
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  bloco:{
    borderWidth:3,
    borderRadius:0,
    backgroundColor:'#171319',
    padding:25
  },
  input:{
    borderWidth:2,
    borderRadius:5,
    width:'80%',
    marginLeft:'10%',
    fontSize:20,
    color:'white',
    borderColor:'white',
  },
  label:{
    width:'80%',
    marginLeft:'10%',
    fontSize:15,
    color:'white'
  },
  btn:{
    borderRadius:5,
    width:'80%',
    marginLeft:'10%',
    backgroundColor:'#4681FA',
    marginTop:20,
  },
  btnTxt:{
    fontSize:20,
    textAlign:'center'
  },
  end:{
    color:'white'
  }
});