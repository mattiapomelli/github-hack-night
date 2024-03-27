export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Answer Engine",
  description: "An answer engine",
  url: "http://localhost:3000",
  ogImage: "http://localhost:3000/og.png",
  links: {
    twitter: "",
  },
};
