import Card from "@/components/Card";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({ title: "Projects" });

const projectsData = [
  {
    title: "WOW Recruit Widget",
    description: `A widget that helps to display recruitment message of a World of Warcraft guild.`,
    imgSrc: "/static/images/screenshot-1.jpg",
    href: "https://www.google.com",
  },
  {
    title: "The Time Machine",
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: "/static/images/time-machine.jpg",
    href: "/blog/the-time-machine",
  },
];

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
