export const USERS = [
  {
    id: "U-001",
    name: "Sarah Mitchell",
    initials: "SM",
    email: "sarah.mitchell@email.com",
    phone: "+61 412 345 678",
    role: "Customer",
    status: "Active",
    bookings: 24,
    lastLogin: "Jul 2, 2026",
    joined: "Mar 14, 2024",
  },
  {
    id: "U-002",
    name: "Jessica Chen",
    initials: "JC",
    email: "jessica.chen@studio.com",
    phone: "+61 423 456 789",
    role: "Artist",
    status: "Active",
    bookings: 312,
    lastLogin: "Jul 2, 2026",
    joined: "Jan 8, 2024",
  },
  {
    id: "U-003",
    name: "Emma Williams",
    initials: "EW",
    email: "emma.w@gmail.com",
    phone: "+61 434 567 890",
    role: "Customer",
    status: "Active",
    bookings: 7,
    lastLogin: "Jul 2, 2026",
    joined: "Jun 29, 2026",
  },
  {
    id: "U-004",
    name: "Priya Sharma",
    initials: "PS",
    email: "priya.sharma@beauty.com",
    phone: "+61 445 678 901",
    role: "Artist",
    status: "Pending",
    bookings: 0,
    lastLogin: "Jun 30, 2026",
    joined: "Jun 28, 2026",
  },
  {
    id: "U-005",
    name: "Olivia Johnson",
    initials: "OJ",
    email: "olivia@email.com",
    phone: "+61 456 789 012",
    role: "Customer",
    status: "Active",
    bookings: 18,
    lastLogin: "Jul 1, 2026",
    joined: "Nov 22, 2023",
  },

  ...Array.from({ length: 25 }).map((_, index) => {
    const id = index + 6;

    const users = [
      {
        name: "Ava Martinez",
        role: "Customer",
      },
      {
        name: "Isabella Romano",
        role: "Artist",
      },
      {
        name: "Mei Lin Chen",
        role: "Artist",
      },
      {
        name: "Aisha Okonkwo",
        role: "Artist",
      },
      {
        name: "Sophia Brown",
        role: "Customer",
      },
    ];

    const user = users[index % users.length];

    return {
      id: `U-${String(id).padStart(3, "0")}`,
      name: `${user.name} ${id}`,
      initials: user.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      email: `user${id}@beauty.com`,
      phone: `+61 41${id} 000 ${id}`,
      role: user.role,
      status:
        index % 5 === 0 ? "Pending" : index % 7 === 0 ? "Suspended" : "Active",
      bookings: index * 7 + 3,
      lastLogin: `Jul ${8 + (index % 10)}, 2026`,
      joined: `May ${1 + index}, 2025`,
    };
  }),
];
