import PositionAvatar from "@/components/avatar-position";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface PlayerCardProps {
    name: string;
    position: string;
    mostPlayedChampion: string;
    // championImageUrl: string
    className?: string;
}

export default function PlayerCard({
    name,
    position,
    mostPlayedChampion,
    children,
    className,
}: React.PropsWithChildren<PlayerCardProps>) {
    return (
        <Card className={className}>
            <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                    <PositionAvatar fallbackClassName="uppercase">
                        {position[0]}
                    </PositionAvatar>
                    <div>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                            {position}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm">
                        Most played:{" "}
                        <span className="font-medium">
                            {mostPlayedChampion}
                        </span>
                    </p>
                </div>
            </CardContent>
            <CardFooter>{children}</CardFooter>
        </Card>
    );
}
