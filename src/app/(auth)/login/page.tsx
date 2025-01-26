import { Login } from '../components';

type LoginPageProps = {
  searchParams?: {
    code?: string;
    error?: string;
  };
};

export default function LoginPage(props: LoginPageProps) {
  const { searchParams } = props;

  return <Login searchParams={searchParams} />;
}
