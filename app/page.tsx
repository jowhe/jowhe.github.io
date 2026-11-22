import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { ArrowUpRight01Icon, GithubIcon, NewTwitterIcon } from "@hugeicons/core-free-icons"

import { Bento, BentoItem } from "@/components/bento"
import { ContentTile } from "@/components/content-tile"

const skills = [
  { group: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Java", "C#", "Go"] },
  { group: "Backend", items: ["Node.js", "Express.js APIs"] },
  { group: "Servers and networking", items: ["DNS", "UFW", "Firewall rules"] },
  { group: "AI", items: ["LLMs", "AI tools"] },
]

const education = [
  { years: "2026/27", course: "MSc Advanced Computer Science", institution: "Newcastle University", grade: "In progress" },
  { years: "2023/24", course: "BSc (Hons) Computer Science", institution: "Newcastle College University Centre", grade: "First-class honours" },
]

const socials: { label: string; handle: string; url: string; icon: IconSvgElement }[] = [
  { label: "GitHub", handle: "github.com/jowhe", url: "https://github.com/jowhe", icon: GithubIcon },
  { label: "X", handle: "@jowhe_", url: "https://x.com/jowhe_", icon: NewTwitterIcon },
]

export default function Page() {
  return (
    <Bento glass>
      <BentoItem cols={12} rows={{ base: 5, md: 4 }}>
        <ContentTile className="justify-center">
          <p className="text-2xl font-medium tracking-tight text-balance sm:text-3xl">
            Software developer and MSc student
          </p>
          <p className="max-w-prose text-muted-foreground">
            I&apos;m studying Advanced Computer Science at master&apos;s level and building for the web in my own
            time. I&apos;m looking for a role at a software development company.
          </p>
        </ContentTile>
      </BentoItem>

      <BentoItem cols={6} rows={{ base: 6, md: 5 }}>
        <ContentTile title="About">
          <p>
            I started programming around the age of 13 as a hobby and have kept at it ever since. What I enjoy most
            is software engineering as a whole: building full-stack web applications, and setting up and
            configuring the servers they run on.
          </p>
        </ContentTile>
      </BentoItem>

      <BentoItem cols={6} rows={{ base: 6, md: 5 }}>
        <ContentTile title="Projects">
          <p>
            I don&apos;t have professional work to show yet. My projects are private repositories that I keep on my
            own machine rather than on GitHub, so they aren&apos;t linked here.
          </p>
          <p>Get in touch through either link and I&apos;ll walk you through any of them.</p>
        </ContentTile>
      </BentoItem>

      <BentoItem cols={12} rows={{ base: 8, md: 6 }}>
        <ContentTile title="Skills" className="gap-4">
          <div className="grid gap-4 @md:grid-cols-2">
            {skills.map(({ group, items }) => (
              <div key={group} className="flex flex-col gap-2">
                <h3 className="font-medium">{group}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <li key={item} className="rounded-full border px-2.5 py-1 text-xs">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ContentTile>
      </BentoItem>

      {/* Beside the content on wide screens, below Skills on smaller ones. */}
      <BentoItem aside cols={12} rows={5}>
        <ContentTile title="Find me online">
          <ul className="flex flex-col gap-1">
            {socials.map(({ label, handle, url, icon }) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 outline-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <HugeiconsIcon icon={icon} size={18} />
                  <span className="flex flex-col leading-tight">
                    <span className="font-medium">{label}</span>
                    <span className="text-muted-foreground">{handle}</span>
                  </span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={16}
                    className="ml-auto opacity-60 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </ContentTile>
      </BentoItem>

      <BentoItem cols={12} rows={{ base: 8, md: 5 }}>
        <ContentTile title="Education" className="gap-4">
          <ol className="flex flex-col gap-4">
            {education.map(({ years, course, institution, grade }) => (
              <li key={course} className="flex flex-col gap-1 @md:grid @md:grid-cols-[6.5rem_1fr] @md:gap-4">
                <span className="text-muted-foreground tabular-nums">{years}</span>
                <div>
                  <p className="font-medium">{course}</p>
                  <p className="text-muted-foreground">{institution}</p>
                  <p className="text-muted-foreground">Grade: {grade}</p>
                </div>
              </li>
            ))}
          </ol>
        </ContentTile>
      </BentoItem>
    </Bento>
  )
}
