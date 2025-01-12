import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { colors } from '@/constants/colors';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { useDataStore } from '@/store/data';


const schema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  age: z.string().min(1, { message: 'A idade é obrigatória' }),
  height: z.string().min(1, { message: 'A altura é obrigatória' }),
  weight: z.string().min(1, { message: 'O peso é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export default function Step(){
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageOne = useDataStore(state => state.setPageOne)

  function handleCreate(data: FormData){
    setPageOne({
      age: data.age,
      height: data.height,
      name: data.name,
      weight: data.weight
    })
    router.push('/create')
  }

  return(
    <View style={styles.container}>
      <Header step='Passo 1' title='Vamos começar!'/>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome: </Text>
        <Input 
          name='name'
          control={control}
          placeholder='Digite seu nome'
          error={errors.name?.message}
          keyboardType='default'
        />

        <Text style={styles.label}>Peso: </Text>
        <Input 
          name='weight'
          control={control}
          placeholder='Ex: 75'
          error={errors.weight?.message}
          keyboardType='numeric'
        />

        <Text style={styles.label}>Altura: </Text>
        <Input 
          name='height'
          control={control}
          placeholder='Ex: 1.80'
          error={errors.height?.message}
          keyboardType='numeric'
        />

        <Text style={styles.label}>Idade atual: </Text>
        <Input 
          name='age'
          control={control}
          placeholder='Ex: 19'
          error={errors.age?.message}
          keyboardType='numeric'
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>

    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: 16
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: colors.white
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})