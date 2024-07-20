import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type GlassmorphismContainerProps = ComponentProps<"div"> & {};

export const GlassmorphismContainer = ({
  className,
  ...rest
}: GlassmorphismContainerProps) => {
  return (
    <div
      {...rest}
      className={cn(
        "zoom-125:text-lg zoom-125:rounded-md",
        "flex px-6 h-[88px] md:h-[117px] items-center text-xl dark:text-gray-600 bg-[#ffffff1A] dark:bg-transparent shadow-border border-2 border-white dark:border-dark-border rounded-xl gap-5 w-full max-w-[523px]",
        className
      )}
    />
  );
};
