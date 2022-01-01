import { Source } from "./source";

export class BlogRemote{
    title!: string;
    description!: string;
    content!: string;
    url!: string;
    image!: string;
    publishedAt!: string;
    source!: Source;
}