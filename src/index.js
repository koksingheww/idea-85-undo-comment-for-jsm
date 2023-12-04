import Resolver from '@forge/resolver';
import { removeComment, storeCommentIntoForgeStorage, getCommentFromForgeStorage, deleteCommentFromForgeStorage, getUser } from './api/jiraService'

const resolver = new Resolver();

export async function storeComment(event, context) {
  const userResponse = await getUser(event.comment.author.accountId);
  await storeCommentIntoForgeStorage(event.issue.id, event.comment.id, event.comment.body, userResponse.displayName, userResponse.avatarUrls['48x48']);
}

resolver.define('getForgeStorage', async ({ payload }) => {
  const issueId = payload.issueId;
  return await getCommentFromForgeStorage(issueId);
});

resolver.define('removeComment', async ({ payload }) => {
  const issueId = payload.issueId;
  const commentId = payload.commentId;

  return await removeComment(issueId, commentId);
})

resolver.define('removeCommentFromForgeStorage', async ({ payload }) => {
  const issueId = payload.issueId;
  return await deleteCommentFromForgeStorage(issueId);
})

export const handler = resolver.getDefinitions();
