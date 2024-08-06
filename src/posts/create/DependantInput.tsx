import { useWatch } from 'react-hook-form';

type Props = {
  dependency: string;
  children: JSX.Element;
}


export const DependantInput = ({ dependency, children }: Props) => {
  const dependencyValue = useWatch({ name: dependency});

  return dependencyValue ? children : null;
};