/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  date: Scalars['String']['output'];
  downvotes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  upvotes: Scalars['Int']['output'];
};

export type CommentVote = {
  __typename?: 'CommentVote';
  comment?: Maybe<Comment>;
  id: Scalars['ID']['output'];
  user: User;
  vote: Scalars['String']['output'];
};

export type DeleteVoteResponse = {
  __typename?: 'DeleteVoteResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteCommentVote: DeleteVoteResponse;
  deletePostVote: DeleteVoteResponse;
  submitComment: SubmitCommentResponse;
  submitCommentVote: SubmitCommentVoteResponse;
  submitPost: SubmitPostResponse;
  submitPostVote: SubmitPostVoteResponse;
};


export type MutationDeleteCommentVoteArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationDeletePostVoteArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationSubmitCommentArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};


export type MutationSubmitCommentVoteArgs = {
  commentId: Scalars['ID']['input'];
  vote: Scalars['String']['input'];
};


export type MutationSubmitPostArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationSubmitPostVoteArgs = {
  postId: Scalars['ID']['input'];
  vote: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  comments: Array<Comment>;
  description?: Maybe<Scalars['String']['output']>;
  downvotes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  numOfComments: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  upvotes: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};


export type PostCommentsArgs = {
  offset: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type PostVote = {
  __typename?: 'PostVote';
  id: Scalars['ID']['output'];
  post?: Maybe<Post>;
  user: User;
  vote: Scalars['String']['output'];
};

export type Preview = {
  __typename?: 'Preview';
  contentType?: Maybe<Scalars['String']['output']>;
  favicons?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  mediaType?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  commentVote?: Maybe<CommentVote>;
  comments: Array<Comment>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  postVote?: Maybe<PostVote>;
  posts: Array<Post>;
  preview: Preview;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentVoteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostVoteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPreviewArgs = {
  url: Scalars['String']['input'];
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type SubmitCommentResponse = {
  __typename?: 'SubmitCommentResponse';
  commentId?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SubmitCommentVoteResponse = {
  __typename?: 'SubmitCommentVoteResponse';
  commentVoteId?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SubmitPostResponse = {
  __typename?: 'SubmitPostResponse';
  message?: Maybe<Scalars['String']['output']>;
  postId?: Maybe<Scalars['ID']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SubmitPostVoteResponse = {
  __typename?: 'SubmitPostVoteResponse';
  message?: Maybe<Scalars['String']['output']>;
  postVoteId?: Maybe<Scalars['ID']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  username: Scalars['String']['output'];
};

export type SubmitCommentMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type SubmitCommentMutation = { __typename?: 'Mutation', submitComment: { __typename?: 'SubmitCommentResponse', success: boolean, message?: string | null, commentId?: string | null } };

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['ID']['input'];
  pageSize: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', post?: { __typename?: 'Post', numOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, content: string, date: string, upvotes: number, downvotes: number, author: { __typename?: 'User', username: string } }> } | null };

export type GetPostDataQueryVariables = Exact<{
  url: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
}>;


export type GetPostDataQuery = { __typename?: 'Query', preview: { __typename?: 'Preview', url: string, title?: string | null, images?: Array<string | null> | null, mediaType?: string | null, contentType?: string | null, favicons?: Array<string | null> | null }, postVote?: { __typename?: 'PostVote', vote: string } | null };

export type SubmitPostVoteMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  vote: Scalars['String']['input'];
}>;


export type SubmitPostVoteMutation = { __typename?: 'Mutation', submitPostVote: { __typename?: 'SubmitPostVoteResponse', success: boolean, message?: string | null, postVoteId?: string | null } };

export type DeletePostVoteMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type DeletePostVoteMutation = { __typename?: 'Mutation', deletePostVote: { __typename?: 'DeleteVoteResponse', success: boolean, message?: string | null } };

export type SubmitPostMutationVariables = Exact<{
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SubmitPostMutation = { __typename?: 'Mutation', submitPost: { __typename?: 'SubmitPostResponse', success: boolean, message?: string | null, postId?: string | null } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, description?: string | null, lng?: number | null, lat?: number | null, url: string, upvotes: number, downvotes: number, author: { __typename?: 'User', username: string } }> };


export const SubmitCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}}]}}]}}]} as unknown as DocumentNode<SubmitCommentMutation, SubmitCommentMutationVariables>;
export const GetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"upvotes"}},{"kind":"Field","name":{"kind":"Name","value":"downvotes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numOfComments"}}]}}]}}]} as unknown as DocumentNode<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetPostDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"favicons"}}]}},{"kind":"Field","name":{"kind":"Name","value":"postVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vote"}}]}}]}}]} as unknown as DocumentNode<GetPostDataQuery, GetPostDataQueryVariables>;
export const SubmitPostVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitPostVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vote"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitPostVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vote"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vote"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"postVoteId"}}]}}]}}]} as unknown as DocumentNode<SubmitPostVoteMutation, SubmitPostVoteMutationVariables>;
export const DeletePostVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePostVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePostVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeletePostVoteMutation, DeletePostVoteMutationVariables>;
export const SubmitPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lng"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lat"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"lng"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lng"}}},{"kind":"Argument","name":{"kind":"Name","value":"lat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lat"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}}]}}]}}]} as unknown as DocumentNode<SubmitPostMutation, SubmitPostMutationVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"upvotes"}},{"kind":"Field","name":{"kind":"Name","value":"downvotes"}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;