"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren, useState } from "react";
import { GlassmorphismContainer } from "./container";

type GlassMorphismActionProps = ComponentProps<"div"> & {
  // iconAction?: NameIconsBase;
  // icon?: NameIconsBase;
  onClick?(): void;
  animate?: boolean;
};

const GlassMorphismAction = ({
  // iconAction = "arrow-broken",
  // icon,
  children,
  className,
  onClick,
  animate = true,
  ...rest
}: GlassMorphismActionProps) => {
  const [isAnimate, setIsAnimate] = useState(false);

  const handleClick = () => {
    if (animate) {
      setIsAnimate(true);

      setTimeout(() => handleAnimationEnd(), 500);
    } else {
      onClick?.();
    }
  };

  const handleAnimationEnd = () => {
    setIsAnimate(false);
    onClick?.();
  };

  return (
    <GlassmorphismContainer
      {...rest}
      onClick={handleClick}
      className={cn(
        "cursor-pointer transition-all hover:scale-[1.01]",
        className,
        isAnimate &&
          "bg-gradient-to-r border-purple-550 text-white from-purple-200 via-purple-200 to-purple-300 duration-100 dark:bg-none dark:border-dark-primary dark:text-primary"
      )}
    >
      {/* {icon && (
        <IconsNextMed
          size={46}
          className="w-8 zoom-125:w-9 md:w-11"
          name={icon}
        />
      )} */}

      <div className="flex flex-col">{children}</div>

      {/* <IconsNextMed
        name={iconAction}
        className={cn(
          "ml-auto",
          iconAction === "arrow-broken" && "-rotate-90  zoom-125:w-4 w-[18px]"
        )}
      /> */}
    </GlassmorphismContainer>
  );
};

const GlassMorphismActionTitle = ({ children }: PropsWithChildren) => {
  return <p className="font-sf-pro-display font-bold text-xl">{children}</p>;
};

const GlassMorphismActionDescription = ({ children }: PropsWithChildren) => {
  return (
    <span className="font-sf-pro-text hidden md:block zoom-125:text-xs text-sm text-dark-2">
      {children}
    </span>
  );
};

export {
  GlassMorphismAction,
  GlassMorphismActionDescription,
  GlassMorphismActionTitle,
};
