/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation submitComment($postId: ID!, $content: String!) {\n    submitComment(postId: $postId, content: $content) {\n      success\n      message\n      commentId\n    }\n  }\n": types.SubmitCommentDocument,
    "\n  query getComments($postId: ID!, $pageSize: Int!, $offset: Int!) {\n    post(id: $postId) {\n      comments(pageSize: $pageSize, offset: $offset) {\n        id\n        content\n        author {\n          username\n        }\n        date\n        upvotes\n        downvotes\n      }\n      numOfComments\n    }\n  }\n": types.GetCommentsDocument,
    "\n  query getPostData($url: String!, $postId: ID!) {\n    preview(url: $url) {\n      url\n      title\n      images\n      mediaType\n      contentType\n      favicons\n    }\n    postVote(id: $postId) {\n      vote\n    }\n  }\n": types.GetPostDataDocument,
    "\n  mutation submitPostVote($postId: ID!, $vote: String!) {\n    submitPostVote(postId: $postId, vote: $vote) {\n      success\n      message\n      postVoteId\n    }\n  }\n": types.SubmitPostVoteDocument,
    "\n  mutation deletePostVote($postId: ID!) {\n    deletePostVote(postId: $postId) {\n      success\n      message\n    }\n  }\n": types.DeletePostVoteDocument,
    "\n  mutation submitPost(\n    $title: String!\n    $url: String!\n    $description: String\n    $lng: Float\n    $lat: Float\n  ) {\n    submitPost(\n      title: $title\n      url: $url\n      description: $description\n      lng: $lng\n      lat: $lat\n    ) {\n      success\n      message\n      postId\n    }\n  }\n": types.SubmitPostDocument,
    "\n  query getPosts {\n    posts {\n      id\n      title\n      description\n      lng\n      lat\n      author {\n        username\n      }\n      url\n      upvotes\n      downvotes\n    }\n  }\n": types.GetPostsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation submitComment($postId: ID!, $content: String!) {\n    submitComment(postId: $postId, content: $content) {\n      success\n      message\n      commentId\n    }\n  }\n"): (typeof documents)["\n  mutation submitComment($postId: ID!, $content: String!) {\n    submitComment(postId: $postId, content: $content) {\n      success\n      message\n      commentId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getComments($postId: ID!, $pageSize: Int!, $offset: Int!) {\n    post(id: $postId) {\n      comments(pageSize: $pageSize, offset: $offset) {\n        id\n        content\n        author {\n          username\n        }\n        date\n        upvotes\n        downvotes\n      }\n      numOfComments\n    }\n  }\n"): (typeof documents)["\n  query getComments($postId: ID!, $pageSize: Int!, $offset: Int!) {\n    post(id: $postId) {\n      comments(pageSize: $pageSize, offset: $offset) {\n        id\n        content\n        author {\n          username\n        }\n        date\n        upvotes\n        downvotes\n      }\n      numOfComments\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getPostData($url: String!, $postId: ID!) {\n    preview(url: $url) {\n      url\n      title\n      images\n      mediaType\n      contentType\n      favicons\n    }\n    postVote(id: $postId) {\n      vote\n    }\n  }\n"): (typeof documents)["\n  query getPostData($url: String!, $postId: ID!) {\n    preview(url: $url) {\n      url\n      title\n      images\n      mediaType\n      contentType\n      favicons\n    }\n    postVote(id: $postId) {\n      vote\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation submitPostVote($postId: ID!, $vote: String!) {\n    submitPostVote(postId: $postId, vote: $vote) {\n      success\n      message\n      postVoteId\n    }\n  }\n"): (typeof documents)["\n  mutation submitPostVote($postId: ID!, $vote: String!) {\n    submitPostVote(postId: $postId, vote: $vote) {\n      success\n      message\n      postVoteId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deletePostVote($postId: ID!) {\n    deletePostVote(postId: $postId) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation deletePostVote($postId: ID!) {\n    deletePostVote(postId: $postId) {\n      success\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation submitPost(\n    $title: String!\n    $url: String!\n    $description: String\n    $lng: Float\n    $lat: Float\n  ) {\n    submitPost(\n      title: $title\n      url: $url\n      description: $description\n      lng: $lng\n      lat: $lat\n    ) {\n      success\n      message\n      postId\n    }\n  }\n"): (typeof documents)["\n  mutation submitPost(\n    $title: String!\n    $url: String!\n    $description: String\n    $lng: Float\n    $lat: Float\n  ) {\n    submitPost(\n      title: $title\n      url: $url\n      description: $description\n      lng: $lng\n      lat: $lat\n    ) {\n      success\n      message\n      postId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getPosts {\n    posts {\n      id\n      title\n      description\n      lng\n      lat\n      author {\n        username\n      }\n      url\n      upvotes\n      downvotes\n    }\n  }\n"): (typeof documents)["\n  query getPosts {\n    posts {\n      id\n      title\n      description\n      lng\n      lat\n      author {\n        username\n      }\n      url\n      upvotes\n      downvotes\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;