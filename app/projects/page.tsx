import Card from "@/components/Card";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>

          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Wordpress Plugins (Legacy)
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I don't maintain these any more, but they're still available for
            download in the wordpress plugin directory.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {[
              {
                title: "WOW Recruit Widget",
                description: `A widget that helps to display recruitment message of a World of Warcraft guild.`,
                imgSrc: "/static/images/screenshot-1.jpg",
                href: "https://github.com/ycfreeman/wow-recruit-widget",
              },
              {
                title: "WOW Server Status Widget",
                description: `Easily add WOW Server Status 4.1 badge to your wordpress site by just a few clicks.`,
                imgSrc: "/static/images/screenshot-wow-status.jpg",
                href: "https://github.com/ycfreeman/wow-server-status-widget",
              },
              {
                title: "JPlayer Podcast Widget",
                description: `Wordpress widget that use jPlayer to play Podcast RSS playlists.`,
                imgSrc: "/static/images/screenshot-jplayer.png",
                href: "https://github.com/ycfreeman/jplayer-podcast-wordpress-widget",
              },
            ].map((d) => (
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
