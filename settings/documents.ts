import { Paths } from "@/lib/pageroutes"

export const Documents: Paths[] = [
  {
    heading: "Introduction",
    title: "Getting Started",
    href: "/start",
    items: [
      {
        title: "Agent Design",
        href: "/agentdesign",
      },
      {
        title: "Prompt Design",
        href: "/promptdesign",
      },
      {
        title: "Tool Design",
        href: "/tooldesign",
      },
       {
        title: "Agent Configuration",
        href: "/agentconfig",
      },
    ],
  },
  {
    spacer: true,
  },
  {
    title: "Overview",
    href: "/usage",
    heading: "Usage",
    items: [
      {
        title: "Building Otto",
        href: "/example",      
        items: [
        {
          title: "Prompt",
          href: "/prompt",
        },
        {
          title: "Tools",
          href: "/tools",
        },
         {
          title: "Configuration",
          href: "/config",
        },
      ]
    },
    ]
  }, 
  {
    spacer: true,
  },
  {
    title: "Markdown",
    href: "/markdown",
    heading: "Components",
    items: [
      {
        title: "Cards",
        href: "/cards",
      },
      {
        title: "Diagrams",
        href: "/diagrams",
      },
      {
        title: "Filetree",
        href: "/filetree",
      },
      {
        title: "Lists",
        href: "/lists",
      },
      {
        title: "Maths",
        href: "/maths",
      },
      {
        title: "Notes",
        href: "/notes",
      },
      {
        title: "Steps",
        href: "/steps",
      },
      {
        title: "Table",
        href: "/table",
      },
      {
        title: "Tabs",
        href: "/tabs",
      },
    ],
  },
]
