type Project = {
  title: string;
  image: string;
  date: Date;
  teamMembersGot: number;
  teamMembersNeeded: number;
};

type Organisation = {
  name: string;
  image: string;
  description: string;
  projects: Project[];
}

const PROJECTS: Project[] = [
  {
    title: "Project 1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shield_of_Imperial_College_London.svg/1200px-Shield_of_Imperial_College_London.svg.png",
    date: new Date(),
    teamMembersGot: 2,
    teamMembersNeeded: 4,
  },
  {
    title: "Project 2",
    image:
      "https://pbs.twimg.com/profile_images/1742880732207329280/NYKXBC3k_400x400.jpg",
    date: new Date(),
    teamMembersGot: 1,
    teamMembersNeeded: 2,
  },
  {
    title: "Project 3",
    image:
      "https://image.similarpng.com/very-thumbnail/2021/11/Mcdonalds-logo-on-transparent-background-PNG.png",
    date: new Date(),
    teamMembersGot: 3,
    teamMembersNeeded: 5,
  },
];

const ORGANISATIONS: Organisation[] = [
  {
    name: "Imperial Computing Year 1",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shield_of_Imperial_College_London.svg/1200px-Shield_of_Imperial_College_London.svg.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\
    commodo consequat.",
    projects: PROJECTS,
  },
  {
    name: "Imperial Computing Year 2",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shield_of_Imperial_College_London.svg/1200px-Shield_of_Imperial_College_London.svg.png",
    description: "This is Imperial College London DocSoc year 2",
    projects: PROJECTS,
  },
  {
    name: "Imperial Computing Year 3",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shield_of_Imperial_College_London.svg/1200px-Shield_of_Imperial_College_London.svg.png",
    description: "This is Imperial College London DocSoc year 3",
    projects: PROJECTS,
  },
  {
    name: "McDonald's",
    image: "https://image.similarpng.com/very-thumbnail/2021/11/Mcdonalds-logo-on-transparent-background-PNG.png",
    description: "We are McDonalds",
    projects: PROJECTS,
  },
  {
    name: "ICHack24",
    image: "https://pbs.twimg.com/profile_images/1742880732207329280/NYKXBC3k_400x400.jpg",
    description: "Biggest event of the year!",
    projects: PROJECTS,
  }
]

export const 
  Projects = PROJECTS, 
  Organisations = ORGANISATIONS;