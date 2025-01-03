// import fs from "fs/promises";
// import path from "path";

// const bookingsFilePath = path.join(process.cwd(), "bookings.json");

// const readBookingsFile = async () => {
//   try {
//     const data = await fs.readFile(bookingsFilePath, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       const initialData = { bookings: [] };
//       await fs.writeFile(
//         bookingsFilePath,
//         JSON.stringify(initialData, null, 2)
//       );
//       return initialData;
//     }
//     throw error;
//   }
// };

// const writeBookingsFile = async (data) => {
//   await fs.writeFile(bookingsFilePath, JSON.stringify(data, null, 2));
// };

// export const GET = async (request) => {
//   const searchParams = request.nextUrl.searchParams;
//   const date = searchParams.get("date");

//   if (!date) {
//     return new Response(JSON.stringify({ error: "Date is required." }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const bookingsData = await readBookingsFile();
//   const bookedSlots = bookingsData.bookings
//     .filter((b) => b.date === date)
//     .map((b) => b.time);

//   return new Response(JSON.stringify({ bookedSlots }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// };

// export const POST = async (request) => {
//   const body = await request.json();
//   const { date, time, guests, name, contact } = body;

//   if (!date || !time || !guests || !name || !contact) {
//     return new Response(JSON.stringify({ error: "All fields are required." }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const bookingsData = await readBookingsFile();

//   const isSlotTaken = bookingsData.bookings.some(
//     (b) => b.date === date && b.time === time
//   );

//   if (isSlotTaken) {
//     return new Response(JSON.stringify({ error: "Slot already booked." }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   bookingsData.bookings.push({ date, time, guests, name, contact });
//   await writeBookingsFile(bookingsData);

//   return new Response(
//     JSON.stringify({ message: "Booking created successfully." }),
//     {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// };

// export const DELETE = async (request) => {
//   const body = await request.json();
//   const { date, time } = body;

//   if (!date || !time) {
//     return new Response(
//       JSON.stringify({ error: "Date and time are required." }),
//       {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }

//   const bookingsData = await readBookingsFile();
//   const updatedBookings = bookingsData.bookings.filter(
//     (b) => !(b.date === date && b.time === time)
//   );

//   bookingsData.bookings = updatedBookings;
//   await writeBookingsFile(bookingsData);

//   return new Response(
//     JSON.stringify({ message: "Booking deleted successfully." }),
//     {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// };
import fs from "fs/promises";
import path from "path";

const bookingsFilePath = path.join(process.cwd(), "bookings.json");

const readBookingsFile = async () => {
  try {
    const data = await fs.readFile(bookingsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      const initialData = { bookings: [] };
      await fs.writeFile(
        bookingsFilePath,
        JSON.stringify(initialData, null, 2)
      );
      return initialData;
    }
    throw error;
  }
};

const writeBookingsFile = async (data) => {
  await fs.writeFile(bookingsFilePath, JSON.stringify(data, null, 2));
};

// Function to set CORS headers
const setCorsHeaders = (response) => {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Allow any origin (or specify your frontend URL instead of '*')
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS"); // Allow these methods
  response.headers.set("Access-Control-Allow-Headers", "Content-Type"); // Allow these headers
};

export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    const response = new Response(
      JSON.stringify({ error: "Date is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
    setCorsHeaders(response); // Add CORS headers
    return response;
  }

  const bookingsData = await readBookingsFile();
  const bookedSlots = bookingsData.bookings
    .filter((b) => b.date === date)
    .map((b) => b.time);

  const response = new Response(
    JSON.stringify({ bookedSlots }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
  setCorsHeaders(response); // Add CORS headers
  return response;
};

export const POST = async (request) => {
  const body = await request.json();
  const { date, time, guests, name, contact } = body;

  if (!date || !time || !guests || !name || !contact) {
    const response = new Response(
      JSON.stringify({ error: "All fields are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
    setCorsHeaders(response); // Add CORS headers
    return response;
  }

  const bookingsData = await readBookingsFile();

  const isSlotTaken = bookingsData.bookings.some(
    (b) => b.date === date && b.time === time
  );

  if (isSlotTaken) {
    const response = new Response(
      JSON.stringify({ error: "Slot already booked." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
    setCorsHeaders(response); // Add CORS headers
    return response;
  }

  bookingsData.bookings.push({ date, time, guests, name, contact });
  await writeBookingsFile(bookingsData);

  const response = new Response(
    JSON.stringify({ message: "Booking created successfully." }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
  setCorsHeaders(response); // Add CORS headers
  return response;
};

export const DELETE = async (request) => {
  const body = await request.json();
  const { date, time } = body;

  if (!date || !time) {
    const response = new Response(
      JSON.stringify({ error: "Date and time are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
    setCorsHeaders(response); // Add CORS headers
    return response;
  }

  const bookingsData = await readBookingsFile();
  const updatedBookings = bookingsData.bookings.filter(
    (b) => !(b.date === date && b.time === time)
  );

  bookingsData.bookings = updatedBookings;
  await writeBookingsFile(bookingsData);

  const response = new Response(
    JSON.stringify({ message: "Booking deleted successfully." }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
  setCorsHeaders(response); // Add CORS headers
  return response;
};

// Handle OPTIONS request to preflight CORS checks
export const OPTIONS = async () => {
  const response = new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
  return response;
};
