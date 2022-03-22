import { NextSeoProps } from "next-seo";

const SEO: NextSeoProps = {
  titleTemplate: "CourseHub | %s",
  defaultTitle: "CourseHub - Bringing Academic Courses to You",
  canonical: "https://coursehub.app",
  twitter: {
    handle: "@CourseHub_App",
    site: "@CourseHub_App",
    cardType: "summary_large_image",
  },
  description:
    "Centralized platform for PhD-level courses. Spend less time searching, more time researching.",
  openGraph: {
    title: "CourseHub",
    url: "https://coursehub.app",
    type: "website",
    description:
      "Centralized platform for PhD-level courses. Spend less time searching, more time researching.",
    images: [
      {
        url: "http://cousehub.app/twitter-card-image.png",
        width: 146,
        height: 150,
        alt: "CourseHub Logo with Text",
      },
    ],
  },
};

export default SEO;
