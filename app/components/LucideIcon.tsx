import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface LucideIconProps extends LucideProps {
  name: string;
  size?: number | string;
  className?: string;
}

const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};

export default LucideIcon;
