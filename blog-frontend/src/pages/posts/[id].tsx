import React from "react";
import styles from "@/styles/Home.module.css"
import { getPostById, getAllPosts } from "@/utils/api";
import { PostType } from "@/utils/Types";

type Props = {
    post: PostType
};

export async function getStaticProps({ params }: any) {
    const post: PostType = await getPostById(params.id);

    return {
        props: {
            post,
        },
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    const paths = posts.map((post: PostType) => ({
        params: { id: post.id },
    }));

    return {
        paths,
        fallback: false,
    };
}

const Post = ({ post }: Props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.content}>{post.content}</p>
            <p className={styles.meta}>Autor: {post.author}</p>
            <p className={styles.meta}>Created At: {post.createdAt}</p>
        </div>
    );
};

export default Post;