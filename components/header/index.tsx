import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar, Pressable } from "react-native";

interface HeaderProps{
  step: string,
  title: string
}

export function Header({ step, title }: HeaderProps){
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#000"/>
          </Pressable>

          <Text style={styles.text}>{step} <Feather name="loader" size={16} color="#000"/></Text>
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginBottom: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 32 : 32,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 8
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  text: {
    fontSize: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.background
  }
})