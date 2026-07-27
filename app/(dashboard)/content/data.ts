// Shape mirrors what a `/api/admin/content` endpoint would return.
// Swap `getContentOverview()` for a real fetch() call when the API is ready.

export type ContentTab = "banners" | "categories" | "inspiration" | "travel-fee";

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  targetPage: string;
  order: number;
  status: "Active" | "Scheduled" | "Draft";
  scheduleLabel: string;
}

export interface Category {
  id: string;
  no: number;
  name: string;
  slug: string;
  description: string;
  status: "Active" | "Inactive";
}

export interface InspirationImage {
  id: string;
  imageUrl: string;
  tag: string;
}

export interface ContentOverview {
  banners: Banner[];
  categories: Category[];
  inspirationImages: InspirationImage[];
}

export function getContentOverview(): ContentOverview {
  return {
    banners: [
      {
        id: "BNR-01",
        imageUrl:
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=200&h=140&fit=crop",
        title: "Summer Glow Collection",
        description: "Discover radiant beauty services near you",
        ctaText: "Book Now",
        targetPage: "/browse/summer",
        order: 1,
        status: "Active",
        scheduleLabel: "Jun 1 – Aug 31, 2025",
      },
      {
        id: "BNR-02",
        imageUrl:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=140&fit=crop",
        title: "Book Your Beauty Expert",
        description: "Top-rated artists at your fingertips",
        ctaText: "Explore Artists",
        targetPage: "/artists",
        order: 2,
        status: "Scheduled",
        scheduleLabel: "Jul 15, 2025",
      },
      {
        id: "BNR-03",
        imageUrl:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=140&fit=crop",
        title: "New Year New You",
        description: "Refresh your look with our premium services",
        ctaText: "Get Started",
        targetPage: "/services",
        order: 3,
        status: "Draft",
        scheduleLabel: "Dec 26, 2025",
      },
    ],
    categories: [
      {
        id: "CAT-01",
        no: 1,
        name: "Hair & Styling",
        slug: "hair-styling",
        description: "hair-styling",
        status: "Active",
      },
      {
        id: "CAT-02",
        no: 2,
        name: "Makeup & Beauty",
        slug: "makeup-beauty",
        description: "makeup-beauty",
        status: "Active",
      },
      {
        id: "CAT-03",
        no: 3,
        name: "Skincare & Facials",
        slug: "skincare-facials",
        description: "skincare-facials",
        status: "Active",
      },
      {
        id: "CAT-04",
        no: 4,
        name: "Nail Care",
        slug: "nail-care",
        description: "nail-care",
        status: "Active",
      },
      {
        id: "CAT-05",
        no: 5,
        name: "Massage & Wellness",
        slug: "massage-wellness",
        description: "massage-wellness",
        status: "Inactive",
      },
      {
        id: "CAT-06",
        no: 6,
        name: "Brows & Lashes",
        slug: "brows-lashes",
        description: "brows-lashes",
        status: "Active",
      },
    ],
    inspirationImages: [
      {
        id: "IMG-01",
        imageUrl:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
        tag: "Party",
      },
      {
        id: "IMG-02",
        imageUrl:
          "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=400&h=400&fit=crop",
        tag: "Natural",
      },
      {
        id: "IMG-03",
        imageUrl:
          "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=400&fit=crop",
        tag: "Formal",
      },
      {
        id: "IMG-04",
        imageUrl:
          "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=400&h=400&fit=crop",
        tag: "Wedding",
      },
      {
        id: "IMG-05",
        imageUrl:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
        tag: "Natural",
      },
      {
        id: "IMG-06",
        imageUrl:
          "https://images.unsplash.com/photo-1487412912498-0447579c8d21?w=400&h=400&fit=crop",
        tag: "Luxury Glam",
      },
      {
        id: "IMG-07",
        imageUrl:
          "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=400&fit=crop",
        tag: "Festival",
      },
      {
        id: "IMG-08",
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        tag: "Party",
      },
    ],
  };
}