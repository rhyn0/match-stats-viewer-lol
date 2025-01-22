import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";

export type PositionAvatarProps =
    | {
          className?: string;
          fallbackClassName?: string;
          src?: undefined;
          alt?: undefined;
      }
    | {
          className?: string;
          fallbackClassName?: string;
          src: string;
          alt: string;
      };

export default function PositionAvatar({
    src,
    alt,
    className,
    children,
    fallbackClassName,
}: React.PropsWithChildren<PositionAvatarProps>) {
    return (
        <Avatar className={cn("w-12 h-12 shrink-0", className)}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback className={fallbackClassName}>
                {children}
            </AvatarFallback>
        </Avatar>
    );
}
