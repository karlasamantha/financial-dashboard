import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

import { login } from './actions';

const Form = styled.form`
  background-color: var(--chakra-colors-white);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 350px;
  border: 1px solid var(--chakra-colors-gray-100);
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--chakra-colors-gray-100);

  &::placeholder {
    color: var(--chakra-colors-indigo-200);
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: var(--chakra-colors-indigo);
`;

const SubmitBtn = styled.button`
  background-color: var(--chakra-colors-indigo);
  color: var(--chakra-colors-white);
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-weight: 600;

  &:hover {
    background-color: var(--chakra-colors-indigo-600);
  }
`;

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <Form action={loginAction}>
      <Label htmlFor="email">Email</Label>
      <Input type="text" name="email" placeholder="your@email.com" />
      {state?.error?.email && (
        <Text color="red" fontSize="sm">
          {state.error.email}
        </Text>
      )}

      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" />
      {state?.error?.password && (
        <Text color="red" fontSize="sm">
          {state.error.password}
        </Text>
      )}

      <SubmitButton />
    </Form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <SubmitBtn disabled={pending} type="submit">
      Login
    </SubmitBtn>
  );
}
