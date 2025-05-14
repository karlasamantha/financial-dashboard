import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Text } from '@chakra-ui/react';
import { login } from './actions';

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction}>
      <input type="text" name="email" placeholder="Email" />
      {state?.error?.email && (
        <Text color="red" fontSize="sm">
          {state.error.email}
        </Text>
      )}
      <input type="password" name="password" placeholder="Password" />
      {state?.error?.password && (
        <Text color="red" fontSize="sm">
          {state.error.password}
        </Text>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Login
    </button>
  );
}
