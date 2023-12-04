import api, { route } from '@forge/api'
const { storage } = require('@forge/api');

export async function removeComment(issueId, commentId) {
  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueId}/comment/${commentId}`, {
    method: 'DELETE',
  })

  return response.status
}

export async function storeCommentIntoForgeStorage(issueId, commentId, commentBody, commentAuthor, commentAuthorAvatarUrl) {
    const storageKey = `comment-${issueId}`
    const storageValue = {
        issueId: issueId,
        commentId: commentId,
        commentBody: commentBody,
        commentAuthor: commentAuthor,
        commentAuthorAvatarUrl: commentAuthorAvatarUrl
    }

    try {
        await storage.set(storageKey, storageValue)   
    } catch (error) {
        console.error('Error storing comment:', error);
    }
}

export async function getCommentFromForgeStorage(issueId) {
    const storageKey = `comment-${issueId}`

    try {
        const storageValue = await storage.get(storageKey)

        if (storageValue === undefined) {
          return null;
        }

        return storageValue
    } catch (error) {
        console.error('Error getting comment:', error);
        return null;
    }
}

export async function deleteCommentFromForgeStorage(issueId) {
    const storageKey = `comment-${issueId}`

    try {
        await storage.delete(storageKey)
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

export async function getUser(accountId) {
    const response = await api.asApp().requestJira(route`/rest/api/3/user?accountId=${accountId}`, {
        method: 'GET',
    })
    
    return response.json()
}
