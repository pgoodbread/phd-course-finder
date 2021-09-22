import { NextSeoProps } from "next-seo";

const SEO: NextSeoProps = {
  canonical: "https://coursehub.app",
  titleTemplate: "CourseHub | %s",
  defaultTitle: "CourseHub",
  twitter: {
    handle: "@CourseHub_App",
    site: "@CourseHub_App",
    cardType: "summary",
  },
  description:
    "Centralized platform for PhD-level courses. Spend less time searching, more time researching.",
  openGraph: {
    title: "CourseHub",
    description:
      "Centralized platform for PhD-level courses. Spend less time searching, more time researching.",
    images: [
      {
        url: "http://cousehub.app/logo-with-text.svg",
        width: 146,
        height: 150,
        alt: "CourseHub Logo with Text",
      },
    ],
  },
};

export default SEO;
