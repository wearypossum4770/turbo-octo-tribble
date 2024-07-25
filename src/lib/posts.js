import { readFile, readdir } from 'node:fs/promises';
import directoryPath from '../manage'
import matter from 'gray-matter'
const postsDirectory = `${directoryPath}/pages/posts`


const getSortedPostsData = (files) =>  files.map(async (filename) =>({
    params: {
        id: filename.replace(/\.md$/, ''),
        fullPath: `${postsDirectory}/${filename}`,
        ...matter(await readFile(`${postsDirectory}/${filename}`, { encoding: 'utf8' }))        
    }
}) )
export function getAllPostIds() {
    return readdir(postsDirectory)
}