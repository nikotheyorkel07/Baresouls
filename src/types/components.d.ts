declare module '@/components/ui/button' {
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }
  export const Button: React.FC<ButtonProps>;
}

declare module '@/components/ui/card' {
  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
  export const Card: React.FC<CardProps>;
}

declare module '@/components/ui/switch' {
  export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
  export const Switch: React.FC<SwitchProps>;
}