import {
  Users,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  DollarSign,
  Activity,
} from "lucide-react";


export const dashboardResponse = {
  user: {
    name: "Alex O'Brien",
    role: "Super Admin",
  },

  stats: [
    {
      title: "Total Users",
      value: 24832,
      change: "+12.4%",
      trend: "up",
      icon: Users,
      color: "#B57EDC",
      bg: "#F4E9FC",
      chart: [20,30,25,40,35,60,75],
    },

    {
      title: "Total Artists",
      value: 3241,
      change: "+8.7%",
      trend: "up",
      icon: Sparkles,
      color:"#2FA773",
      bg:"#DDF3E7",
      chart:[30,40,35,60,55,75],
    },

    {
      title:"Pending Verifs",
      value:23,
      change:"-5.2%",
      trend:"down",
      icon:ShieldCheck,
      color:"#E8A33D",
      bg:"#FBEBD6",
      chart:[70,60,50,40,30]
    },


    {
      title:"Total Bookings",
      value:89432,
      change:"+15.2%",
      trend:"up",
      icon:CalendarCheck,
      color:"#3E6FE0",
      bg:"#E1EAFB",
      chart:[20,40,35,70,90]
    },


    {
      title:"Total Revenue",
      value:"$8,420",
      change:"+18.9%",
      trend:"up",
      icon:DollarSign,
      color:"#E0507F",
      bg:"#FBE2E9",
      chart:[20,30,60,40,80]
    },


    {
      title:"Active Users",
      value:18943,
      change:"+9.1%",
      trend:"up",
      icon:Activity,
      color:"#E5484D",
      bg:"#FBE2E2",
      chart:[30,50,45,80,90]
    }

  ],


  bookings:[
    {
      id:"BK-8921",
      customer:"Sarah Mitchell",
      artist:"Jessica Chen",
      service:"Bridal Makeup",
      amount:"$380",
      status:"Completed",
      date:"Jul 2, 2026",
      avatar:"SM"
    },

    {
      id:"BK-8920",
      customer:"Emma Williams",
      artist:"Priya Sharma",
      service:"Hair Styling",
      amount:"$120",
      status:"Pending",
      date:"Jul 2, 2026",
      avatar:"EW"
    },


    {
      id:"BK-8919",
      customer:"Olivia Johnson",
      artist:"Isabella Romano",
      service:"Nail Art",
      amount:"$85",
      status:"Completed",
      date:"Jul 1, 2026",
      avatar:"OJ"
    },

    {
      id:"BK-8918",
      customer:"Ava Martinez",
      artist:"Mei Lin Chen",
      service:"Facial Treatment",
      amount:"$220",
      status:"Cancelled",
      date:"Jul 1,2026",
      avatar:"AM"
    }
  ],


 pendingVerification:[
   {
    name:"Priya Sharma",
    service:"Makeup Artist",
    date:"Jun 28",
    avatar:"PS"
   },
   {
    name:"Isabella Romano",
    service:"Hair Stylist",
    date:"Jun 29",
    avatar:"IR"
   },
   {
    name:"Mei Lin Chen",
    service:"Nail Technician",
    date:"Jun 30",
    avatar:"ML"
   }
 ]

}