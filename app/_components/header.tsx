import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import SidebarButton from "./sidebar-button";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row items-center justify-between">
        <Link href="/">
          <Image alt="FSW Barber" src="/Logo.png" height={18} width={120} />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton />
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
