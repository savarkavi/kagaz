export interface TemplateMeta {
  id: string;
  name: string;
  tagline: string;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "tabloid",
    name: "Tabloid",
    tagline: "Zine / Print",
  },
  {
    id: "webcore",
    name: "Webcore",
    tagline: "Neocities",
  },
  {
    id: "retro-os",
    name: "Retro OS",
    tagline: "Desktop RPG",
  },
];
