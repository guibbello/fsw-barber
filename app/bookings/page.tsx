import Header from "@/_components/header";
import { db } from "@/_lib/prisma";
import { authOptions } from "@/_lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BookingItem from "@/_components/booking-item";

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // Redireciona para login com Google
    redirect("/api/auth/signin?provider=google");
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: { gte: new Date() },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: { include: { barbershop: true } },
    },
  });

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: { lt: new Date() },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: { include: { barbershop: true } },
    },
  });

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>{" "}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="uppercase text-gray-400 text-xs font-bold mt-6 mb-3">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="uppercase text-gray-400 text-xs font-bold mt-6 mb-3">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
