import { FormProvider } from '@/context/FormContext';
import ClientForm from './components/ClientForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4 sm:flex ">
      <FormProvider>
        <ClientForm />
      </FormProvider>
    </div>
  );
}
