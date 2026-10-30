import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import {
  Button,
  FormField,
  Input,
  OtpInput,
  PasswordInput,
  PhoneInput,
  SocialButton,
  TextDivider
} from '../index';

const meta = {
  title: 'Telas/Entrada',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Peças de login, cadastro, código e recuperação de senha. Textos e ações vêm do app.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const countries = [
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸' }
];

const screen = { display: 'flex', flexDirection: 'column', gap: 16, width: 390, maxWidth: '100%', padding: 16, boxSizing: 'border-box' } as const;

const Phone = () => {
  const [country, setCountry] = useState('BR');
  return (
    <FormField label="Telefone">
      <PhoneInput
        countries={countries}
        country={country}
        onCountryChange={setCountry}
        countryLabel="País"
        searchPlaceholder="Buscar país"
        placeholder="22 99999-0000"
      />
    </FormField>
  );
};

const Password = ({ label }: { label: string }) => (
  <FormField label={label}>
    <PasswordInput showLabel="Mostrar senha" hideLabel="Esconder senha" placeholder="Sua senha" />
  </FormField>
);

const Social = () => (
  <>
    <TextDivider>ou</TextDivider>
    <SocialButton provider="google">Continuar com Google</SocialButton>
    <SocialButton provider="apple">Continuar com Apple</SocialButton>
  </>
);

export const SignIn: Story = {
  name: 'Entrar',
  render: () => (
    <div style={screen}>
      <Phone />
      <Password label="Senha" />
      <Button stretched>Entrar</Button>
      <Social />
    </div>
  )
};

export const SignUp: Story = {
  name: 'Cadastro',
  render: () => (
    <div style={screen}>
      <FormField label="Nome">
        <Input placeholder="Seu nome" autoComplete="name" />
      </FormField>
      <Phone />
      <Password label="Senha" />
      <Button stretched>Criar conta</Button>
      <Social />
    </div>
  )
};

const Code = () => {
  const [value, setValue] = useState('1234');
  return (
    <div style={screen}>
      <FormField label="Código" hint="Enviamos pelo WhatsApp para +55 22 99999-0000.">
        <OtpInput value={value} onChange={setValue} />
      </FormField>
      <Button stretched>Continuar</Button>
    </div>
  );
};

export const Otp: Story = {
  name: 'Código',
  render: () => <Code />
};

export const InvalidCode: Story = {
  name: 'Código errado',
  render: () => (
    <div style={screen}>
      <FormField label="Código" error="Código incorreto. Confira e tente de novo.">
        <OtpInput value="123456" onChange={() => {}} invalid />
      </FormField>
    </div>
  )
};
