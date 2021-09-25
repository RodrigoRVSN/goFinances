import React from "react";
import { Platform, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/AuthContext";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export default function SignIn() {
  const { user, signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"} finanças com {"\n"} facilidade
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com a Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
