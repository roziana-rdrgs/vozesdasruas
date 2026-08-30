import action01 from "../assets/images/action-01.jpeg";
import action02 from "../assets/images/action-02.jpeg";
import action03 from "../assets/images/action-03.jpeg";

import type { Post } from "../types/post";

export const posts: Post[] = [
  {
    id: "1",
    title: "Um encontro que vai muito além de uma refeição.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae lorem at ipsum tincidunt consequat.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Praesent vitae lorem at ipsum tincidunt consequat. Integer vel sem vitae erat malesuada tincidunt. Donec tincidunt nisl vitae tincidunt malesuada.",
    category: "AÇÕES",
    image: action01,
    publishedAt: "30/08/2026",
  },
  {
    id: "2",
    title: "Quando muitas mãos se unem, a transformação acontece.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat sapien vitae lectus tincidunt.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Praesent tincidunt felis vitae lorem volutpat, non consectetur ipsum consequat. Aliquam erat volutpat. Donec feugiat massa vitae consectetur tincidunt.",
    category: "VOLUNTARIADO",
    image: action02,
    publishedAt: "28/08/2026",
  },
  {
    id: "3",
    title: "Cada pessoa tem uma história.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae neque vel ipsum consequat aliquam. Sed consectetur erat at massa tincidunt. Curabitur vel lorem vitae ipsum consequat tincidunt.",
    category: "HISTÓRIAS",
    image: action03,
    publishedAt: "20/08/2026",
  },
  {
    id: "4",
    title: "Solidariedade também é estar presente.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem vitae erat malesuada tincidunt. Praesent commodo arcu non tincidunt elementum.",
    category: "AÇÕES",
    image: action01,
    publishedAt: "15/08/2026",
  },
  {
    id: "5",
    title: "Uma rede construída por muitas pessoas.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Donec tincidunt nisl vitae tincidunt malesuada. Integer consequat sapien vitae lectus tincidunt.",
    category: "VOLUNTARIADO",
    image: action02,
    publishedAt: "10/08/2026",
  },
  {
    id: "6",
    title: "Histórias que merecem ser ouvidas.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel lorem.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    category: "HISTÓRIAS",
    image: action03,
    publishedAt: "05/08/2026",
  },
];
