import { cn } from "../../Lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type ReactNode, type HtmlHTMLAttributes } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md font-medium text-white duration-300 dark:text-black disabled:bg-indigo-400 disabled:hover:bg-indigo-400 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // ** FILLED
        default:
          "bg-slate-900 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700",
        danger:
          "bg-red-900 dark:bg-[#c2344d] dark:text-white dark:hover:bg-red-700",
        cancel:
          "bg-gray-300 text-gray-700 dark:bg-[#f5f5fa] dark:text-dark hover:bg-gray-400 dark:hover:bg-gray-200",

        // ** OUTLINE
        outline:
          "border border-indigo-400 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-indigo-600 dark:text-gray-700 dark:hover:text-white",
      },
      size: {
        default: "p-3", 
        sm: "text-sm px-4 py-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
extends HtmlHTMLAttributes<HTMLButtonElement>,

VariantProps<typeof buttonVariants>{
    children: ReactNode;
    isLoding?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}


const Button = ({
  children,
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;